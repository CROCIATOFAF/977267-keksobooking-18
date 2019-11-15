'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var mapFiltersContainer = document.querySelector('#card')
    .content
    .querySelector('.map__filters-container');

  var popupPhotosImgElement = document.querySelector('#card')
  .content.
  querySelector('.popup__photo');

  window.renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    card.offer.features.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + item;
      cardElement.querySelector('.popup__features').appendChild(featureElement);

      card.offer.photos.forEach(function (photos) {
        var photo = popupPhotosImgElement.cloneNode(true);
        photo.src = photos;
        console.log(photos);
        cardElement.querySelector('.popup__photos').appendChild(photo);
      });

      return cardElement;
    });
  };

  window.map.insertBefore(cardTemplate, mapFiltersContainer);
})();
