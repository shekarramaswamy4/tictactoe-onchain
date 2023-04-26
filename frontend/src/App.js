import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress, classnames } from "./consts";
import { createGame, markSpace, getGameIdsForPlayer, getGameData } from "./api";
import CreateGameModal from "./components/createGameModal";
import Board from "./components/board";

/**
 * TODO List
 * 1. Make the CSS better
 * 2. Show some waiting notification for transaction to confirm
 * 3. ReLearn difference between useEffect useState useMemo useCallback
 * 4. Choose who you play [in progress]
 */

/**
 * Questions
 * 1. Recommend a good way to handle waiting for transactions to confirm.
 * - Specifically with preference to how code should be structured in api etc.
 * 2. Should I just be using functional components instead of classes
 */

// todo: think about how we want to handle waiting for transactions to confirm
const App = () => {
  const [provider] = useState(
    new ethers.providers.Web3Provider(window.ethereum)
  );
  const [signer] = useState(provider.getSigner());
  const [contract] = useState(
    new ethers.Contract(contractAddress, ABI, signer)
  );

  const [connectedAddress, setConnectedAddress] = useState("");
  const [gameData, setGameData] = useState([]);
  const [showCreateModal, setShowCreateModel] = useState(false);

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

  const toggleCreateGamePopup = () => setShowCreateModel(!showCreateModal);

  return (
    <div className="container mx-auto">
      {showCreateModal && (
        <CreateGameModal
          content={
            <>
              <b>Design your Popup</b>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <button onClick={() => console.log("hi")}>Test button</button>
            </>
          }
          handleClose={toggleCreateGamePopup}
        />
      )}

      <div className="flex flex-row justify-between">
        <button
          onClick={() =>
            // createNewGame("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
            toggleCreateGamePopup()
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
};

export default App;
