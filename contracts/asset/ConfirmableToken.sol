//! AssetToken contract
//!
//! Copyright 2018 Marco Abele, TEND Technologies
//!
//! Licensed under the Apache License, Version 2.0 (the "License");
//! you may not use this file except in compliance with the License.
//! You may obtain a copy of the License at
//!
//!     http://www.apache.org/licenses/LICENSE-2.0
//!
//! Unless required by applicable law or agreed to in writing, software
//! distributed under the License is distributed on an "AS IS" BASIS,
//! WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//! See the License for the specific language governing permissions and
//! limitations under the License.

pragma solidity ^0.4.19;

import "../base/ERC20Basic.sol";
import "../base/Ownable.sol";
import "../base/SafeMath.sol";


/**
 * @title Confirmable token
 * @dev Basic version of a confirmable ERC-20 token, with no allowances. 
 */
contract ConfirmableToken is ERC20Basic, Ownable {
    using SafeMath for uint256;

    struct PendingTransfer {
        address from;
        address to;
        uint256 value;
    }

    // ERC-20 token states
    mapping(address => uint256) balances;

    // Confirmable token states
    PendingTransfer[] public pendingTransfers;
    mapping(address => uint256) lockedBalances;
    address[] public pastHolders;

    // Document hashes
    string[] public documentHashes;

    event TransferPending(uint256 pendingTransfer);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event TransferCancelled(uint256 pendingTransfer);

    function getPendingTransfersLength() public constant returns(uint256 length) {
        return pendingTransfers.length;
    }

    function getPastHoldersLength() public constant returns(uint256 length) {
        return pastHolders.length;
    }

    function getDocumentHashesLength() public constant returns(uint256 length) {
        return documentHashes.length;
    }

    /**
     * @dev Overloadable modifier to check if the user is certified.
     * @param _who The address to check for verification.
     */
    modifier onlyCertified(address _who) {
        _;
    }

    /**
     * @dev Pending transfer for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint256 _value) public onlyCertified(_to) returns (bool) {
        require(_to != address(0));
        require(balances[msg.sender].sub(lockedBalances[msg.sender]) >= _value);

        pendingTransfers.push(PendingTransfer(msg.sender, _to, _value));
        lockedBalances[msg.sender] = lockedBalances[msg.sender].add(_value);
        TransferPending(pendingTransfers.length - 1);

        return true;
    }

    /**
     * @dev Confirm a transfer for a specified pending transfer
     * @param _index The index of the transfer in the pending transfers list.
     */
    function confirmTransfer(uint256 _index) public onlyOwner returns (bool) {
        require(_index < pendingTransfers.length);

        address from = pendingTransfers[_index].from;
        address to = pendingTransfers[_index].to;
        uint256 value = pendingTransfers[_index].value;

        // Add receiver to the list of holders, without worrying about duplicates.
        pastHolders.push(to);

        // SafeMath.sub will throw if there is not enough balance.
        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);

        delete pendingTransfers[_index];
        lockedBalances[from] = lockedBalances[from].sub(value);
        Transfer(from, to, value);

        return true;
    }

    /**
     * @dev Cancel a transfer for a specified pending transfer
     * @param _index The index of the transfer in the pending transfers list.
     */
    function cancelTransfer(uint256 _index) public onlyOwner returns (bool) {
        require(_index < pendingTransfers.length);

        address from = pendingTransfers[_index].from;
        uint256 value = pendingTransfers[_index].value;

        delete pendingTransfers[_index];
        lockedBalances[from] = lockedBalances[from].sub(value);
        TransferCancelled(_index);

        return true;
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param _owner The address to query the the balance of. 
     * @return An uint256 representing the amount owned by the passed address.
     */
    function balanceOf(address _owner) public constant returns (uint256 balance) {
        return balances[_owner];
    }

    /**
     * @dev Adds a document hash to the token.
     * @param _hash A string containing a hash of the document, for example an IPFS path "/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv".
     */
    function addDocumentHash(string _hash) public onlyOwner returns (bool) {
        require(bytes(_hash).length != 0);

        documentHashes.push(_hash);

        return true;
    }

    /**
     * @dev Remove a document hash from the token.
     * @param _index The index of the hash in the document hashes list.
     */
    function removeDocumentHash(uint256 _index) public onlyOwner returns (bool) {
        require(_index < documentHashes.length);

        delete documentHashes[_index];

        return true;
    }
}
