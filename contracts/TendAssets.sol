//! TendAssets contract
//!
//! Copyright 2018 David Perrenoud, ti&m AG
//!
//! Licensed under the Apache License, Version 2.0 (the "License");
//! you may not use this file except in compliance with the License.
//! You may obtain a copy of the License at
//!
//!         http://www.apache.org/licenses/LICENSE-2.0
//!
//! Unless required by applicable law or agreed to in writing, software
//! distributed under the License is distributed on an "AS IS" BASIS,
//! WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//! See the License for the specific language governing permissions and
//! limitations under the License.

pragma solidity ^0.4.19;

import "./base/Ownable.sol";
import "./asset/AssetToken.sol";


contract TendAssets is Ownable {
    /// All asset contracts registered on the TEND platform.
    AssetToken[] public assetTokenContracts;

    /// Each time an asset is added.
    event AssetAdded(AssetToken assetTokenContract);

    /// Each time an asset is removed.
    event AssetRemoved(AssetToken assetTokenContract, uint256 index);

    /// Constructor.
    function TendAssets() public {}

    /**
     * Getter of the asset token contracts number, the contracts themselves can
     * be gotten with the automatically-generated assetTokenContracts() function.
     */
    function getAssetTokenContractsLength() public constant returns(uint256 length) {
        return assetTokenContracts.length;
    }

    /// Register a TEND asset.
    function addAsset(AssetToken assetTokenContract) public onlyOwner returns (bool) {
        require(assetTokenContract != AssetToken(0));

        assetTokenContracts.push(assetTokenContract);
        AssetAdded(assetTokenContract);

        return true;
    }

    /// Unregister a TEND asset.
    function removeAsset(uint256 index) public onlyOwner returns (bool) {
        require(index < assetTokenContracts.length);

        AssetToken assetTokenContract = assetTokenContracts[index];
        delete assetTokenContracts[index];
        AssetRemoved(assetTokenContract, index);

        return true;
    }
}
