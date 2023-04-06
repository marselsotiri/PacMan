import { Component, OnInit, ViewChild } from '@angular/core';
import TileMap from '../game/TileMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true })
  canvas!: any;

  private tileSize: number = 32;
  private velocity: number = 2;

  private ctx!: CanvasRenderingContext2D;
  private interval!: any;
  private tileMap: TileMap;
  public pacman: any;
  private enemies: any;
  private gameOver!: boolean;
  private gameWin!: boolean;
  private gameOverSound!: HTMLAudioElement;
  private gameWinSound!: HTMLAudioElement;

  constructor(private router: Router) {
    this.tileMap = new TileMap(this.tileSize);
    this.pacman = this.tileMap.getPacman(this.velocity);
    this.enemies = this.tileMap.getEnemies(this.velocity);
    this.gameOver = false;
    this.gameWin = false;
    this.gameOverSound = new Audio('./../assets/sounds/gameOver.wav');
    this.gameWinSound = new Audio('./../assets/sounds/gameWin.wav');
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.tileMap.setCanvasSize(this.canvas);
    this.interval = setInterval(() => {
      this.gameLoop();
    }, 1000 / 75);
  }

  pause() {
    return !this.pacman.madeFirstMove || this.gameOver || this.gameWin;
  }

  gameLoop() {
    this.tileMap.draw(this.ctx);
    this.drawGameEnd();
    this.pacman.draw(this.ctx, this.pause(), this.enemies);
    this.enemies.forEach((enemy: any) =>
      enemy.draw(this.ctx, this.pause(), this.pacman)
    );
    this.checkGameOver();
    this.checkGameWin();
  }

  checkGameOver() {
    if (!this.gameOver) {
      this.gameOver = this.isGameOver();
      if (this.gameOver) {
        this.gameOverSound.play();
      }
    }
  }

  checkGameWin() {
    if (!this.gameWin) {
      this.gameWin = this.tileMap.didWin();
      if (this.gameWin) {
        this.gameWinSound.play();
      }
    }
  }

  isGameOver() {
    return this.enemies.some(
      (enemy: any) =>
        !this.pacman.powerDotActive && enemy.collideWith(this.pacman)
    );
  }

  drawGameEnd() {
    if (this.gameOver || this.gameWin) {
      let text = '   You Win!';
      if (this.gameOver) {
        text = ' Game Over';
      }

      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(
        0,
        this.canvas.nativeElement.height / 2.9,
        this.canvas.nativeElement.width,
        80
      );

      this.ctx.font = '75px comic sans';
      const gradient: any = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.nativeElement.width,
        0
      );
      gradient.addColorStop('0', 'magenta');
      gradient.addColorStop('0.5', 'blue');
      gradient.addColorStop('1.0', 'red');

      this.ctx.fillStyle = gradient;
      this.ctx.fillText(text, 10, this.canvas.nativeElement.height / 2);
    }
  }
}
