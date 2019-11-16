'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var photoTemplate = document.querySelector('#card')
    .content.
    querySelector('.popup__photo');

  var renderFeature = function (feature) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + feature);
    return featureItem;
  };

  var renderPhoto = function (photo) {
    var img = photoTemplate.cloneNode(true);
    img.src = photo;
    return img;
  };

  var render = function (advert) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = advert.offer.type;
    card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__avatar').src = advert.author.avatar;

    var cardFeatures = card.querySelector('.popup__features');
    advert.offer.features.forEach(function (feature) {
      cardFeatures.appendChild(renderFeature(feature));
    });

    var cardPhotos = card.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    advert.offer.photos.forEach(function (photo) {
      cardPhotos.appendChild(renderPhoto(photo));
    });

    card.querySelector('.popup__close')
      .addEventListener('click', function () {
        card.remove();
      });

    return card;
  };

  window.card = {
    render: render
  };
})();
