import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress } from "./consts";
import { createGame, markSpace, getGameIdsForPlayer, getGameData } from "./api";

const classnames = (...classes) => classes.join(` `);

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

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <div className="my-2">
          <h3>TicTacToe</h3>
        </div>

        <div className="">
          <button
            onClick={connectWallet}
            class={classnames(
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
        <h3>TTT actions</h3>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() =>
            createNewGame("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
          }
        >
          Create Game
        </button>
      </div>

      <div className="col">
        <h3>TTT games</h3>
        {gameData.map((gameData) => {
          return <h4>{gameData.playerX}</h4>;
        })}
      </div>
    </div>
  );
}

export default App;
