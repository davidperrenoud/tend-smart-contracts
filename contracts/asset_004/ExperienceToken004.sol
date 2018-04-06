//! ExperienceToken004 contract
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

import "../asset/ExperienceToken.sol";


contract ExperienceToken004 is ExperienceToken {
    string public constant name = "004 Thirty-six Bottles of Wine";
    string public constant symbol = "WINE002E";

    /// Constructor.
    function ExperienceToken004(TendCertifier _tendCertifierContract, ExperienceCertifier _experienceCertifierContract) public {
        tendCertifierContract = _tendCertifierContract;
        experienceCertifierContract = _experienceCertifierContract;
        totalSupply = 20;
        balances[msg.sender] = totalSupply;
    }
}
