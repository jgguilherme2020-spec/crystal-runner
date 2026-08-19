import { TILE_SIZE } from './levels.js';

export class Player {
  constructor(startGridX, startGridY) {
    this.width = 24;
    this.height = 32;
    this.reset(startGridX, startGridY);
  }

  reset(gridX, gridY) {
    this.x = gridX * TILE_SIZE;
    this.y = gridY * TILE_SIZE;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.jumpsLeft = 2; // Pulo Duplo!
    this.dashCooldown = 0;
    this.isDashing = false;
    this.dashTimer = 0;
    this.facing = 1;
    this.isDead = false;
    this.invulnerableTimer = 0;
    this.animTimer = 0;
    this._jumpKeyWasPressed = false;
    this._dashKeyWasPressed = false;
  }

  update(input, levelMap, audio, createParticles, dt) {
    if (this.isDead) return;

    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer -= dt;
    }
    if (this.dashCooldown > 0) {
      this.dashCooldown -= dt;
    }

    const accel = 0.7;
    const maxSpeed = 6;
    const friction = 0.84;
    const gravity = 0.58;
    const jumpForce = -11;

    // --- LÓGICA DE DASH ---
    if (input.dash && !this._dashKeyWasPressed && this.dashCooldown <= 0) {
      this.isDashing = true;
      this.dashTimer = 0.18; // 0.18s de impulso violento
      this.dashCooldown = 0.8; // Cooldown do Dash
      this.vx = this.facing * 14;
      this.vy = 0;
      audio.playDash();
      if (createParticles) {
        createParticles(this.x + this.width / 2, this.y + this.height / 2, '#00f2fe');
      }
    }
    this._dashKeyWasPressed = input.dash;

    if (this.isDashing) {
      this.dashTimer -= dt;
      if (this.dashTimer <= 0) {
        this.isDashing = false;
      }
    } else {
      // Movimento Horizontal Normal
      if (input.left) {
        this.vx -= accel;
        this.facing = -1;
      } else if (input.right) {
        this.vx += accel;
        this.facing = 1;
      } else {
        this.vx *= friction;
      }
      this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));

      // Gravidade
      this.vy += gravity;
      if (this.vy > 13) this.vy = 13;
    }

    // --- LÓGICA DE PULO DUPLO ---
    if (input.jump && !this._jumpKeyWasPressed) {
      if (this.isGrounded) {
        this.vy = jumpForce;
        this.isGrounded = false;
        this.jumpsLeft = 1;
        audio.playJump();
      } else if (this.jumpsLeft > 0) {
        this.vy = jumpForce * 0.92;
        this.jumpsLeft--;
        audio.playDoubleJump();
        if (createParticles) {
          createParticles(this.x + this.width / 2, this.y + this.height, '#ff007f');
        }
      }
    }
    this._jumpKeyWasPressed = input.jump;

    // --- Colisao X ---
    this.x += this.vx;
    this._collideHorizontal(levelMap);

    // --- Colisao Y ---
    this.y += this.vy;
    this.isGrounded = false;
    this._collideVertical(levelMap);

    // Se no chão, reseta o Pulo Duplo
    if (this.isGrounded) {
      this.jumpsLeft = 2;
    }

    // Queda no vácuo
    if (this.y > levelMap.length * TILE_SIZE + 100) {
      this.isDead = true;
    }

    this.animTimer += Math.abs(this.vx) * 0.2;
  }

  _collideHorizontal(levelMap) {
    const tileRows = levelMap.length;
    const tileCols = levelMap[0].length;

    const left = Math.floor(this.x / TILE_SIZE);
    const right = Math.floor((this.x + this.width) / TILE_SIZE);
    const top = Math.floor(this.y / TILE_SIZE);
    const bottom = Math.floor((this.y + this.height - 1) / TILE_SIZE);

    for (let r = top; r <= bottom; r++) {
      for (let c = left; c <= right; c++) {
        if (r >= 0 && r < tileRows && c >= 0 && c < tileCols) {
          const char = levelMap[r][c];
          if (this._isSolid(char)) {
            if (this.vx > 0) {
              this.x = c * TILE_SIZE - this.width - 0.1;
              this.vx = 0;
            } else if (this.vx < 0) {
              this.x = (c + 1) * TILE_SIZE + 0.1;
              this.vx = 0;
            }
          }
        }
      }
    }
  }

  _collideVertical(levelMap) {
    const tileRows = levelMap.length;
    const tileCols = levelMap[0].length;

    const left = Math.floor((this.x + 2) / TILE_SIZE);
    const right = Math.floor((this.x + this.width - 2) / TILE_SIZE);
    const top = Math.floor(this.y / TILE_SIZE);
    const bottom = Math.floor((this.y + this.height) / TILE_SIZE);

    for (let r = top; r <= bottom; r++) {
      for (let c = left; c <= right; c++) {
        if (r >= 0 && r < tileRows && c >= 0 && c < tileCols) {
          const char = levelMap[r][c];
          if (this._isSolid(char)) {
            if (this.vy > 0) {
              this.y = r * TILE_SIZE - this.height;
              this.vy = 0;
              this.isGrounded = true;
            } else if (this.vy < 0) {
              this.y = (r + 1) * TILE_SIZE;
              this.vy = 0;
            }
          }
        }
      }
    }
  }

  _isSolid(char) {
    return ['G', 'P'].includes(char);
  }

  stompBounce() {
    this.vy = -8.5;
    this.jumpsLeft = 1;
  }

  takeDamage() {
    if (this.invulnerableTimer > 0 || this.isDashing) return false;
    this.invulnerableTimer = 1.5;
    this.vy = -6;
    this.vx = -this.facing * 5;
    return true;
  }

  draw(ctx, cameraX) {
    if (this.isDead) return;

    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      return;
    }

    const screenX = Math.floor(this.x - cameraX);
    const screenY = Math.floor(this.y);

    ctx.save();
    ctx.translate(screenX + this.width / 2, screenY + this.height / 2);
    if (this.facing === -1) ctx.scale(-1, 1);

    // Efeito de Rastro de Energia (Dash)
    if (this.isDashing) {
      ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.fillRect(-this.width * 1.2, -this.height / 2, this.width, this.height);
    }

    // Corpo Cibernético Neon
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, -12, 20, 24);

    // Armadura com frisos ciano
    ctx.fillStyle = '#00f2fe';
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 10;
    ctx.fillRect(-8, -10, 16, 12);
    ctx.fillRect(-2, -14, 4, 4); // Conector capacete

    // Capacete & Viseira Brilhante
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -24, 16, 11);
    ctx.fillStyle = '#ff007f'; // Viseira Magenta
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 12;
    ctx.fillRect(0, -21, 8, 4);

    // Pernas animadas
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#334155';
    if (!this.isGrounded) {
      ctx.fillRect(-8, 12, 6, 6);
      ctx.fillRect(2, 8, 6, 6);
    } else {
      const step = Math.sin(this.animTimer) * 4;
      ctx.fillRect(-8, 12 + step, 6, 6);
      ctx.fillRect(2, 12 - step, 6, 6);
    }

    ctx.restore();
  }
}
