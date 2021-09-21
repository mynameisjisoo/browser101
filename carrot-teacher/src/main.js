'use strict';
import PopUp from './popup.js'; //index.html에서도 typ을 module이라고 지정해줘야함
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();
/*builder pattern 이용하면 정확하게 어떤값을 설정하는지 한눈에 보기 좋음
game클래스에서 builder 패턴을 이용해서 new game 을 만들게 설계->
game클래스 호출해야 할 곳에서 게임빌더로 생성자 명확하게 입력해서 game 만들기 */

game.setGameStopListener(reason => {
  //reason을 문자열로 받기때문에 오타 방지 등 위해서 reason obj만들어서 받음
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY❓';
      break;
    case Reason.win:
      message = 'YOU WON🎉';
      break;
    case Reason.lose:
      message = 'YOU LOST💩';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
