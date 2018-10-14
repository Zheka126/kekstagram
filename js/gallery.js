import * as data from './data.js';
import * as photo from './photo.js';
import * as editPanel from './edit-panel';

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Форма загрузки изображения
const uploadForm = document.querySelector(`.img-upload__form`);

// Кнопка загрузки изображения
const uploadButton = uploadForm.querySelector(`#upload-file`);

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов Photo,
 * на странице
 *
 * @param {Array.<Photo>} photoDataArray
 */
const renderPhotos = (photoDataArray) => {
  const fragment = document.createDocumentFragment();
  photoDataArray.forEach((value) => fragment.appendChild(photo.create(value)));

  container.appendChild(fragment);
};

/**
 * Инициализирует работу со страницей сайта
 *
 */
const initialize = () => {
  // Создает данные для фотографий
  const photos = data.initialize();

  // Отображает фотографии
  renderPhotos(photos);

  // Загрузка изображения и панели редактирования
  uploadButton.addEventListener(`change`, editPanel.open);
};

initialize();
