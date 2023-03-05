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
    console.log("Error: ", error);
  }

  // TODO: should refresh the game list on main page (how?)
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
    console.log("Error: ", error);
  }
}

export async function getGameIdsForPlayer(connectedAddress, contract) {
  if (connectedAddress === "") {
    return;
  }
  const gameIds = await contract.getGameIdsForPlayer(connectedAddress);
  return gameIds;
}
