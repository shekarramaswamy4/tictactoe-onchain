# On Chain TicTacToe

This is the smart contract and frontend implementation of an on chain tic tac toe game!

The smart contract is deployed on Polygon [here](https://polygonscan.com/address/0xa274b39B7c5c7d0f831AE3732F4b07AfE1E4b74C). The dApp is hosted [here](https://tictactoe-onchain.vercel.app/).

The motivation for this project was simply that I wanted:

- To learn the e2e process of deploying and managing a smart contract with Foundry
- To learn tailwind at a high level, and get better at React more broadly

## Smart Contract

The smart contract is heavily inspired by: https://book.tictactoken.co. I made a few modifications in order to make the frontend more ergonimic. The contract itself is located at `src/TicTacToe.sol`.

The command to deploy the smart contract is

```
forge create --chain 137 --rpc-url https://polygon-mainnet.g.alchemy.com/v2/[your alchemy key]  --constructor-args [your pub key] --private-key [your priv key] --etherscan-api-key [polyscan-key] --verify src/TicTacToe.sol:TicTacToe
```

The contract itself is verified on Polygonscan. It doesn't handle any crypto and is safe to use. The only permissions the owner has is to reset the game board, which is more of an artifact of the original smart contract than anything else.

## Frontend

The frontend uses React.js and Tailwind. The CSS is barebones and was purely meant for a proof of concept.

I made an active effort to have the transaction sending UX decent by using popups that notify you if and when your transactions succeed.

It's hosted on Vercel.
