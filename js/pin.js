'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var pinPicture = pin.querySelector('img');

    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';
    pinPicture.src = advert.author.avatar;
    pinPicture.alt = advert.offer.title;

    return pin;
  };
})();
