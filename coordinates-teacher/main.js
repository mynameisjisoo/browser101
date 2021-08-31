'use strict';
const vertical = document.querySelector('.vertical');
const horizental = document.querySelector('.horizental');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

window.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;
  vertical.style.left = `${x}px`;
  horizental.style.top = `${y}px`;
  target.style.top = `${y}px`;
  target.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.innerHTML = `${x}px, ${y}px`;
});
