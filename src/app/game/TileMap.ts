import MovingDirection from './MovingDirection';
import Pacman from './Pacman';

export default class TileMap {
  public tileSize: number;
  public yellowDot: HTMLImageElement;
  public pinkDot: HTMLImageElement;
  public wall: HTMLImageElement;
  public powerDotAnmationTimerDefault: number;
  public powerDot: HTMLImageElement;

  constructor(tileSize: number) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = '../../assets/images/yellowDot.png';

    this.pinkDot = new Image();
    this.pinkDot.src = '../../assets/images/pinkDot.png';

    this.wall = new Image();
    this.wall.src = '../../assets/images/wall.png';

    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimerDefault = this.powerDotAnmationTimerDefault;
  }

  //1 - wall
  //0 - dots
  //4 - pacman
  //5 - empty space
  //6 - enemy
  //7 - power dot
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx: any) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize);
        }

        //  ctx.strokeStyle = "yellow";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
      }
    }
  }

  getPacman(velocity: number) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
    return null;
  }

  #drawWall(ctx: any, column: any, row: any, size: any) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawDot(ctx: any, column: any, row: any, size: any) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  setCanvasSize(canvas: any) {
    canvas.nativeElement.width = this.map[0].length * this.tileSize;
    canvas.nativeElement.height = this.map.length * this.tileSize;
  }
  didCollideWithEnvironment(x: number, y: number, direction: any) {
    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }
}
