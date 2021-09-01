'use strict';
const vertical = document.querySelector('.vertical');
const horizental = document.querySelector('.horizental');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const targetRect = target.getBoundingClientRect();
const targetHalfwidth = targetRect.width / 2;
const targetHalfheight = targetRect.height / 2;

window.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;

  vertical.style.transform = `translateX(${x}px)`;
  horizental.style.transform = `translateY(${y}px)`;
  tag.style.transform = `translate(${x}px, ${y}px)`;
  target.style.transform = `translate(${x - targetHalfwidth}px,${
    y - targetHalfheight
  }px)`; // target의 중심을 당겨오기

  tag.innerHTML = `${x}px,${y}px`;
});
