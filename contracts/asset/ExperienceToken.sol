//! ExperienceToken contract
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

import "../base/Ownable.sol";
import "../TendCertifier.sol";
import "./ConfirmableToken.sol";
import "./ExperienceCertifier.sol";


contract ExperienceToken is ConfirmableToken {
    /// The TEND certifier allowing to use the asset token.
    TendCertifier public tendCertifierContract;

    /// The experience certifier allowing to use the experience token.
    ExperienceCertifier public experienceCertifierContract;

    // Helper constants
    string public constant name = "Experience Name";
    string public constant symbol = "SYM";
    uint8 public constant decimals = 0;

    /**
     * @dev Overloaded modifier to check if the user is certified.
     * @param _who The address to check for verification.
     */
    modifier onlyCertified(address _who) {
        require(tendCertifierContract.certified(_who) && experienceCertifierContract.certified(_who));
        _;
    }

    /// Constructor.
    function ExperienceToken(TendCertifier _tendCertifierContract, ExperienceCertifier _experienceCertifierContract, uint256 _totalSupply, address tokenHolder) public {
        tendCertifierContract = _tendCertifierContract;
        experienceCertifierContract = _experienceCertifierContract;
        totalSupply = _totalSupply;
        balances[tokenHolder] = _totalSupply;
    }
}
