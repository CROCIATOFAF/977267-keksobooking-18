'use strict';
(function () {
  // Кнопки
  window.ENTER_KEYCODE = 13;

  // Добавление карты в переменную.
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  // Обработка собыйтий
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.mapPin = document.querySelector('.map__pin');

  // Открывает меню, карту.
  window.openMap = function () {
    map.classList.remove('map--faded');
  };

  window.renderAdvertPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      // Вызываем функцию из другого модуля. Значит этот модуль становится зависим от другого
      // Значит подключаться он должен после него
      fragment.appendChild(window.renderPin(adverts[i]));
    }
    mapPins.appendChild(fragment);
  };
})();
