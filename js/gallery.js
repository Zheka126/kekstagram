import Photo from './photo.js';
import * as form from './form.js';
import * as backend from './backend.js';
import * as filter from './filter.js';

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Форма загрузки изображения
const uploadForm = document.querySelector(`.img-upload__form`);

// Кнопка загрузки изображения
const uploadButton = uploadForm.querySelector(`#upload-file`);

// Поп-ап для вывода возможной ошибки при загрузке и его элементы
const errorPopup = document.querySelector(`.error-popup`);
const errorPopupClose = errorPopup.querySelector(`.error-popup__cancel`);
const errorPopupMessage = errorPopup.querySelector(`.error-popup__message`);

const POPAP_ERROR_INTERVAL = 5000;
const COMMENT_LENGTH_MAX = 140;

let photos = [];
let photoElements = [];

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов Photo,
 * на странице
 *
 * @param {Array.<Photo>} photoArray
 */
const renderPhotos = (photoArray) => {
  const fragment = document.createDocumentFragment();
  photoElements = photoArray.map((photo) => photo.create());
  photoElements.forEach((photoNode) => fragment.appendChild(photoNode));

  container.appendChild(fragment);
};

/**
 * Удаляет DOM-элементы `Фотография` photoElements
 *
 */
const removePhotos = () => {
  photoElements.forEach((it) => container.removeChild(it));
};

export /**
 * Обновляет DOM-элементы `Фотография` после фильтрации
 *
 * @param {Array.<Photo>} photoArray
 */
const updatePhotos = (photoArray) => {
  removePhotos();
  renderPhotos(photoArray);
};

/**
 * Для корректного отображения разбивает слишком длинные комментарии,
 * предоставленные сервером, на комментарии длины не более COMMENT_LENGTH_MAX
 * и возвращает новый объект photoData
 *
 * @param {Object} photoData Объект до форматирования
 * @return {Object} Объект после форматирования
 */
const formatData = (photoData) => {
  const comments = photoData.comments.reduce((acc, comment) =>
    (comment.length > COMMENT_LENGTH_MAX ?
      [...acc, ...comment.split(`. `)] :
      [...acc, comment]),
  []);

  const {url, likes, description} = photoData;

  return ({url, likes, comments, description});
};

/**
 * Форматирует полученные данные и отображает их,
 * инициализирует работу фильтрации
 *
 * @param {Array.<Object>} data Загруженные с сервера данные
 */
const onSuccess = (data) => {
  photos = data
      .map((it) => formatData(it))
      .map((it) => new Photo(it));
  renderPhotos(photos);
  filter.initialize(photos);
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
const onError = (message) => {
  if (errorPopup.classList.contains(`hidden`)) {
    errorPopup.classList.remove(`hidden`);
    errorPopupMessage.textContent = message;
    setTimeout(onErrorPopupCloseClick, POPAP_ERROR_INTERVAL);
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
  backend.load(onSuccess, onError);

  // Инициирует работу с загруженной фотографией
  // при нажатии на кнопку uploadButton
  uploadButton.addEventListener(`change`, form.initialize);
};

initialize();
