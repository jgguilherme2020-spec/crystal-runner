import { TILE_SIZE } from './levels.js';

export class Gem {
  constructor(gridX, gridY) {
    this.x = gridX * TILE_SIZE + 8;
    this.y = gridY * TILE_SIZE + 4;
    this.width = 16;
    this.height = 20;
    this.collected = false;
    this.animTimer = Math.random() * Math.PI * 2;
  }

  update(dt) {
    if (this.collected) return;
    this.animTimer += dt * 4;
  }

  draw(ctx, cameraX) {
    if (this.collected) return;

    const screenX = Math.floor(this.x - cameraX);
    const floatY = Math.floor(this.y + Math.sin(this.animTimer) * 3);

    ctx.save();
    // Brilho Neon Azul/Ciano
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#00f2fe';

    // Cristal em formato de Diamante
    ctx.beginPath();
    ctx.moveTo(screenX + 8, floatY);
    ctx.lineTo(screenX + 16, floatY + 8);
    ctx.lineTo(screenX + 8, floatY + 20);
    ctx.lineTo(screenX, floatY + 8);
    ctx.closePath();
    ctx.fill();

    // Brilho Interno Branco
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(screenX + 8, floatY + 3);
    ctx.lineTo(screenX + 12, floatY + 8);
    ctx.lineTo(screenX + 8, floatY + 15);
    ctx.lineTo(screenX + 4, floatY + 8);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

export class WarpPortal {
  constructor(gridX, gridY) {
    this.x = gridX * TILE_SIZE;
    this.y = gridY * TILE_SIZE - 40;
    this.width = 36;
    this.height = 70;
    this.rotation = 0;
  }

  update(dt) {
    this.rotation += dt * 3;
  }

  draw(ctx, cameraX) {
    const screenX = Math.floor(this.x - cameraX);
    const screenY = Math.floor(this.y);

    ctx.save();
    ctx.translate(screenX + this.width / 2, screenY + this.height / 2);

    // Anel externo pulsante
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 32, this.rotation * 0.5, 0, Math.PI * 2);
    ctx.stroke();

    // Anel interno ciano
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 24, -this.rotation, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}
