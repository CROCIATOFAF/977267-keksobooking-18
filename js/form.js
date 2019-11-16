'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var fields = form.querySelectorAll('fieldset');

  var titleField = form.querySelector('#title');
  var priceField = form.querySelector('#price');
  var typeField = form.querySelector('#type');
  var addressField = form.querySelector('#address');

  var guestsField = form.querySelector('#capacity');
  var roomsField = form.querySelector('#room_number');

  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');

  var resetButton = form.querySelector('.ad-form__reset');

  var submitListener = null;
  var resetListener = null;

  var setFieldsEnabled = function (enabled) {
    fields.forEach(function (field) {
      if (enabled) {
        field.removeAttribute('disabled');
      } else {
        field.setAttribute('disabled', 'true');
      }
    });
  };

  var setEnabled = function (enabled) {
    if (enabled) {
      form.classList.remove('ad-form--disabled');
      setup();
    } else {
      form.classList.add('ad-form--disabled');
    }
    setFieldsEnabled(enabled);
  };

  var setAddressValue = function (address) {
    addressField.value = address;
  };

  var setFieldValid = function (element, valid) {
    if (valid) {
      element.style.border = '1px solid #d9d9d3';
    } else {
      element.style.border = '1px solid #ff0000';
    }
  };

  var setup = function () {
    setFieldValid(titleField, false);

    priceField.setAttribute('placeholder', 1000);
    priceField.setAttribute('min', 1000);

    addressField.readOnly = true;

    validateCapacity();

    titleField.addEventListener('change', function () {
      var titleLength = titleField.value.length;
      var valid = titleLength >= 30 && titleLength <= 100;
      setFieldValid(titleField, valid);
    });

    typeField.addEventListener('change', function () {
      var selectedType = typeField.value;
      switch (selectedType) {
        case 'bungalo': {
          priceField.setAttribute('placeholder', 0);
          priceField.setAttribute('min', 0);
          break;
        }
        case 'flat': {
          priceField.setAttribute('placeholder', 1000);
          priceField.setAttribute('min', 1000);
          break;
        }
        case 'house': {
          priceField.setAttribute('placeholder', 5000);
          priceField.setAttribute('min', 5000);
          break;
        }
        case 'palace': {
          priceField.setAttribute('placeholder', 10000);
          priceField.setAttribute('min', 10000);
          break;
        }
      }
    });

    timeInField.addEventListener('change', function () {
      timeOutField.value = timeInField.value;
    });
    timeOutField.addEventListener('change', function () {
      timeInField.value = timeOutField.value;
    });

    guestsField.addEventListener('change', function () {
      validateCapacity();
    });
    roomsField.addEventListener('change', function () {
      validateCapacity();
    });
  };

  var validateCapacity = function () {
    var guests = parseInt(guestsField.value, 10);
    var rooms = parseInt(roomsField.value, 10);

    var validationResult = '';
    if (guests > rooms || (rooms === 100 && guests !== 0)) {
      validationResult = 'Количество гостей не соответствует количеству комнат';
    }

    guestsField.setCustomValidity(validationResult);
    roomsField.setCustomValidity(validationResult);

    setFieldValid(guestsField, validationResult.length === 0);
    setFieldValid(roomsField, validationResult.length === 0);
  };

  var formSubmitListener = function (evt) {
    evt.preventDefault();
    if (submitListener) {
      submitListener(new FormData(form));
    }
  };

  var setSubmitListener = function (listener) {
    submitListener = listener;

    if (listener) {
      form.addEventListener('submit', formSubmitListener);
    } else {
      form.removeEventListener('submit', formSubmitListener);
    }
  };

  var formResetListener = function (evt) {
    evt.preventDefault();
    if (resetListener) {
      resetListener();
    }
  };

  var setResetListener = function (listener) {
    resetListener = listener;
    if (listener) {
      resetButton.addEventListener('click', formResetListener);
    } else {
      resetButton.removeEventListener('click', formResetListener);
    }
  };

  var reset = function () {
    form.reset();
    setEnabled(false);
  };

  window.form = {
    guestsField: guestsField,
    roomsField: roomsField,

    setEnabled: setEnabled,
    setAddressValue: setAddressValue,
    reset: reset,

    validateCapacity: validateCapacity,
    setSubmitListener: setSubmitListener,
    setResetListener: setResetListener
  };
})();
