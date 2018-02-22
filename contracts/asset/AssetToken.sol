//! AssetToken contract
//!
//! Copyright 2018 David Perrenoud, ti&m AG
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

import "../asset/ConfirmableToken.sol";
import "../TendCertifier.sol";
import "./ExperienceToken.sol";


contract AssetToken is ConfirmableToken {
    /// The TEND certifier allowing to use the asset token.
    TendCertifier public tendCertifierContract;

    /// The experience token contracts related to this asset token.
    ExperienceToken[] public experienceTokenContracts;

    // Helper constants
    string public constant name = "Asset Name";
    string public constant symbol = "SYM";
    uint8 public constant decimals = 0;

    function getExperienceTokenContractsLength() public view returns(uint256 length) {
        return experienceTokenContracts.length;
    }

    /**
     * @dev Overloaded modifier to check if the user is certified.
     * @param _who The address to check for verification.
     */
    modifier onlyCertified(address _who) {
        if (!tendCertifierContract.certified(_who)) {
            return;
        }
        _;
    }

    /// Constructor.
    function AssetToken(TendCertifier _tendCertifierContract, uint256 _totalSupply, address tokenHolder) public {
        tendCertifierContract = TendCertifier(_tendCertifierContract);
        totalSupply = _totalSupply;
        balances[tokenHolder] = _totalSupply;
    }

    /// Add an experience token contract to this asset token.
    function addExperienceTokenContract(ExperienceToken _experienceTokenContract) public onlyOwner returns (bool) {
        require(_experienceTokenContract != ExperienceToken(0));

        experienceTokenContracts.push(_experienceTokenContract);
        return true;
    }

    /// Remove an experience token contract from this asset token.
    function removeExperienceTokenContract(uint256 _index) public onlyOwner returns (bool) {
        require(_index < experienceTokenContracts.length);

        delete experienceTokenContracts[_index];
        return true;
    }

    /// Distribute the experience tokens based on the amount of asset tokens each user has.
    function distributeExperienceTokens(uint256 _index, address _user) public onlyOwner returns (bool) {
        require(_user != address(0));
        require(_index < experienceTokenContracts.length);
        require(experienceTokenContracts[_index].balanceOf(_user) == 0);

        // Give the same amount of experience tokens to this user, as the amount of asset tokens she has
        experienceTokenContracts[_index].transfer(_user, balances[_user]);
        return true;
    }
}
