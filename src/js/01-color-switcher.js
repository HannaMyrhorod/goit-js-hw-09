const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor(); 
     }, 1000)
};

function onStopBtnClick() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(timerId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}