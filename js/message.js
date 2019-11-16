'use strict';

(function () {
  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var documentKeyDownListener = function (evt) {
    if (evt.key === 'Escape') {
      removeMsg();
    }
    document.removeEventListener('keydown', documentKeyDownListener);
  };

  var documentClickListener = function () {
    removeMsg();
    document.removeEventListener('click', documentClickListener);
  };

  var removeMsg = function () {
    var errorMsg = document.querySelector('.error');
    var successMsg = document.querySelector('.success');

    if (errorMsg) {
      errorMsg.remove();
    }
    if (successMsg) {
      successMsg.remove();
    }
  };

  var showError = function (msg) {
    var errorMessage = errorTemplate.cloneNode(true);

    var message = errorMessage.querySelector('.error__message');
    message.textContent = msg;

    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorMessage.remove();
    });

    document.addEventListener('keydown', documentKeyDownListener);
    document.addEventListener('click', documentClickListener);

    main.appendChild(errorMessage);
  };

  var showSuccess = function () {
    var success = successTemplate.cloneNode(true);

    document.addEventListener('keydown', documentKeyDownListener);
    document.addEventListener('click', documentClickListener);

    main.appendChild(success);
  };

  window.message = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
