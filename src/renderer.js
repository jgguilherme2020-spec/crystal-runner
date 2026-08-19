import { TILE_SIZE } from './levels.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.cameraX = 0;
    this._setupResize();
  }

  _setupResize() {
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  updateCamera(playerX, mapWidthTiles) {
    const targetX = playerX - this.width * 0.35;
    const maxCameraX = (mapWidthTiles * TILE_SIZE) - this.width;
    this.cameraX += (targetX - this.cameraX) * 0.1;
    this.cameraX = Math.max(0, Math.min(maxCameraX, this.cameraX));
  }

  drawBackground(level) {
    const ctx = this.ctx;
    ctx.fillStyle = level.skyColor;
    ctx.fillRect(0, 0, this.width, this.height);

    // Grid Cyber e estrelas em parallax
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    const offsetX = -(this.cameraX * 0.2) % gridSize;

    for (let x = offsetX; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }

  drawMap(levelMap) {
    const ctx = this.ctx;
    const rows = levelMap.length;
    const cols = levelMap[0].length;

    const startCol = Math.max(0, Math.floor(this.cameraX / TILE_SIZE) - 1);
    const endCol = Math.min(cols - 1, Math.ceil((this.cameraX + this.width) / TILE_SIZE) + 1);

    for (let r = 0; r < rows; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const char = levelMap[r][c];
        const screenX = Math.floor(c * TILE_SIZE - this.cameraX);
        const screenY = Math.floor(r * TILE_SIZE);

        if (char === 'G') {
          // Chao Tech
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = '#00f2fe';
          ctx.fillRect(screenX, screenY, TILE_SIZE, 3); // Borda superior brilhante
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
          ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
        } else if (char === 'P') {
          // Plataforma Flutuante Cyber
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE / 2);
          ctx.fillStyle = '#ff007f';
          ctx.fillRect(screenX, screenY, TILE_SIZE, 3); // Borda rosa brilhante
        } else if (char === 'S') {
          // Espinho de Energia
          ctx.fillStyle = '#ff0055';
          ctx.shadowColor = '#ff0055';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(screenX + TILE_SIZE / 2, screenY);
          ctx.lineTo(screenX + TILE_SIZE, screenY + TILE_SIZE);
          ctx.lineTo(screenX, screenY + TILE_SIZE);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
  }
}
