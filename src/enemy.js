import { TILE_SIZE } from './levels.js';

export class Enemy {
  constructor(gridX, gridY, type = 'drone') {
    this.width = 26;
    this.height = 24;
    this.x = gridX * TILE_SIZE + 3;
    this.y = gridY * TILE_SIZE + 4;
    this.vx = -1.6;
    this.vy = 0;
    this.type = type;
    this.isDead = false;
    this.deadTimer = 0;
    this.animTimer = 0;
  }

  update(levelMap) {
    if (this.isDead) {
      this.deadTimer += 0.05;
      return;
    }

    this.x += this.vx;
    this._collideHorizontal(levelMap);
    this.animTimer += 0.08;
    this.y += Math.sin(this.animTimer) * 0.4;
  }

  _collideHorizontal(levelMap) {
    const r1 = Math.floor(this.y / TILE_SIZE);
    const r2 = Math.floor((this.y + this.height - 1) / TILE_SIZE);

    if (this.vx > 0) {
      const c = Math.floor((this.x + this.width) / TILE_SIZE);
      if (this._isSolid(levelMap, r1, c) || this._isSolid(levelMap, r2, c)) {
        this.vx = -Math.abs(this.vx);
      }
    } else if (this.vx < 0) {
      const c = Math.floor(this.x / TILE_SIZE);
      if (this._isSolid(levelMap, r1, c) || this._isSolid(levelMap, r2, c)) {
        this.vx = Math.abs(this.vx);
      }
    }
  }

  _isSolid(map, r, c) {
    if (r < 0 || r >= map.length || c < 0 || c >= map[0].length) return true;
    return ['G', 'P'].includes(map[r][c]);
  }

  squish() {
    this.isDead = true;
    this.deadTimer = 0;
  }

  draw(ctx, cameraX) {
    const screenX = Math.floor(this.x - cameraX);
    const screenY = Math.floor(this.y);

    if (this.isDead) {
      if (this.deadTimer > 0.4) return;
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(screenX - 4, screenY - 4, 34, 32);
      return;
    }

    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(screenX, screenY + 4, 26, 16, 6);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(screenX, screenY + 4, 26, 16);

    ctx.fillStyle = '#ff0055';
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(screenX + 13, screenY + 12, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00f2fe';
    ctx.fillRect(screenX - 3, screenY + 8, 3, 8);
    ctx.fillRect(screenX + 26, screenY + 8, 3, 8);

    ctx.restore();
  }
}
