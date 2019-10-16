'use strict';
(function () {
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
  // Ширина карты
  var mapWidth = window.mapPins.offsetWidth;

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
  // Создаёт данные карточек.
  window.generateAdvert = function () {
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
})();
