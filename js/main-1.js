'use strict';

window.pinShow(window.generateAdverts(8));

// Нажатие на пин
window.mapMainPin.addEventListener('mousedown', function () {
  window.openMap();
});
// Нажатие на enter
window.mapMainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.ENTER_KEYCODE) {
    window.openMap();
  }
});

window.validateGuestCapacity = function () {
  var rooms = parseInt(window.numberOfRooms.value, 10);
  var guests = parseInt(window.guestCapacity.value, 10);

  var errorMsg = '';
  if (guests > rooms || (rooms === 100 && guests !== 0)) {
    errorMsg = 'Количество гостей не соответствует количеству комнат';
  }
  window.guestCapacity.setCustomValidity(errorMsg);
};

window.putAddress = function () {
  return parseInt(window.mapPin.style.left, 10) + ', ' + parseInt(window.mapPin.style.top, 10);
};
window.fillAddress.value = window.putAddress(window.mapMainPin);

window.numberOfRooms.addEventListener('change', window.validateGuestCapacity);
window.guestCapacity.addEventListener('change', window.validateGuestCapacity);

window.pinShow();
window.renderPin();
window.toggleElementsEnabled();
