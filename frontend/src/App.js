import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress, classnames } from "./consts";
import { createGame, markSpace, getGameIdsForPlayer, getGameData } from "./api";
import Board from "./components/board";

/**
 * TODO List
 * 1. Make the CSS better
 * 2. Show some waiting notification for transaction to confirm
 * 3. ReLearn difference between useEffect useState useMemo useCallback
 */

// todo: think about how we want to handle waiting for transactions to confirm
function App() {
  const [provider] = useState(
    new ethers.providers.Web3Provider(window.ethereum)
  );
  const [signer] = useState(provider.getSigner());
  const [contract] = useState(
    new ethers.Contract(contractAddress, ABI, signer)
  );

  const [connectedAddress, setConnectedAddress] = useState("");
  const [gameData, setGameData] = useState([]);

  const refreshGameData = useCallback(async () => {
    if (connectedAddress === "") {
      return;
    }

    const gameIds = await getGameIdsForPlayer(connectedAddress, contract);

    const promises = gameIds.map((gameId) => getGameData(contract, gameId));
    const currentGameData = await Promise.all(promises);
    setGameData(currentGameData);
  }, [connectedAddress, contract]);

  // If the connectedAddress changes, refresh the game data
  useEffect(() => {
    refreshGameData().catch(console.error);
  }, [connectedAddress, refreshGameData]);

  async function connectWallet() {
    let address;
    try {
      address = await signer.getAddress();
      setConnectedAddress(address);
    } catch (error) {
      await provider.send("eth_requestAccounts", []);

      address = await signer.getAddress();
      setConnectedAddress(address);
    }
  }

  async function createNewGame(opponentAddress) {
    await createGame(contract, connectedAddress, opponentAddress);
    await refreshGameData();
  }

  async function markSpaceForGame(gameId, space) {
    await markSpace(contract, connectedAddress, gameId, space);
    await refreshGameData();
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <button
          onClick={() =>
            createNewGame("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
          }
          className={classnames(
            "bg-blue-500 text-white font-bold px-4 py-2 my-2 rounded hover:bg-blue-700"
          )}
        >
          Create New Game
        </button>

        <div className="">
          <button
            onClick={connectWallet}
            className={classnames(
              "bg-blue-500 text-white font-bold px-4 py-2 my-2 rounded",
              `${
                connectedAddress === ""
                  ? "hover:bg-blue-700"
                  : "cursor-not-allowed"
              }`
            )}
          >
            {connectedAddress === "" ? "Connect Wallet" : connectedAddress}
          </button>
        </div>
      </div>

      <div className="col">
        <h3>TTT games</h3>
        {gameData.map((data, idx) => {
          return (
            <Board
              key={idx}
              player={connectedAddress}
              gameData={data}
              markSpaceForGame={markSpaceForGame}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
