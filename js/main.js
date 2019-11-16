'use strict';

(function () {
  var adverts = [];

  var pinClickListener = function (pinAdvert) {
    var advert = adverts.find(function (item) {
      return item.offer.title === pinAdvert;
    });
    window.map.showCard(window.card.render(advert));
  };

  var mapFiltersChangeListener = function () {
    var filteredAverts = window.map.filterAdverts(adverts);
    window.map.renderPins(filteredAverts.slice(0, 5));
  };

  var dataLoadListener = function (data) {
    adverts = data;

    window.map.renderPins(adverts.slice(0, 5));
    window.map.setFiltersEnabled(true);

    window.map.setPinInteractionListener(pinClickListener);
    window.map.setFiltersChangeListener(mapFiltersChangeListener);
  };

  var formSuccessSubmitListener = function () {
    window.message.showSuccess();
    window.form.reset();
    window.map.reset();

    window.map.mainPin.addEventListener('mousedown', mainPinClickListener);
    window.map.mainPin.addEventListener('keydown', mainPinKeyDownListener);
  };

  var formSubmitListener = function (data) {
    window.upload.send(data,
        formSuccessSubmitListener,
        window.message.showError);
  };

  var formResetListener = function () {
    window.form.reset();
    window.map.reset();

    window.map.mainPin.addEventListener('mousedown', mainPinClickListener);
    window.map.mainPin.addEventListener('keydown', mainPinKeyDownListener);
  };

  var mainPinClickListener = function () {
    window.map.setEnabled(true);

    window.form.setEnabled(true);
    window.form.setSubmitListener(formSubmitListener);
    window.form.setResetListener(formResetListener);

    window.backend.load(dataLoadListener, window.message.showError);

    window.map.mainPin.removeEventListener('mousedown', mainPinClickListener);
    window.map.mainPin.removeEventListener('keydown', mainPinKeyDownListener);
  };

  var mainPinKeyDownListener = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      mainPinClickListener();
    }
  };

  window.map.setEnabled(false);

  window.form.setEnabled(false);
  window.form.setAddressValue(window.map.getMainPinAddress());

  window.map.mainPin.addEventListener('mousedown', mainPinClickListener);
  window.map.mainPin.addEventListener('keydown', mainPinKeyDownListener);
})();
