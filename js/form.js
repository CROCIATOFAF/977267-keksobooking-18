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

  window.validateGuestCapacity = function () {
    var rooms = parseInt(window.numberOfRooms.value, 10);
    var guests = parseInt(window.guestCapacity.value, 10);

    var errorMsg = '';
    if (guests > rooms || (rooms === 100 && guests !== 0)) {
      errorMsg = 'Количество гостей не соответствует количеству комнат';
    }
    window.guestCapacity.setCustomValidity(errorMsg);
  };
})();
