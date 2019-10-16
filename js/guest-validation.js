'use strict';
(function () {
  // Вместимость
  var guestCapacity = document.querySelector('#capacity');
  // Количество комнат
  var numberOfRooms = document.querySelector('#room_number');

  var validateGuestCapacity = function () {
    var rooms = parseInt(numberOfRooms.value, 10);
    var guests = parseInt(guestCapacity.value, 10);

    var errorMsg = '';
    if (guests > rooms || (rooms === 100 && guests !== 0)) {
      errorMsg = 'Количество гостей не соответствует количеству комнат';
    }

    guestCapacity.setCustomValidity(errorMsg);
  };

  numberOfRooms.addEventListener('change', validateGuestCapacity);
  guestCapacity.addEventListener('change', validateGuestCapacity);
})();
