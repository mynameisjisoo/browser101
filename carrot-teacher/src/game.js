'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

/*자바스크립트로 타입 보장 하는 방법
 ex) reason에 정해진 글자만 입력하도록?
*/
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel'
});

//Builder Pattern

/*builder pattern 이용하면 정확하게 어떤값을 설정하는지 한눈에 보기 좋음
game클래스에서 builder 패턴을 이용해서 new game 을 만들게 설계->
game클래스 호출해야 할 곳에서 게임빌더로 생성자 명확하게 입력해서 game 만들기 */
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num;
    return this;
  }
  build() {
    console.log(this);
    return new Game(
      //game 생성자의 정의를 같이 볼 수 있어서 어떤 순서로 써야하는지 볼 수 있음
      this.gameDuration, //<-prettier가 한줄로 쓰느것 방지
      this.carrotCount,
      this.bugCount
    );
  }
}

//Game클래스는 외부 노출안되게 하고 gameBuilder를 통해서 duration 등 등록하게 함
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
