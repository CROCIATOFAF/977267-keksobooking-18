'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  // Пины
  var mapPins = document.querySelector('.map__pins');

  window.renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var pinPicture = pin.querySelector('img');

    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';
    pinPicture.src = advert.author.avatar;
    pinPicture.alt = advert.offer.title;

    return pin;
  };

  window.pinShow = function (advertsToRender) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsToRender.length; i++) {
      fragment.appendChild(window.renderPin(advertsToRender[i]));
    }
    mapPins.appendChild(fragment);
  };
})();
