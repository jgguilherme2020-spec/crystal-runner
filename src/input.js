// input.js — Teclado + Touch com suporte a Dash e Pulo Duplo
export class InputManager {
  constructor() {
    this.keys = {};
    this.touchState = { left: false, right: false, jump: false, dash: false };
    this._jumpPressed = false;
    this._dashPressed = false;
    this._setupEvents();
  }

  _setupEvents() {
    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      if (['Space', 'ArrowUp', 'KeyW', 'ShiftLeft', 'ShiftRight'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    const leftBtn  = document.getElementById('touch-left');
    const rightBtn = document.getElementById('touch-right');
    const jumpBtn  = document.getElementById('touch-jump');
    const dashBtn  = document.getElementById('touch-dash');

    const bindTouch = (btn, action) => {
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchState[action] = true; }, { passive: false });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); this.touchState[action] = false; }, { passive: false });
      btn.addEventListener('mousedown', () => { this.touchState[action] = true; });
      btn.addEventListener('mouseup', () => { this.touchState[action] = false; });
    };

    bindTouch(leftBtn,  'left');
    bindTouch(rightBtn, 'right');
    bindTouch(jumpBtn,  'jump');
    bindTouch(dashBtn,  'dash');
  }

  get left() {
    return !!(this.keys['ArrowLeft'] || this.keys['KeyA'] || this.touchState.left);
  }

  get right() {
    return !!(this.keys['ArrowRight'] || this.keys['KeyD'] || this.touchState.right);
  }

  get jump() {
    return !!(this.keys['Space'] || this.keys['ArrowUp'] || this.keys['KeyW'] || this.touchState.jump);
  }

  get dash() {
    return !!(this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.keys['KeyK'] || this.touchState.dash);
  }
}
