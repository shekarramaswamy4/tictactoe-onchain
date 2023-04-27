import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress, classnames } from "./consts";
import { createGame, markSpace, getGameIdsForPlayer, getGameData } from "./api";
import CreateGameModal from "./components/createGameModal";
import Board from "./components/board";
import { ToastContainer } from "react-toastify";
import { errorToast } from "./components/alerts";
import "react-toastify/dist/ReactToastify.css";

/**
 * Future Improvements List
 * 1. Make the CSS better
 * 2. Handle errors with custom messaging
 */

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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [gameCreateWalletText, setGameCreateWalletText] = useState("");

  const refreshGameData = useCallback(async () => {
    if (connectedAddress === "") {
      return;
    }

    const gameIds = await getGameIdsForPlayer(connectedAddress, contract);
    if (gameIds === undefined || gameIds.length === 0) {
      return;
    }

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
    if (opponentAddress === undefined || opponentAddress === "") {
      errorToast("Please enter a valid wallet address!");
      return;
    }

    setShowCreateModal(false);
    setGameCreateWalletText("");

    await createGame(contract, connectedAddress, opponentAddress);
    await refreshGameData();
  }

  async function markSpaceForGame(gameId, space) {
    await markSpace(contract, connectedAddress, gameId, space);
    await refreshGameData();
  }

  const toggleCreateGamePopup = () => {
    if (connectedAddress === "") {
      errorToast("Please connect your wallet first!");
      return;
    }
    setShowCreateModal(!showCreateModal);
  };

  return (
    <div className="container mx-auto">
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      {showCreateModal && (
        <CreateGameModal
          content={
            <>
              <div className={"flex flex-col items-center p-10"}>
                <input
                  type="text"
                  id="wallet-address"
                  className={
                    "border text-gray-900 rounded-lg block w-full p-2.5 focus:ring-blue-500 outline-blue-500"
                  }
                  placeholder="Wallet address of opponent (0x...)"
                  value={gameCreateWalletText}
                  onInput={(e) => setGameCreateWalletText(e.target.value)}
                  required
                ></input>
                <button
                  className={
                    "mt-8 bg-blue-500 text-white font-bold px-4 py-2 my-2 rounded hover:bg-blue-700"
                  }
                  onClick={() => createNewGame(gameCreateWalletText)}
                >
                  Create
                </button>
              </div>
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
            {connectedAddress === ""
              ? "Connect Polygon Wallet"
              : connectedAddress}
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
