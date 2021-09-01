'use strict';
const target = document.querySelector('.target');
const coordination = document.querySelector('.coordination');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
window.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;

  // target.style.left = x + 'px'; // 마우스 따라서 좌표 바뀌게
  // target.style.top = y + 'px';
  target.style.transform = translte(x + 'px', y + 'px');
  coordination.style.left = x + 'px'; // 마우스 따라서 좌표 바뀌게
  coordination.style.top = y + 'px';
  vertical.style.left = x + 'px'; // 마우스 따라서 좌표 바뀌게
  horizontal.style.top = y + 'px';

  coordination.innerHTML = `${x}px ${y}px `; // 좌표 표시
});
