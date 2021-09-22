'use strict';
import * as sound from './sound.js';
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
});

export class Field {
  constructor(carrorCount, bugCount) {
    this.carrorCount = carrorCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener('click', this.onClick); //방법1. this그대로 넘기고 onclick함수를 멤버변수로 고치기

    /*함수를 인자로 전달할 때 클래스 정보는 전달 안됨(this.onclick에 포함된 클래스 무시됨)
    onclick은 field클래스의 멤버 함수라 this.onclick하면 이 클래스 정보 같이 전달될 것 같지만
    클래스 무시된 상태로 함수만 전달됨(무시하고싶지않을 때는 함수와 클래스 정보를 바인딩해줘야함)
    
    방법2. bind 이용해서 this바인딩하기
    this.onClick = this.onClick.bind(this); <- 이렇게 해도 되나 보통은 arrow function을 씀
    
    방법3. arrow Function 이용하는 방법 (arrowfunction은 this가 유지됨)
    this.field.addEventListener('click', (event)=>this.onClick(event)); 
    */
  }
  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrorCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  /*addItem은 이 field안에서만 쓰여야 함. 타입스크립트는 private멤버변수를 만들수가 있지만
  JS는 private이 통용적으로 쓰이지않기때문에 _(언더스코어)를 이용해서
  외부에서 봤을 때 언더스코어는 외부에서 부르면 안되는 것으로 생각하도록 함(외부에서 private인걸 알 수 있도록)
  하지만 좋지 않은 방법 
  */
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  //this 바인딩을 위해서 onClick이라는 멤버변수로 만들고 멤버변수는 arrow function을 가리키게 함
  onClick = event => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

//클래스와 상관없는 함수 (오브젝트를 생성하는것과 관계없는 함수?)는 클래스 밖에 만들는게 효율적
//static이라 this.randomNumber로 부를필요없음
function randomNumber(min, max) {
  return Math.random() * (max - min) + min; //min~max범위까지에서 랜덤한 숫자(max는 포함안됨)
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
