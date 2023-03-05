import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress } from "./consts";
import { createGame, markSpace, getGameIdsForPlayer } from "./api";

const classnames = (...classes) => classes.join(` `);

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(() => {
    // Fetch game ids for player
    const fetchData = async () => {
      const gameIds = await getGameIdsForPlayer(connectedAddress, contract);
      console.log(gameIds);
    };

    fetchData().catch(console.error);

    // document.title = `You clicked ${count} times`;
  }, [connectedAddress, contract]);

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
            createGame(
              contract,
              connectedAddress,
              "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
            )
          }
        >
          Create Game
        </button>
      </div>
    </div>
  );
}

export default App;
