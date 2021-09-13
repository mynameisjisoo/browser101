'use strict';
const field = document.querySelector('.game__field');
const gameBtn = document.querySelector('.game__button');

function init() {
  for (let i = 0; i < 1; i++) {
    const bug = document.createElement('img');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('class', i);
    bug.src = './img/bug.png';
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 200;
    // bug.style.transform = `translate(${randomX}px, ${randomY}px)`;
    bug.style.transform = `translate(0px, 190px)`;
    bug.style.alignSelf = 'auto';
    field.appendChild(bug);
  }
}

init();
