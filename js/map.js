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

  // Функция для переноса пина.
  window.mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapMainPin.style.top = (window.mapMainPin.offsetTop - shift.y) + 'px';
      window.mapMainPin.style.left = (window.mapMainPin.offsetLeft - shift.x) + 'px';
      window.fillAddressField(window.getAddress(window.mapMainPin));

      // Функция для ограничения перемещения пина в пределах карты.
      var pinTop = parseInt(window.mapMainPin.style.top, 10);
      var pinLeft = parseInt(window.mapMainPin.style.left, 10);
      // ось OY.
      if (pinTop < 0) {
        window.mapMainPin.style.top = 0;
      } else if (pinTop > parseInt(window.mapHeight, 10) - 80) {
        window.mapMainPin.style.top = (parseInt(window.mapHeight, 10) - 80) + 'px';
      }
      // ось OX.
      if (pinLeft < 0) {
        window.mapMainPin.style.left = 0;
      } else if (pinLeft > parseInt(window.mapWidth, 10) - 63) {
        window.mapMainPin.style.left = (parseInt(window.mapWidth, 10) - 63) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          window.mapMainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.mapMainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
