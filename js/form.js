'use strict';
(function () {
  window.form = document.querySelector('.ad-form');
  // Форма
  var formFields = document.querySelectorAll('fieldset');
  // Адрес
  var fillAddress = document.querySelector('#address');

  // Вместимость
  window.guestCapacity = document.querySelector('#capacity');
  // Количество комнат
  window.numberOfRooms = document.querySelector('#room_number');

  window.getAddress = function (mainPin) {
    return parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
  };

  // Модуль формы сам знает, что нужно активировать/деактивировать
  // поэтому убираем аргумент и делаем переменную formFields локальной
  window.toggleFieldsEnabled = function (enabled) {
    for (var i = 0; i < formFields.length; i++) {
      if (enabled) {
        formFields[i].removeAttribute('disabled');
      } else {
        formFields[i].setAttribute('disabled', 'true');
      }
    }
  };

  window.validateRoomsAndGuests = function (guests, rooms) {
    var errorMsg = '';
    if (guests > rooms || (rooms === 100 && guests !== 0)) {
      errorMsg = 'Количество гостей не соответствует количеству комнат';
    }
    return errorMsg;
  };

  window.enableForm = function () {
    window.form.classList.remove('ad-form--disabled');
  };

  window.fillAddressField = function (address) {
    fillAddress.value = address;
  };
})();
