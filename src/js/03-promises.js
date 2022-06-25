import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name = delay]'),
  stepInput: document.querySelector('input[name = step]'),
  amountInput: document.querySelector('input[name = amount]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(refs.delayInput.value);
  let step = Number(refs.stepInput.value);
  let amount = Number(refs.amountInput.value);

  for (let i = 1; i <= amount; i += 1) {
    setPromisesTimeout(i, delay);
    delay += step;
  };
};

function setPromisesTimeout(position, delay) {
   
  const promises = createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay} ms`);
    }); 
  
  setTimeout(() => {
    promises, delay
  });
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
        reject({ position, delay });
    }, delay);
  });
};
