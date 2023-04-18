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
    await transaction.wait();
  } catch (error) {
    console.log("Error creating game: ", error);
  }
}

export async function markSpace(contract, connectedAddress, gameId, space) {
  if (connectedAddress === "") {
    return;
  }
  try {
    const transaction = await contract.markSpace(gameId, space);
    console.log(transaction);
    await transaction.wait();
  } catch (error) {
    console.log("Error marking space: ", error);
    alert("Error marking space, check the console");
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
    console.log("Error fetching game ids: ", error);
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
    console.log("Error fetching game data: ", error);
  }
}
