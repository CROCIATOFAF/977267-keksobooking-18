'use strict';

// Объявляем локальную функцию, которая будет использовать функцию валидации,
// объявленную в модуле form
var validateGuestsAndRoomsFields = function () {
  var guests = parseInt(window.guestCapacity.value, 10);
  var rooms = parseInt(window.numberOfRooms.value, 10);
  window.guestCapacity.setCustomValidity(window.validateRoomsAndGuests(guests, rooms));
};

var enableUi = function () {
  window.openMap();
  window.enableForm();
  window.toggleFieldsEnabled(true);
};

// Нажатие на пин
window.mapMainPin.addEventListener('mousedown', enableUi);

// Нажатие на enter
window.mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.ENTER_KEYCODE) {
    enableUi();
  }
});

window.numberOfRooms.addEventListener('change', validateGuestsAndRoomsFields);
window.guestCapacity.addEventListener('change', validateGuestsAndRoomsFields);

window.toggleFieldsEnabled(false);

window.fillAddressField(window.getAddress(window.mapMainPin));

var sortByHousingType = document.querySelector('#housing-type');
var adverts = [];
sortByHousingType.addEventListener('change', function () {
  var housingType = sortByHousingType.value;
  var filtered = [];
  for (var i = 0; i < adverts.length; i++) {
    if (adverts[i].offer.type === housingType) {
      filtered.push(adverts[i]);
    }
  }
  window.clearMap();
  window.renderAdvertPins(filtered.slice(0, 5));
});


// var adverts = window.generateAdverts(8);
// window.renderAdvertPins(adverts);
window.load(function (data) {
  adverts = data;
  window.renderAdvertPins(adverts);
}, function (errorMessage) {
  window.showErrorMessage(errorMessage);
});
