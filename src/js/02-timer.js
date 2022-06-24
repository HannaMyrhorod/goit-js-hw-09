import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let targetDate = Date.now();
let countdown = 0;

const input = document.querySelector('#datetime-picker')
const btn = document.querySelector('.timer-btn');
const targetDays = document.querySelector('span[data-days]');
const targetHours = document.querySelector('span[data-hours]');
const targetMinutes = document.querySelector('span[data-minutes]');
const targetSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      targetDate = selectedDates[0].getTime();

      if (selectedDates[0] <= Date.now()) {
          Notify.failure('Please choose a date in the future', {
              timeout: 4000,
              clickToClose: true,
              distance: '3%',
              opacity: 0.9,
                borderRadius: '4px',
          });
      } else {
          btn.disabled = false;
      }
  },
};

flatpickr('#datetime-picker', options);

btn.disabled = true;
btn.addEventListener('click', onBtnClick);

function onBtnClick() {
    btn.disabled = true;
    input.disabled = true;
    countdown = setInterval(startTimer, 1000);
    Notify.success('Countdown begins', {
              timeout: 4000,
              clickToClose: true,
              distance: '3%',
              opacity: 0.9,
                borderRadius: '4px',
          });
};

function startTimer() {
        const currentTime = Date.now();
        const delta = targetDate - currentTime;

    if (delta < 0) {
        clearInterval(countdown);
        input.disabled = false;
        Notify.info('The countdown is over', {
            timeout: 4000,
            clickToClose: true,
            distance: '3%',
            opacity: 0.9,
            borderRadius: '4px',
        });
        return;
        };

        renderTimer(convertMs(delta));
    }

function renderTimer(date) {
    targetDays.innerText = addLeadingZero(date.days);
    targetHours.innerText = addLeadingZero(date.hours);
    targetMinutes.innerText = addLeadingZero(date.minutes);
    targetSeconds.innerText = addLeadingZero(date.seconds);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};