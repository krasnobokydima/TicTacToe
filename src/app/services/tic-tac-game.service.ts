import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { winnerCombinations } from 'src/app/constants';
import { IPlayerCeils, Player } from 'src/app/interfaces';
import { CheckChanceToWinService } from './check-chance-to-win.service';

@Injectable({
  providedIn: 'root',
})
export class TicTacGameService {
  check = { X: 0, O: 0 };
  player: Player = 'X';
  board = new BehaviorSubject(new Array(9).fill(null));
  games = 0;
  isGameWork = true;
  playerName = new BehaviorSubject('player1');
  playersCeils: IPlayerCeils = { X: [], O: [] };
  winner: Player | null = null;

  constructor(private checkChance: CheckChanceToWinService) {}

  checkGame() {
    const isWinner = winnerCombinations.some((combination) =>
      combination.every((index) =>
        this.playersCeils[this.player].includes(index)
      )
    );

    if (isWinner) {
      this.isGameWork = false;
      this.games += 1;
      this.check[this.player] += 1;

      this.winner = this.player;
      return;
    }

    const checkChance = this.checkChance.checkChanceToWin(this.playersCeils);

    if (!checkChance) {
      this.isGameWork = false;
      this.games += 1;
      this.check.X += 1;
      this.check.O += 1;

      this.winner = null;
    }

    this.player = this.player === 'X' ? 'O' : 'X';
  }

  resetGame() {
    this.games = 0;
    this.check = { X: 0, O: 0 };

    this.startGame();
  }

  setNewValue(index: number) {
    const newBoard = [...this.board.value];
    newBoard[index] = this.player;

    this.board.next(newBoard);
    this.playersCeils[this.player].push(index);

    return this.checkGame();
  }

  setPlayerName(playerName: string) {
    this.playerName.next(!playerName.length ? 'player1' : playerName);
  }

  startGame() {
    this.isGameWork = true;
    const newBoard = this.board.value.map((value) => (value = null));

    this.board.next(newBoard);
    this.playersCeils = { X: [], O: [] };
    this.player = 'X';
    this.winner = null;
  }
}
