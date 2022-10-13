import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicTacGameService } from '../services/tic-tac-game.service';

interface IDialogData {
  startGame: boolean;
}

@Component({
  selector: 'app-dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./dialog-element.component.css'],
})
export class DialogElementComponent {
  mainInfo = '1 : 0';
  playerName = '';

  get title() {
    if (this.gameService.isGameWork) {
      return 'New game';
    }

    if (!this.gameService.winner) {
      return 'Friendship won!';
    }

    if (this.gameService.player === 'X') {
      return `${this.gameService.playerName.value} win!`;
    }

    return 'player2 win!';
  }

  constructor(
    public gameService: TicTacGameService,
    private dialog: MatDialog
  ) {}

  startGame() {
    this.gameService.startGame();
    this.gameService.setPlayerName(this.playerName);
    this.dialog.closeAll();
  }
}
