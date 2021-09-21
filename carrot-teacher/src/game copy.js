'use strict';
import Field from './field.js';
import PopUp from './popup.js';
export default class Game {
  constructor() {
    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn.addEventListener('click', this.onClick);
  }
  setClickListener(onStartGameClick) {
    this.onStartGameClick = onStartGameClick;
  }

  startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
  }

  stopGame() {
    started = false;
    stopGameTinmer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY❓');
    sound.playAlert();
    sound.stopBackground();
  }
}
