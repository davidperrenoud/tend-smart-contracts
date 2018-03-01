# TEND smart contracts

[![CircleCI](https://circleci.com/gh/TendTechnologies/smart-contracts.svg?style=svg&circle-token=db7364e25c1e9cf27e58a79dac5de30af50ed16b)](https://circleci.com/gh/TendTechnologies/smart-contracts)

Please read [our TEND whitepaper](https://www.tend.swiss/files/TEND-white_paper-v1.6.pdf) for more information about the TEND asset tokens and experience tokens and how they fit into the technology platform (chapter D).

## Contract deployments

### Mainnet (id: 1)
|Contract|Address|
|--|--|
|TendAssets||
|TendCertifier||
|AssetToken001||
|ExperienceToken001||
|ExperienceCertifier001||

### Rinkeby testnet (id: 4)
|Contract|Address|
|--|--|
|TendAssets|[0x039e2ea39e615f25f4776f187e3c4a2afe6be9d8](https://rinkeby.etherscan.io/address/0x039e2ea39e615f25f4776f187e3c4a2afe6be9d8)|
|TendCertifier|[0x3d8a01145bfc0134627a0d8f8c8b37cb77006416](https://rinkeby.etherscan.io/address/0x3d8a01145bfc0134627a0d8f8c8b37cb77006416)|
|AssetToken001|[0x8ea631ee9d6a94777a2f33428bb196434690b1ba](https://rinkeby.etherscan.io/token/0x8ea631ee9d6a94777a2f33428bb196434690b1ba)|
|ExperienceCertifier001|[0x600cb6223935429a866405e2f63859f344c0105c](https://rinkeby.etherscan.io/address/0x600cb6223935429a866405e2f63859f344c0105c)|
|ExperienceToken001|[0x7e6a3f87111bb5112cc8115cc6887fbf999b789a](https://rinkeby.etherscan.io/token/0x7e6a3f87111bb5112cc8115cc6887fbf999b789a)|
|AssetToken002|[0x62134A7Fe630a09bBE0d090b77f824a7E2fC2682](https://rinkeby.etherscan.io/token/0x62134A7Fe630a09bBE0d090b77f824a7E2fC2682)|
|ExperienceCertifier002|[0xDB25C0A3cE2C86d93c77020440b1Ae9D4CA2b88d](https://rinkeby.etherscan.io/address/0xDB25C0A3cE2C86d93c77020440b1Ae9D4CA2b88d)|
|ExperienceToken002|[0x017505F068Ef20a9e312Ef64E9EB8C3cAf0F7295](https://rinkeby.etherscan.io/token/0x017505F068Ef20a9e312Ef64E9EB8C3cAf0F7295)|

## Testing the contracts

To execute the tests simply run:

```sh
yarn test
```

To get the code coverage of the tests:

```sh
yarn coverage
```
