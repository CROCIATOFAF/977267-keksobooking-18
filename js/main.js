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

var adverts = window.generateAdverts(8);
window.renderAdvertPins(adverts);
