import * as photo from './photo.js';
import * as form from './form.js';
import * as backend from './backend.js';

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Форма загрузки изображения
const uploadForm = document.querySelector(`.img-upload__form`);

// Кнопка загрузки изображения
const uploadButton = uploadForm.querySelector(`#upload-file`);

const errorPopup = document.querySelector(`.error-popup`);
const errorPopupClose = errorPopup.querySelector(`.error-popup__cancel`);
const errorPopupMessage = errorPopup.querySelector(`.error-popup__message`);

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов photoData,
 * на странице
 *
 * @param {Array.<Object>} photoDataArray
 */
const renderPhotos = (photoDataArray) => {
  const fragment = document.createDocumentFragment();
  photoDataArray.forEach((value) => fragment.appendChild(photo.create(value)));

  container.appendChild(fragment);
};

/**
 * Закрывает поп-ап с сообщением об ошибке
 *
 */
const onErrorPopupCloseClick = () => {
  errorPopup.classList.add(`hidden`);
  errorPopupClose.removeEventListener(`click`, onErrorPopupCloseClick);
};

/**
 * Показывает поп-ап с сообщением об ошибке
 *
 * @param {string} message
 */
const showErrorPopup = (message) => {
  if (errorPopup.classList.contains(`hidden`)) {
    errorPopup.classList.remove(`hidden`);
    errorPopupMessage.textContent = message;
    setTimeout(onErrorPopupCloseClick, 5000);
    errorPopupClose.addEventListener(`click`, onErrorPopupCloseClick);
  }
};

/**
 * Инициализирует работу со страницей сайта
 *
 */
const initialize = () => {
  // Загружает с сервера фотографии и отображает их.
  // В случае ошибки загрузки данных показывает поп-ап с описанием ошибки
  backend.load(renderPhotos, showErrorPopup);

  // Открывает панель редактирования фотографии при
  // нажатии на кнопку uploadButton
  uploadButton.addEventListener(`change`, form.initialize);
};

initialize();
