export const classnames = (...classes) => classes.join(` `);

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const ABI = `[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "currentTurn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "games",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "playerX",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "playerO",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "turns",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "finished",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getBoard",
      "outputs": [
        {
          "internalType": "uint256[9]",
          "name": "",
          "type": "uint256[9]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getGame",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "playerX",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "playerO",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "turns",
              "type": "uint256"
            },
            {
              "internalType": "uint256[9]",
              "name": "board",
              "type": "uint256[9]"
            },
            {
              "internalType": "bool",
              "name": "finished",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "winner",
              "type": "address"
            }
          ],
          "internalType": "struct TicTacToe.Game",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "player",
          "type": "address"
        }
      ],
      "name": "getGameIdsForPlayer",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "space",
          "type": "uint256"
        }
      ],
      "name": "markSpace",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "playerX",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "playerO",
          "type": "address"
        }
      ],
      "name": "newGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "resetBoard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "winner",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`;
