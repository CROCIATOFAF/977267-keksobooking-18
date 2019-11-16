'use strict';
(function () {
  // Кнопки
  window.ENTER_KEYCODE = 13;

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  // Добавление карты в переменную.
  window.map = document.querySelector('.map');
  window.mapPins = document.querySelector('.map__pins');

  // Обработка собыйтий
  window.mapMainPin = document.querySelector('.map__pin--main');
  window.mapPin = document.querySelector('.map__pin');

  // Открывает меню, карту.
  window.openMap = function () {
    window.map.classList.remove('map--faded');
  };

  // Рендерит пины.
  window.renderAdvertPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    // Создаёт новый массив из 5 объвлений.
    var showFiveAdverts = adverts.slice(0, 5);
    for (var i = 0; i < showFiveAdverts.length; i++) {
      // Вызываем функцию из другого модуля. Значит этот модуль становится зависим от другого
      // Значит подключаться он должен после него
      fragment.appendChild(window.renderPin(showFiveAdverts[i]));
    }
    window.mapPins.appendChild(fragment);
  };

  window.clearMap = function () {
    var allPins = window.mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < allPins.length; i++) {
      if (!allPins[i].classList.contains('map__pin--main')) {
        allPins[i].remove();
      }
    }
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

  window.setFiltersChangeListener = function (listener) {
    housingType.addEventListener('change', window.debounce(listener));
    housingPrice.addEventListener('change', window.debounce(listener));
    housingRooms.addEventListener('change', window.debounce(listener));
    housingGuests.addEventListener('change', window.debounce(listener));
    for (var i = 0; i < housingFeatures.length; i++) {
      housingFeatures[i].addEventListener('change', window.debounce(listener));
    }
  };

  var isSuitableType = function (advert) {
    var selectedType = housingType.value;
    return selectedType === 'any' || selectedType === advert.offer.type;
  };

  var isSuitablePrice = function (advert) {
    var selectedPrice = housingPrice.value;
    if (selectedPrice === 'low') {
      return advert.offer.price < 10000;
    } else if (selectedPrice === 'middle') {
      return advert.offer.price > 10000 && advert.offer.price < 50000;
    } else if (selectedPrice === 'high') {
      return advert.offer.price > 50000;
    } else if (selectedPrice === 'any') {
      return true;
    }
    return false;
  };

  var isSuitableRooms = function (advert) {
    var selectedRooms = housingRooms.value;
    return selectedRooms === 'any' || selectedRooms === advert.offer.rooms;
  };

  var isSuitableGuests = function (advert) {
    var selectedGuests = housingGuests.value;
    return selectedGuests === 'any' || selectedGuests === advert.offer.guests;
  };

  var collectFeatures = function () {
    var features = [];
    for (var i = 0; i < housingFeatures.length; i++) {
      features.push(housingFeatures[i].value);
    }
    return features;
  };

  var isSuitableFeatures = function (advert) {
    var selectedFeatures = collectFeatures();
    for (var i = 0; i < selectedFeatures.length; i++) {
      if (!advert.offer.features.includes(selectedFeatures[i])) {
        return false;
      }
    }
    return true;
  };

  window.filterAdverts = function (adverts) {
    var filtered = [];
    for (var i = 0; i < adverts.length; i++) {
      if (isSuitableType(adverts[i])
      && isSuitablePrice(adverts[i])
      && isSuitableRooms(adverts[i])
      && isSuitableGuests(adverts[i])
      && isSuitableFeatures(adverts[i])) {
        filtered.push(adverts[i]);
      }
    }
    return filtered;
  };
})();
