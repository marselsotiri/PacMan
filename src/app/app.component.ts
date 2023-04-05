import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import TileMap from './game/TileMap';

@Component({
  selector: 'app-game',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class GameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true })
  canvas!: any;

  private tileSize: number = 32;
  private velocity: number = 2

  private ctx!: CanvasRenderingContext2D;
  private interval!: any;
  private tileMap: TileMap;
  private pacman: any;
  private enemies: any;


  constructor() {
    this.tileMap = new TileMap(this.tileSize);
    this.pacman = this.tileMap.getPacman(this.velocity);
    this.enemies = this.tileMap.getEnemies(this.velocity);
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.tileMap.setCanvasSize(this.canvas);
    this.interval = setInterval(() => {
      this.gameLoop();
    }, 1000 / 75);
  }
  
  pause() {
    return !this.pacman.madeFirstMove
  }
  gameLoop() {
    this.tileMap.draw(this.ctx);
    this.pacman.draw(this.ctx)
    this.enemies.forEach((enemy: any) => enemy.draw(this.ctx, this.pause()));
  }
}
