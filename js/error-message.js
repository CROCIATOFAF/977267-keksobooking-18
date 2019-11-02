'use strict';

(function () {
  var showErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  window.showErrorMessage = function (msg) {
    var errorMessage = showErrorTemplate.cloneNode(true);
    var message = errorMessage.querySelector('.error__message');
    message.textContent = msg;

    var mainElement = document.querySelector('main');

    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorMessage.remove();
    });
    mainElement.appendChild(errorMessage);
  };
})();
