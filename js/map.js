'use strict';
(function () {
  // Кнопки
  window.ENTER_KEYCODE = 13;

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = Array.from(document.querySelectorAll('.map__checkbox'));

  var filtersForm = document.querySelector('.map__filters');
  var mapFilters = Array.from(filtersForm.children);

  // Добавление карты в переменную.
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');

  // Ширина карты
  var mapWidth = document.querySelector('.map__pins').offsetWidth;

  var pinInteractionListener = null;

  // Открывает меню, карту.
  var setEnabled = function (enabled) {
    if (enabled) {
      map.classList.remove('map--faded');
    } else {
      map.classList.add('map--faded');
      setFiltersEnabled(enabled);
    }
    setPinDragEnabled(enabled);
  };

  // Рендерит пины.
  var renderPins = function (adverts) {
    clearMap();

    var fragment = document.createDocumentFragment();
    adverts.forEach(function (advert) {
      var pin = window.pin.render(advert);

      subscribeForPinEvents(pin);

      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };

  var subscribeForPinEvents = function (pin) {
    pin.addEventListener('click', function () {
      onPinInteraction(pin);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        onPinInteraction(pin);
      }
    });
  };

  var onPinInteraction = function (pin) {
    if (pinInteractionListener) {
      var advertTitle = pin.querySelector('img').alt;
      pinInteractionListener(advertTitle);
    }
  };

  var clearMap = function () {
    var allPins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < allPins.length; i++) {
      if (!allPins[i].classList.contains('map__pin--main')) {
        allPins[i].remove();
      }
    }
  };

  var mainPinMoveListener = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveListener = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      var mainPinWidth = mainPin.offsetWidth;

      if (mainPin.offsetTop < 130) {
        mainPin.style.top = 130 + 'px';
      } else if (mainPin.offsetTop > 630) {
        mainPin.style.top = 630 + 'px';
      }

      if (mainPin.offsetLeft < -mainPinWidth / 2) {
        mainPin.style.left = -mainPinWidth / 2 + 'px';
      } else if (mainPin.offsetLeft > mapWidth - mainPinWidth / 2) {
        mainPin.style.left = mapWidth - mainPinWidth / 2 + 'px';
      }

      window.form.setAddressValue(getMainPinAddress());
    };

    var mouseUpListener = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);

      if (dragged) {
        var clickPreventDefaultListener = function () {
          evt.preventDefault();
          mainPin.removeEventListener('click', clickPreventDefaultListener);
        };
        mainPin.addEventListener('click', clickPreventDefaultListener);
      }
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  };

  // Функция для переноса пина
  var setPinDragEnabled = function (enabled) {
    if (enabled) {
      mainPin.addEventListener('mousedown', mainPinMoveListener);
    } else {
      mainPin.removeEventListener('mousedown', mainPinMoveListener);
    }
  };

  var setFiltersChangeListener = function (listener) {
    typeFilter.addEventListener('change', window.debounce(listener));
    priceFilter.addEventListener('change', window.debounce(listener));
    roomsFilter.addEventListener('change', window.debounce(listener));
    guestsFilter.addEventListener('change', window.debounce(listener));

    featuresFilter.forEach(function (filter) {
      filter.addEventListener('change', window.debounce(listener));
    });
  };

  var isSuitableType = function (advert) {
    var selectedType = typeFilter.value;
    return selectedType === 'any'
      || selectedType === advert.offer.type;
  };

  var isSuitablePrice = function (advert) {
    var selectedPrice = priceFilter.value;
    if (selectedPrice === 'low') {
      return advert.offer.price < 10000;
    } else if (selectedPrice === 'middle') {
      return advert.offer.price > 10000 && advert.offer.price < 50000;
    } else if (selectedPrice === 'high') {
      return advert.offer.price > 50000;
    } else if (selectedPrice === 'any') {
      return true;
    }
    return true;
  };

  var isSuitableRooms = function (advert) {
    var selectedRooms = parseInt(roomsFilter.value, 10);
    return roomsFilter.value === 'any'
      || selectedRooms === parseInt(advert.offer.rooms, 10);
  };

  var isSuitableGuests = function (advert) {
    var selectedGuests = parseInt(guestsFilter.value, 10);
    return guestsFilter.value === 'any'
      || selectedGuests === advert.offer.guests;
  };

  var getSelectedFeatures = function () {
    var features = [];
    featuresFilter.forEach(function (feature) {
      if (feature.checked) {
        features.push(feature.value);
      }
    });
    return features;
  };

  var isSuitableFeatures = function (advert) {
    return getSelectedFeatures().every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  var filterAdverts = function (adverts) {
    var filteredAverts = [];
    for (var i = 0; i < adverts.length; i++) {
      if (isSuitableType(adverts[i])
        && isSuitablePrice(adverts[i])
        && isSuitableRooms(adverts[i])
        && isSuitableGuests(adverts[i])
        && isSuitableFeatures(adverts[i])) {
        filteredAverts.push(adverts[i]);
      }
    }
    return filteredAverts;
  };

  var getMainPinAddress = function () {
    return parseInt(mainPin.style.left, 10) +
      ', ' +
      parseInt(mainPin.style.top, 10);
  };

  var keyDownListener = function (evt) {
    if (evt.key === 'Escape') {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
    }
    document.removeEventListener('keydown', keyDownListener);
  };

  var showCard = function (card) {
    removeCard();

    map.insertBefore(card, mapFiltersContainer);
    document.addEventListener('keydown', keyDownListener);
  };

  var setPinInteractionListener = function (listener) {
    pinInteractionListener = listener;
  };

  var reset = function () {
    clearMap();
    setEnabled(false);
    filtersForm.reset();

    mainPin.style.top = '375px';
    mainPin.style.left = '570px';
    window.form.setAddressValue(getMainPinAddress());

    removeCard();
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var setFiltersEnabled = function (enabled) {
    if (enabled) {
      mapFilters.forEach(function (node) {
        node.removeAttribute('disabled', 'disabled');
      });
    } else {
      mapFilters.forEach(function (node) {
        node.setAttribute('disabled', 'disabled');
      });
    }
  };

  window.map = {
    mainPin: mainPin,

    getMainPinAddress: getMainPinAddress,
    setEnabled: setEnabled,
    renderPins: renderPins,
    filterAdverts: filterAdverts,
    showCard: showCard,
    reset: reset,
    setFiltersEnabled: setFiltersEnabled,

    setFiltersChangeListener: setFiltersChangeListener,
    setPinInteractionListener: setPinInteractionListener
  };
})();
