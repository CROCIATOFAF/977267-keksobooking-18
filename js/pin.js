'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  // Пины
  var mapPins = document.querySelector('.map__pins');

  // Функция для создания массива из 8 JS объектов.
  var generateAdverts = function (advertsQuantity) {
    var result = [];
    for (var i = 0; i < advertsQuantity; i++) {
      result[i] = window.generateAdvert();
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

  var adverts = generateAdverts(8);
  pinShow(adverts);
})();
