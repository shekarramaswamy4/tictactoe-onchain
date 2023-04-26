import { errorToast } from "./components/alerts";
import { toast } from "react-toastify";
// Smart contract interactions

export async function createGame(contract, connectedAddress, opponentAddress) {
  if (connectedAddress === "") {
    return;
  }

  // TODO: better abstraction for transaction toasts
  let id;
  try {
    const transaction = await contract.newGame(
      connectedAddress,
      opponentAddress
    );
    id = toast.loading(`Waiting for txn ${transaction.hash} to confirm`);

    await transaction.wait();

    toast.update(id, {
      render: "Success!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Error creating game: ", error);
    if (!id) {
      errorToast("Error creating game");
      return;
    }

    // If the toast already exists, update it
    toast.update(id, {
      render: "Error creating game",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
}

export async function markSpace(contract, connectedAddress, gameId, space) {
  if (connectedAddress === "") {
    return;
  }

  let id;
  try {
    const transaction = await contract.markSpace(gameId, space);

    id = toast.loading(`Waiting for txn ${transaction.hash} to confirm`);

    await transaction.wait();

    toast.update(id, {
      render: "Success!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Error marking space: ", error);
    if (!id) {
      errorToast("Error marking space");
      return;
    }

    // If the toast already exists, update it
    toast.update(id, {
      render: "Error marking space",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
}

export async function getGameIdsForPlayer(connectedAddress, contract) {
  if (connectedAddress === "") {
    return;
  }

  try {
    const gameIds = await contract.getGameIdsForPlayer(connectedAddress);
    return gameIds;
  } catch (error) {
    errorToast("Error creating fetching game ids");
    console.error("Error fetching game ids: ", error);
  }
}

export async function getGameData(contract, gameId) {
  try {
    const gameData = await contract.getGame(gameId);
    const gameDataStruct = {
      gameId,
      playerX: gameData.playerX,
      playerO: gameData.playerO,
      turns: gameData.turns,
      finished: gameData.finished,
      winner: gameData.winner,
      board: gameData.board,
    };
    return gameDataStruct;
  } catch (error) {
    errorToast("Error creating fetching game data");
    console.error("Error fetching game data: ", error);
  }
}
