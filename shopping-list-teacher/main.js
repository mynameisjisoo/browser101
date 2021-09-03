'use strict';
const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

/*현업에서 주석으로 코드를 그대로 설명하는 것은 필요하지 않음.  공부용으로만 남겨두기!*/
function onAdd() {
  //1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  //2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createItem(text);
  //3. items 컨테이너 안에 새로 만든 아이템 추가
  items.appendChild(item);
  //4. 새로 추가된 아이템으로 스크롤링 (많이 입력했을 때 스크롤이 자동으로 따라 내려오지 않음)
  item.scrollIntoView({ block: 'center' });
  //5. input을 초기화
  input.value = '';
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item_name');
  name.innerText = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item_delete');
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>'; // 변경 할 일이 없어서

  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  const itemDiver = document.createElement('div');
  itemDiver.setAttribute('class', 'item_divider');

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDiver);
  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onAdd();
  }
});
