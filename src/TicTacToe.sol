// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

contract TicTacToe {
    address public owner;

    struct Game {
        address playerX;
        address playerO;
        uint256 turns;
        uint256[9] board;
        bool finished;
        address winner;
    }

    mapping(uint256 => Game) public games;

    uint256 internal constant EMPTY = 0;
    uint256 internal constant X = 1;
    uint256 internal constant O = 2;

    uint256 internal _nextGameId;

    constructor(address _owner) {
        owner = _owner;
    }

    function newGame(address playerX, address playerO) public {
        games[_nextGameId].playerX = playerX;
        games[_nextGameId].playerO = playerO;
        _nextGameId++;
    }

    function getGame(uint256 id) public view returns (Game memory) {
        return games[id];
    }

    function getBoard(uint256 id) public view returns (uint256[9] memory) {
        return games[id].board;
    }

    function resetBoard(uint256 id) public {
        require(msg.sender == owner, "Unauthorized");
        delete games[id].board;
    }

    function markSpace(uint256 id, uint256 space) public {
        require(_validPlayerTurn(id), "Unauthorized");
        require(_emptySpace(id, space), "Already marked");
        require(space < 9, "Invalid space");
        require(games[id].finished == false, "Game is finished");

        games[id].board[space] = currentTurn(id);
        games[id].turns++;

        uint256 win = winner(id);
        // No winner
        if (win == 0) {
            return;
        }

        // There is a winner
        games[id].finished = true;
        games[id].winner = msg.sender;
    }

    function currentTurn(uint256 id) public view returns (uint256) {
        return (games[id].turns % 2 == 0) ? X : O;
    }

    function winner(uint256 id) public view returns (uint256) {
        uint256[8] memory wins = [
            _row(id, 0),
            _row(id, 1),
            _row(id, 2),
            _col(id, 0),
            _col(id, 1),
            _col(id, 2),
            _diag(id),
            _antiDiag(id)
        ];
        for (uint256 i; i < wins.length; i++) {
            uint256 win = _checkWin(wins[i]);
            if (win == X || win == O) return win;
        }
        return 0;
    }

    function _validPlayerTurn(uint256 id) internal view returns (bool) {
        uint256 symbol = currentTurn(id);
        if (symbol == X) {
            return msg.sender == games[id].playerX;
        } else if (symbol == O) {
            return msg.sender == games[id].playerO;
        }
        return false;
    }

    function _checkWin(uint256 product) internal pure returns (uint256) {
        if (product == 1) {
            return X;
        }
        if (product == 8) {
            return O;
        }
        return 0;
    }

    function _row(uint256 id, uint256 row) internal view returns (uint256) {
        require(row < 3, "Invalid row");
        uint256 idx = 3 * row;
        return
            games[id].board[idx] *
            games[id].board[idx + 1] *
            games[id].board[idx + 2];
    }

    function _col(uint256 id, uint256 col) internal view returns (uint256) {
        require(col < 3, "Invalid column");
        return
            games[id].board[col] *
            games[id].board[col + 3] *
            games[id].board[col + 6];
    }

    function _diag(uint256 id) internal view returns (uint256) {
        return games[id].board[0] * games[id].board[4] * games[id].board[8];
    }

    function _antiDiag(uint256 id) internal view returns (uint256) {
        return games[id].board[2] * games[id].board[4] * games[id].board[6];
    }

    function _emptySpace(uint256 id, uint256 i) internal view returns (bool) {
        return games[id].board[i] == EMPTY;
    }
}
