// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "ds-test/test.sol";
import "forge-std/Vm.sol";

import "../src/TicTacToe.sol";

contract User {
    TicTacToe internal ttt;
    Vm internal vm;
    address internal _address;

    constructor(
        address address_,
        TicTacToe _ttt,
        Vm _vm
    ) {
        _address = address_;
        ttt = _ttt;
        vm = _vm;
    }

    function markSpace(uint256 id, uint256 space) public {
        vm.prank(_address);
        ttt.markSpace(id, space);
    }
}

contract TicTacToeTest is DSTest {
    Vm internal vm = Vm(HEVM_ADDRESS);
    TicTacToe internal ttt;
    User internal playerX;
    User internal playerO;

    uint256 internal constant EMPTY = 0;
    uint256 internal constant X = 1;
    uint256 internal constant O = 2;

    address internal constant OWNER = address(1);
    address internal constant PLAYER_X = address(2);
    address internal constant PLAYER_O = address(3);

    function setUp() public {
        ttt = new TicTacToe(OWNER);
        playerX = new User(PLAYER_X, ttt, vm);
        playerO = new User(PLAYER_O, ttt, vm);
        ttt.newGame(PLAYER_X, PLAYER_O);
    }

    function test_get_board() public {
        uint256[9] memory expected = [
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY
        ];
        uint256[9] memory actual = ttt.getBoard(0);

        for (uint256 i = 0; i < 9; i++) {
            assertEq(actual[i], expected[i]);
        }
    }

    function test_reset_board() public {
        playerX.markSpace(0, 3);
        playerO.markSpace(0, 0);
        playerX.markSpace(0, 4);
        playerO.markSpace(0, 1);
        playerX.markSpace(0, 5);
        vm.prank(OWNER);
        ttt.resetBoard(0);
        uint256[9] memory expected = [
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY,
            EMPTY
        ];
        uint256[9] memory actual = ttt.getBoard(0);

        for (uint256 i = 0; i < 9; i++) {
            assertEq(actual[i], expected[i]);
        }
    }

    function test_winner() public {
        playerX.markSpace(0, 0);
        playerO.markSpace(0, 1);
        playerX.markSpace(0, 3);
        (, , , , bool finished, address winner) = ttt.games(0);
        assert(!finished);
        assertEq(winner, address(0));

        playerO.markSpace(0, 4);
        playerX.markSpace(0, 6);
        assertEq(ttt.winner(0), X);
        (, , , , finished, winner) = ttt.games(0);
        assert(finished);
        assertEq(winner, PLAYER_X);

        vm.expectRevert("Game is finished");
        playerO.markSpace(0, 5);
    }

    function test_can_mark_space_with_X() public {
        playerX.markSpace(0, 0);
        assertEq(ttt.getBoard(0)[0], X);
    }

    function test_can_mark_space_with_O() public {
        playerX.markSpace(0, 0);
        playerO.markSpace(0, 1);
        assertEq(ttt.getBoard(0)[1], O);
    }

    function test_cannot_overwrite_marked_space() public {
        playerX.markSpace(0, 0);

        vm.expectRevert("Already marked");
        playerO.markSpace(0, 0);
    }

    function test_symbols_must_alternate() public {
        playerX.markSpace(0, 0);
        vm.expectRevert("Unauthorized");
        playerX.markSpace(0, 1);
    }

    function test_tracks_current_turn() public {
        assertEq(ttt.currentTurn(0), X);
        playerX.markSpace(0, 0);
        assertEq(ttt.currentTurn(0), O);
        playerO.markSpace(0, 1);
        assertEq(ttt.currentTurn(0), X);
    }

    function test_checks_for_horizontal_win() public {
        playerX.markSpace(0, 0);
        playerO.markSpace(0, 3);
        playerX.markSpace(0, 1);
        playerO.markSpace(0, 4);
        playerX.markSpace(0, 2);
        assertEq(ttt.winner(0), X);
    }

    function test_checks_for_horizontal_win_row2() public {
        playerX.markSpace(0, 3);
        playerO.markSpace(0, 0);
        playerX.markSpace(0, 4);
        playerO.markSpace(0, 1);
        playerX.markSpace(0, 5);
        assertEq(ttt.winner(0), X);
    }

    function test_checks_for_vertical_win() public {
        playerX.markSpace(0, 1);
        playerO.markSpace(0, 0);
        playerX.markSpace(0, 2);
        playerO.markSpace(0, 3);
        playerX.markSpace(0, 4);
        playerO.markSpace(0, 6);
        assertEq(ttt.winner(0), O);
    }

    function test_checks_for_diagonal_win() public {
        playerX.markSpace(0, 0);
        playerO.markSpace(0, 1);
        playerX.markSpace(0, 4);
        playerO.markSpace(0, 5);
        playerX.markSpace(0, 8);
        assertEq(ttt.winner(0), X);
    }

    function test_checks_for_antidiagonal_win() public {
        playerX.markSpace(0, 1);
        playerO.markSpace(0, 2);
        playerX.markSpace(0, 3);
        playerO.markSpace(0, 4);
        playerX.markSpace(0, 5);
        playerO.markSpace(0, 6);
        assertEq(ttt.winner(0), O);
    }

    function test_draw_returns_no_winner() public {
        playerX.markSpace(0, 4);
        playerO.markSpace(0, 0);
        playerX.markSpace(0, 1);
        playerO.markSpace(0, 7);
        playerX.markSpace(0, 2);
        playerO.markSpace(0, 6);
        playerX.markSpace(0, 8);
        playerO.markSpace(0, 5);
        assertEq(ttt.winner(0), 0);
    }

    function test_empty_board_returns_no_winner() public {
        assertEq(ttt.winner(0), 0);
    }

    function test_game_in_progress_returns_no_winner() public {
        playerX.markSpace(0, 1);
        assertEq(ttt.winner(0), 0);
    }

    function test_contract_owner() public {
        assertEq(ttt.owner(), OWNER);
    }

    function test_owner_can_reset_board() public {
        vm.prank(OWNER);
        ttt.resetBoard(0);
    }

    function test_non_owner_cannot_reset_board() public {
        vm.expectRevert("Unauthorized");
        ttt.resetBoard(0);
    }

    function test_stores_player_X() public {
        (, address playerXAddr, , , , ) = ttt.games(0);
        assertEq(playerXAddr, PLAYER_X);
    }

    function test_stores_player_O() public {
        (, , address playerOAddr, , , ) = ttt.games(0);
        assertEq(playerOAddr, PLAYER_O);
    }

    function test_auth_nonplayer_cannot_mark_space() public {
        vm.expectRevert("Unauthorized");
        ttt.markSpace(0, 0);
    }

    function test_auth_playerX_can_mark_space() public {
        vm.prank(PLAYER_X);
        ttt.markSpace(0, 0);
    }

    function test_auth_playerO_can_mark_space() public {
        vm.prank(PLAYER_X);
        ttt.markSpace(0, 0);

        vm.prank(PLAYER_O);
        ttt.markSpace(0, 1);
    }

    function test_creates_new_game() public {
        ttt.newGame(address(5), address(6));
        (
            uint256 id,
            address playerXAddr,
            address playerOAddr,
            uint256 turns,
            ,

        ) = ttt.games(1);
        assertEq(id, 1);
        assertEq(playerXAddr, address(5));
        assertEq(playerOAddr, address(6));
        assertEq(turns, 0);
    }

    function test_fetches_games_for_player() public {
        ttt.newGame(PLAYER_X, address(4));
        uint256[] memory gameIds = ttt.getGameIdsForPlayer(PLAYER_X);
        assertEq(gameIds.length, 2);
        assertEq(gameIds[0], 0);
        assertEq(gameIds[1], 1);

        ttt.newGame(PLAYER_O, address(4));
        uint256[] memory gameIdsO = ttt.getGameIdsForPlayer(PLAYER_O);
        assertEq(gameIdsO.length, 2);
        assertEq(gameIdsO[0], 0);
        assertEq(gameIdsO[1], 2);
    }

    function test_cant_play_yourself() public {
        vm.expectRevert("Can't play yourself");
        ttt.newGame(address(4), address(4));
    }
}
