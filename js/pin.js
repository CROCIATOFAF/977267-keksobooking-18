'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var render = function (advert) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';

    var pinPicture = pin.querySelector('img');
    pinPicture.src = advert.author.avatar;
    pinPicture.alt = advert.offer.title;

    return pin;
  };

  window.pin = {
    render: render
  };
})();
