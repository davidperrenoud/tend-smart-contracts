//! Migrations contract
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

import "./base/Ownable.sol";


contract Migrations is Ownable {
    uint256 public last_completed_migration;

    function setCompleted(uint256 completed) onlyOwner public {
        last_completed_migration = completed;
    }

    function upgrade(address newAddress) onlyOwner public {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(last_completed_migration);
    }
}
