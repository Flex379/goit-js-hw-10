import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  fullForm: document.querySelector('.form'),
};

refs.fullForm.addEventListener('submit', onfullFormSubmit);

function onfullFormSubmit(event) {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const state = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
