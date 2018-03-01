# TEND smart contracts

[![CircleCI](https://circleci.com/gh/TendTechnologies/smart-contracts.svg?style=svg&circle-token=db7364e25c1e9cf27e58a79dac5de30af50ed16b)](https://circleci.com/gh/TendTechnologies/smart-contracts)

Please read [our TEND whitepaper](https://www.tend.swiss/files/TEND-white_paper-v1.6.pdf) for more information about the TEND asset tokens and experience tokens and how they fit into the technology platform (chapter D).

## Contract deployments

### Mainnet (id: 1)
|Contract|Address|
| --|--|
|TendAssets||
|TendCertifier||
|AssetToken001||
|ExperienceToken001||
|ExperienceCertifier001||

### Rinkeby testnet (id: 4)
|Contract|Address|
| --|--|
|TendAssets|[...](https://rinkeby.etherscan.io/address/...)|
|TendCertifier|[...](https://rinkeby.etherscan.io/address/...)|
|AssetToken001|[...](https://rinkeby.etherscan.io/address/...)|
|ExperienceToken001|[...](https://rinkeby.etherscan.io/address/...)|
|ExperienceCertifier001|[...](https://rinkeby.etherscan.io/address/...)|

## Testing the contracts

To execute the tests simply run:

```sh
yarn test
```

To get the code coverage of the tests:

```sh
yarn coverage
```
