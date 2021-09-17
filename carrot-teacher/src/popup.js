'use strict';
// export default : 이 클래스를 외부로 노출시킴
export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      //onClick이 undefined일수있어서 값이 있을때만 호출하도록
      //등록된 onclick이라는 함수가 있으면?(true이면) &&뒤에있는게 실행?
      //= onclick이 있을때만 onClick()실행
      this.hide();
    });
  }

  //popup에 setclicklistener를 등록하면 등록된 onclick을 호출 (onclick이라는 콜백을 등록해놓고 팝업에서 클릭이벤트발생하면 onclick이라는 콜백호출)
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}

function printMessage(text) {
  let message = text;
  if (text == null || text == undefined) {
    message = 'Nothing to display';
  }
  console.log(message);
}

function printMessage(text) {
  const message = text ?? 'Nothing to display';
  console.log(message);
  //text가 있으면 그대로 쓰고 없으면 nothing ~출력
}
