import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementComponent } from '../dialog-element/dialog-element.component';
import { TicTacGameService } from '../services/tic-tac-game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  check = '0 : 0';

  get startButton() {
    return this.gameService.isGameWork &&
      !this.gameService.playersCeils.X.length
      ? 'START'
      : 'RESTART';
  }

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    public gameService: TicTacGameService
  ) {}

  ngOnInit(): void {
    this.openDialog();
  }

  startGame() {
    this.gameService.startGame();
  }

  openDialog() {
    this.dialog.open(DialogElementComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '400px',
    });
  }

  reset() {
    const confirm = window.confirm('Are you shure?');

    if (confirm) {
      this.gameService.resetGame();
      this.check = '0 : 0';
      this.openDialog();
    }
  }

  setButtonValue(buttonIndex: number) {
    if (this.gameService.board.value[buttonIndex]) return;
    this.gameService.setNewValue(buttonIndex);

    if (!this.gameService.isGameWork) {
      this.openDialog();

      this.check = `${this.gameService.check.X} : ${this.gameService.check.O}`;
    }
  }
}
