'use strict';
const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.game__button');
const score = document.querySelector('.game__score');

function initGame() {
  //벌레와 당근을 생성한 뒤 field에 추가해줌
  console.log(fieldRect);
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
  if (className === 'carrot') {
    score.textContent = count;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min; //min~max범위까지에서 랜덤한 숫자(max는 포함안됨)
}

playBtn.addEventListener('click', event => {
  initGame();
});

let timer;
function countDown(remainTime) {
  const timer_display = document.querySelector('.timer-display');
  timer_display.innerText = `${remainTime}`;

  function showRemaining() {
    if (remainTime === 0 || carrotCnt === 0 || isBugClicked) {
      isBugClicked = false;
      clearInterval(timer); //함수 멈춤
      if (carrotCnt != 0) showResult('lose', carrotCnt);
      return;
    }
    remainTime--;
    timer_display.innerText = `${remainTime}`;
  }
  timer = setInterval(showRemaining, 1000); //1초에 한번 함수 실행
}
