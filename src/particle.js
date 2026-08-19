export class Particle {
  constructor(x, y, vx, vy, color, size, life = 0.4) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.3; // Gravidade
    this.life -= dt;
  }

  draw(ctx, cameraX) {
    if (this.life <= 0) return;
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x - cameraX), Math.floor(this.y), this.size, this.size);
    ctx.restore();
  }
}

export class CoinPop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -7;
    this.life = 0.5;
  }

  update(dt) {
    this.y += this.vy;
    this.vy += 0.4;
    this.life -= dt;
  }

  draw(ctx, cameraX) {
    if (this.life <= 0) return;
    const screenX = Math.floor(this.x - cameraX);
    const screenY = Math.floor(this.y);
    ctx.fillStyle = '#fbc531';
    ctx.beginPath();
    ctx.arc(screenX + 8, screenY + 8, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e1b12c';
    ctx.beginPath();
    ctx.arc(screenX + 8, screenY + 8, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
