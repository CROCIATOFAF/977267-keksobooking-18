'use strict';
(function () {
  window.form = document.querySelector('.ad-form');
  // Форма
  window.formFields = document.querySelectorAll('fieldset');
  // Адрес
  window.fillAddress = document.querySelector('#address');

  window.fillAddress.value = window.putAddress(window.mapMainPin);
  // Вместимость
  window.guestCapacity = document.querySelector('#capacity');
  // Количество комнат
  window.numberOfRooms = document.querySelector('#room_number');
})();
