'use strict';
(function () {
  // Добавление карты в переменную.
  var map = document.querySelector('.map');

  var form = document.querySelector('.ad-form');
  // Форма
  var formFields = document.querySelectorAll('fieldset');
  // Адрес
  var fillAddress = document.querySelector('#address');
  // Обработка собыйтий
  var mapMainPin = document.querySelector('.map__pin--main');
  // Кнопки
  var ENTER_KEYCODE = 13;

  var mapPin = document.querySelector('.map__pin');

  var toggleElementsEnabled = function (elements, enabled) {
    for (var i = 0; i < elements.length; i++) {
      if (enabled) {
        elements[i].removeAttribute('disabled');
      } else {
        elements[i].setAttribute('disabled', 'true');
      }
    }
  };
  // Открывает меню, карту.
  var openMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    toggleElementsEnabled(formFields, true);
  };
  // Адрес главного пина.
  var putAddress = function () {
    return parseInt(mapPin.style.left, 10) + ', ' + parseInt(mapPin.style.top, 10);
  };
  fillAddress.value = putAddress(mapMainPin);
  // Нажатие на пин
  mapMainPin.addEventListener('mousedown', function () {
    openMap();
  });
  // Нажатие на enter
  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
    }
  });
})();
