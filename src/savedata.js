export class SaveDataManager {
  static getHighScore() {
    try {
      const val = localStorage.getItem('super_runner_highscore');
      return val ? parseInt(val, 10) : 0;
    } catch (e) { return 0; }
  }

  static setHighScore(score) {
    try {
      const current = this.getHighScore();
      if (score > current) {
        localStorage.setItem('super_runner_highscore', score.toString());
        return true;
      }
    } catch (e) {}
    return false;
  }
}
