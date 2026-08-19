import { LEVELS, TILE_SIZE } from './levels.js';
import { InputManager }     from './input.js';
import { AudioManager }     from './audio.js';
import { Player }           from './player.js';
import { Enemy }            from './enemy.js';
import { Gem, WarpPortal }  from './collectible.js';
import { Renderer }         from './renderer.js';
import { Particle }         from './particle.js';
import { SaveDataManager }  from './savedata.js';
import { HudManager }       from './hud.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.renderer = new Renderer(this.canvas);
    this.input = new InputManager();
    this.audio = new AudioManager();
    this.hud = new HudManager();

    this.levelIdx = 0;
    this.score = 0;
    this.gemsCount = 0;
    this.lives = 3;
    this.isRunning = false;
    this.lastTime = 0;

    this.player = null;
    this.enemies = [];
    this.gems = [];
    this.portal = null;
    this.particles = [];
    this.levelMap = [];

    this._setupUI();
  }

  _setupUI() {
    document.getElementById('btn-play').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-howto').addEventListener('click', () => this.hud.showScreen('howto'));
    document.getElementById('btn-back').addEventListener('click', () => this.hud.showScreen('menu'));

    const soundBtn = document.getElementById('btn-sound-toggle');
    soundBtn.addEventListener('click', () => {
      this.audio.enabled = !this.audio.enabled;
      soundBtn.innerText = this.audio.enabled ? '🔊 SOM: ON' : '🔇 SOM: OFF';
    });

    document.getElementById('btn-restart').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-menu').addEventListener('click', () => this.hud.showScreen('menu'));
    document.getElementById('btn-win-menu').addEventListener('click', () => this.hud.showScreen('menu'));
  }

  startNewGame() {
    this.levelIdx = 0;
    this.score = 0;
    this.gemsCount = 0;
    this.lives = 3;
    this._loadLevel(this.levelIdx);
    this.hud.showScreen('game');
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(t => this._loop(t));
  }

  _loadLevel(idx) {
    const lvlData = LEVELS[idx];
    this.levelMap = lvlData.map.map(row => row.split(''));

    this.player = new Player(lvlData.playerStart.x, lvlData.playerStart.y);
    this.enemies = lvlData.enemies.map(e => new Enemy(e.x, e.y, e.type));
    this.gems = lvlData.gems.map(g => new Gem(g.x, g.y));
    this.portal = new WarpPortal(lvlData.portalX, 11);
    this.particles = [];

    this.hud.showPhaseMessage(`${lvlData.id}\n${lvlData.name}`);
  }

  _spawnParticles(x, y, color) {
    for (let i = 0; i < 6; i++) {
      const vx = (Math.random() - 0.5) * 5;
      const vy = (Math.random() - 0.5) * 5;
      this.particles.push(new Particle(x, y, vx, vy, color, 4, 0.3));
    }
  }

  _nextLevel() {
    this.audio.playPortal();
    this.levelIdx++;

    if (this.levelIdx >= LEVELS.length) {
      this.isRunning = false;
      SaveDataManager.setHighScore(this.score);
      const newBest = SaveDataManager.getHighScore();

      document.getElementById('win-score').innerText = Math.floor(this.score);
      document.getElementById('win-best').innerText = Math.floor(newBest);
      this.hud.showScreen('win');
    } else {
      this._loadLevel(this.levelIdx);
    }
  }

  _handleCollisions() {
    const p = this.player;
    if (p.isDead) return;

    // 1. Coleta de Gemas 💎 espalhadas pelo mapa
    for (const gem of this.gems) {
      if (gem.collected) continue;
      const overlapX = (p.x < gem.x + gem.width) && (p.x + p.width > gem.x);
      const overlapY = (p.y < gem.y + gem.height) && (p.y + p.height > gem.y);

      if (overlapX && overlapY) {
        gem.collected = true;
        this.gemsCount++;
        this.score += 250;
        this.audio.playGem();
        this._spawnParticles(gem.x + 8, gem.y + 10, '#00f2fe');
      }
    }

    // 2. Colisão com Inimigos (Drones)
    for (const enemy of this.enemies) {
      if (enemy.isDead) continue;

      const overlapX = (p.x < enemy.x + enemy.width) && (p.x + p.width > enemy.x);
      const overlapY = (p.y < enemy.y + enemy.height) && (p.y + p.height > enemy.y);

      if (overlapX && overlapY) {
        // Pulo sobre o inimigo ou Golpe de Dash
        if ((p.vy > 0 && p.y + p.height - p.vy <= enemy.y + 10) || p.isDashing) {
          enemy.squish();
          p.stompBounce();
          this.score += 150;
          this.audio.playStomp();
          this._spawnParticles(enemy.x + 13, enemy.y + 12, '#ff007f');
        } else {
          // Dano lateral
          const tookDamage = p.takeDamage();
          if (tookDamage) {
            this.lives--;
            this.audio.playHurt();
            if (this.lives <= 0) {
              p.isDead = true;
            }
          }
        }
      }
    }

    // 3. Colisão com Espinhos de Energia
    const pGridX = Math.floor((p.x + p.width / 2) / TILE_SIZE);
    const pGridY = Math.floor((p.y + p.height) / TILE_SIZE);
    if (this.levelMap[pGridY] && this.levelMap[pGridY][pGridX] === 'S') {
      const tookDamage = p.takeDamage();
      if (tookDamage) {
        this.lives--;
        this.audio.playHurt();
        if (this.lives <= 0) p.isDead = true;
      }
    }

    // 4. Morte do jogador
    if (p.isDead) {
      if (this.lives <= 0) {
        this.isRunning = false;
        SaveDataManager.setHighScore(this.score);
        const best = SaveDataManager.getHighScore();
        document.getElementById('go-score').innerText = Math.floor(this.score);
        document.getElementById('go-coins').innerText = this.gemsCount;
        document.getElementById('go-best').innerText = Math.floor(best);
        this.hud.showScreen('gameover');
      } else {
        this._loadLevel(this.levelIdx);
      }
    }

    // 5. Entrada no Portal Warp
    const currentLevel = LEVELS[this.levelIdx];
    if (p.x >= (currentLevel.portalX * TILE_SIZE) - 10) {
      this._nextLevel();
    }
  }

  _loop(now) {
    if (!this.isRunning) return;

    let dt = (now - this.lastTime) / 1000;
    if (dt > 0.1) dt = 0.1;
    this.lastTime = now;

    const currentLevel = LEVELS[this.levelIdx];

    // Atualiza Jogador
    this.player.update(
      this.input,
      this.levelMap,
      this.audio,
      (x, y, color) => this._spawnParticles(x, y, color),
      dt
    );

    // Atualiza Inimigos & Objetos
    for (const enemy of this.enemies) enemy.update(this.levelMap);
    for (const gem of this.gems) gem.update(dt);
    if (this.portal) this.portal.update(dt);

    // Colisões
    this._handleCollisions();

    // Partículas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    // Câmera
    this.renderer.updateCamera(this.player.x, currentLevel.width);

    // RENDERIZACÃO
    this.renderer.clear();
    this.renderer.drawBackground(currentLevel);
    this.renderer.drawMap(this.levelMap);

    // Desenha Gemas
    for (const gem of this.gems) gem.draw(this.renderer.ctx, this.renderer.cameraX);

    // Desenha Portal
    if (this.portal) this.portal.draw(this.renderer.ctx, this.renderer.cameraX);

    // Desenha Inimigos
    for (const enemy of this.enemies) enemy.draw(this.renderer.ctx, this.renderer.cameraX);

    // Desenha Jogador & Partículas
    this.player.draw(this.renderer.ctx, this.renderer.cameraX);
    for (const p of this.particles) p.draw(this.renderer.ctx, this.renderer.cameraX);

    // HUD
    this.hud.update(currentLevel.id, this.gemsCount, this.score, this.lives);

    requestAnimationFrame(t => this._loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => new Game());
