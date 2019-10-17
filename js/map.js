'use strict';
(function () {
  // Кнопки
  window.ENTER_KEYCODE = 13;
  // Добавление карты в переменную.
  var map = document.querySelector('.map');
  // Обработка собыйтий
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.mapPin = document.querySelector('.map__pin');
  // Открывает меню, карту.
  window.openMap = function () {
    map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    window.toggleElementsEnabled(window.formFields, true);
  };

  window.toggleElementsEnabled = function (elements, enabled) {
    for (var i = 0; i < elements.length; i++) {
      if (enabled) {
        elements[i].removeAttribute('disabled');
      } else {
        elements[i].setAttribute('disabled', 'true');
      }
    }
  };
})();
