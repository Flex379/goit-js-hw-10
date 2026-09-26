import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  dataStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      refs.dataStart.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.dataStart.disabled = false;
    }
  },
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
}

refs.dataStart.disabled = true;

flatpickr(refs.dateTimePicker, options);

refs.dataStart.addEventListener('click', () => {
  refs.dataStart.disabled = true;
  refs.dateTimePicker.disabled = true;

  const intervalId = setInterval(() => {
    const diffTime = userSelectedDate - Date.now();
    if (diffTime <= 0) {
      clearInterval(intervalId);
      refs.dataDays.textContent = '00';
      refs.dataHours.textContent = '00';
      refs.dataMinutes.textContent = '00';
      refs.dataSeconds.textContent = '00';
      refs.dateTimePicker.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diffTime);

    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
