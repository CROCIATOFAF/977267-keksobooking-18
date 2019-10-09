'use strict';
// переменные
var TITLES = ['Уютное гнездышко для молодоженов', 'Милая квартирка', 'Шикарная квартира', 'Сдам квартиру с хорошим ремонтом', 'Светлая, просторная квартирка'];
var PRICES = [1000, 1500, 2000, 2500, 3000, 4000, 4500, 5000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['В квартире уютно', 'В квартире тихо, соседи не шумят', 'Квартира находится в пяти минутах от метро', 'В квартире новая мебель'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_TOP = 130;
var MAP_BOTTOM = 630;
// Форма
var formFields = document.querySelectorAll('fieldset');
// Кнопки
var ENTER_KEYCODE = 13;
// Пины
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
// Ширина карты
var mapWidth = mapPins.offsetWidth;
// Добавление карты в переменную.
var map = document.querySelector('.map');
// Обработка собыйтий
var mapMainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
// Координаты пина
// var mapPinCoordinateX = parseInt(mapMainPin.style.left, 0);
// var mapPinCoordinateY = parseInt(mapMainPin.style.top, 0);
// Адрес
var fillAddress = document.querySelector('#address');
// Вместимость
var guestCapacity = document.querySelector('#capacity');
// Количество комнат
var numberOfRooms = document.querySelector('#room_number');

var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
// Функция для выбора случайных элементов.
var getRandomElement = function (advertItem) {
  var randomIndex = Math.floor((advertItem.length - 1) * Math.random());
  return advertItem[randomIndex];
};

// Функция для выбора случайных элементов 2.
var shuffle = function (arr) {
  var cmp = function () {
    return 0.5 - Math.random();
  };
  return arr.sort(cmp);
};

// Функция для создания случайных номеров.
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

var generateAdvert = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: '600, 350',
      price: getRandomElement(PRICES),
      type: getRandomElement(TYPES),
      rooms: getRandomElement(ROOMS),
      guests: getRandomNumber(0, 4),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: shuffle(FEATURES).slice(getRandomNumber(0, FEATURES.length)),
      description: getRandomElement(DESCRIPTION),
      photos: shuffle(PHOTOS).slice(getRandomNumber(0, PHOTOS.length))
    },
    location: {
      x: getRandomNumber(0, mapWidth),
      y: getRandomNumber(MAP_TOP, MAP_BOTTOM)
    }
  };
};

// Функция для создания массива из 8 JS объектов.
var generateAdverts = function (advertsQuantity) {
  var result = [];
  for (var i = 0; i < advertsQuantity; i++) {
    result[i] = generateAdvert();
  }
  return result;
};

var renderPin = function (advert) {
  var pin = pinTemplate.cloneNode(true);
  var pinPicture = pin.querySelector('img');

  pin.style.left = advert.location.x + 'px';
  pin.style.top = advert.location.y + 'px';
  pinPicture.src = advert.author.avatar;
  pinPicture.alt = advert.offer.title;

  return pin;
};

var pinShow = function (advertsToRender) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertsToRender.length; i++) {
    fragment.appendChild(renderPin(advertsToRender[i]));
  }
  mapPins.appendChild(fragment);
};

// Нажатие на пин
mapMainPin.addEventListener('mousedown', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  toggleElementsEnabled(formFields, true);
  var adverts = generateAdverts(8);
  pinShow(adverts);
});

// Нажатие на enter
mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    toggleElementsEnabled(formFields, true);
    var adverts = generateAdverts(8);
    pinShow(adverts);
  }
});

var toggleElementsEnabled = function (elements, enabled) {
  for (var i = 0; i < elements.length; i++) {
    if (enabled) {
      elements[i].removeAttribute('disabled');
    } else {
      elements[i].setAttribute('disabled', 'true');
    }
  }
};
// Активация
toggleElementsEnabled(formFields, true);
// Деактивация
toggleElementsEnabled(formFields, false);
// Адрес главного пина.
var putAddress = function () {
  return parseInt(mapPin.style.left, 10) + ', ' + parseInt(mapPin.style.top, 10);
};
fillAddress.value = putAddress(mapMainPin);

var validateGuestCapacity = function () {
  if (numberOfRooms.value === Number('1') && (guestCapacity.value === Number('0') || guestCapacity.value === Number('2') || guestCapacity.value === Number('3'))) {
    guestCapacity.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
  } else if (numberOfRooms.value === Number('2') && (guestCapacity.value === Number('0') || guestCapacity.value === Number('3'))) {
    guestCapacity.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
  } else if (numberOfRooms.value === Number('3') && guestCapacity.value === Number('0')) {
    guestCapacity.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
  } else if (numberOfRooms.value === Number('100') && !(guestCapacity.value === Number('0'))) {
    guestCapacity.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
  } else {
    guestCapacity.setCustomValidity('');
  }
};

numberOfRooms.addEventListener('change', function () {
  validateGuestCapacity();
});
