export class HudManager {
  constructor() {
    this.screens = {
      menu: document.getElementById('screen-menu'),
      howto: document.getElementById('screen-howto'),
      game: document.getElementById('screen-game'),
      gameover: document.getElementById('screen-gameover'),
      win: document.getElementById('screen-win')
    };

    this.elements = {
      level: document.getElementById('hud-level'),
      coins: document.getElementById('hud-coins'),
      score: document.getElementById('hud-score'),
      lives: document.getElementById('hud-lives'),
      phaseMsg: document.getElementById('phase-msg')
    };
  }

  showScreen(name) {
    Object.keys(this.screens).forEach(k => {
      if (k === name) this.screens[k].classList.add('active');
      else this.screens[k].classList.remove('active');
    });
  }

  update(levelId, coins, score, lives) {
    if (this.elements.level) this.elements.level.innerText = levelId;
    if (this.elements.coins) this.elements.coins.innerText = `✨ ${coins}`;
    if (this.elements.score) this.elements.score.innerText = String(Math.floor(score)).padStart(6, '0');
    if (this.elements.lives) this.elements.lives.innerText = `❤️ x${lives}`;
  }

  showPhaseMessage(text) {
    if (!this.elements.phaseMsg) return;
    this.elements.phaseMsg.innerText = text;
    this.elements.phaseMsg.classList.remove('hidden');
    setTimeout(() => {
      this.elements.phaseMsg.classList.add('hidden');
    }, 2000);
  }
}
