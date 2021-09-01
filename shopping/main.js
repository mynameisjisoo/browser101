'use strict';
const shoppingCart = document.querySelector('#shoppingCart');
const text = document.querySelector('#text');
const ul = document.querySelector('ul');

shoppingCart.addEventListener('click', () => {
  //    const item = text.value; //사용자가 입력한 내용
  //    const li=document.createElement('li');

  const item = document.createElement(`<li>${text.value}</li>`);
  //   console.log(document.querySelector('ul').);
  li.append(item); //안됨 ㅠㅠ
});
