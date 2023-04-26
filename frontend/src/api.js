import { transactionToast, errorToast } from "./components/alerts";
// Smart contract interactions

export async function createGame(contract, connectedAddress, opponentAddress) {
  if (connectedAddress === "") {
    return;
  }
  try {
    const transaction = await contract.newGame(
      connectedAddress,
      opponentAddress
    );
    console.log(transaction);
    await transactionToast(transaction.hash, transaction.wait);
  } catch (error) {
    errorToast("Error creating game");
    console.error("Error creating game: ", error);
  }
}

export async function markSpace(contract, connectedAddress, gameId, space) {
  if (connectedAddress === "") {
    return;
  }
  try {
    const transaction = await contract.markSpace(gameId, space);
    await transactionToast(transaction.hash, transaction.wait);
  } catch (error) {
    errorToast("Error marking space");
    console.error("Error marking space: ", error);
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
