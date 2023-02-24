import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "0xa274b39B7c5c7d0f831AE3732F4b07AfE1E4b74C";
  const ABI = `[{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"player","type":"address"}],"name":"_getSymbol","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"currentTurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"games","outputs":[{"internalType":"address","name":"playerX","type":"address"},{"internalType":"address","name":"playerO","type":"address"},{"internalType":"uint256","name":"turns","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getBoard","outputs":[{"internalType":"uint256[9]","name":"","type":"uint256[9]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"space","type":"uint256"}],"name":"markSpace","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"playerX","type":"address"},{"internalType":"address","name":"playerO","type":"address"}],"name":"newGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"resetBoard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"winner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  async function createGame() {
    let address;
    try {
      address = await signer.getAddress();
      console.log(address);
    } catch (error) {
      console.log(error);
      await provider.send("eth_requestAccounts", []);
      return;
    }

    try {
      // const transaction = await contract.newGame(
      //   address,
      //   address,
      // );
      // console.log(transaction);
      // await transaction.wait();
      const getBoardTxn = await contract.getBoard(0);
      console.log(getBoardTxn);
      const res = await getBoardTxn.wait();
      console.log(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // createGame().catch(console.error);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <h3>TicTacToe</h3>
        </div>
      </div>

      <div className="col">
        <h3>TTT actions</h3>
        <button type="submit" className="btn btn-dark" onClick={createGame}>
          Create Game
        </button>
      </div>
    </div>
  );
}

export default App;
