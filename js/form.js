import * as util from './util.js';
import * as resize from './resize.js';
import * as effects from './effects.js';
import * as backend from './backend.js';
import * as validation from './form-validation';
import uploadFile from './upload-file.js';

const bodyElement = document.querySelector(`body`);
const uploadButton = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__form`);
const hashTagsField = uploadForm.querySelector(`.text__hashtags`);
const commentField = uploadForm.querySelector(`.text__description`);

const editPanel = document.querySelector(`.img-upload__overlay`);
const editPanelClose = editPanel.querySelector(`#upload-cancel`);

const uploadErrorBLock = uploadForm.querySelector(`.img-upload__message--error`);
const uploadErrorMessage = uploadErrorBLock.querySelector(`.error__message`);

const uploadedPicture = editPanel.querySelector(`.img-upload__preview > img`);
const effectsPreviews = editPanel.querySelectorAll(`.effects__preview`);
const uploadMessage = uploadForm.querySelector(`.img-upload__message--loading`);

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

/**
 * При успешной отправке формы очищает ее поля
 * и закрывает панель редактирования
 *
 */
const onSuccessUpload = () => {
  uploadForm.reset();
  onEditPanelCloseClick();
};

/**
 * При неуспешной отправке формы закрывает панель редактирования
 * и показывает блок с ошибкой message
 *
 * @param {string} message
 */
const onErrorUpload = (message) => {
  onEditPanelCloseClick();
  uploadErrorBLock.classList.remove(`hidden`);
  uploadErrorMessage.textContent = message;
};

/**
 * Отменяет действия по умолчанию при отправке формы
 * и запускает функцию отправки данных на сервер
 *
 * @param {Event} evt
 */
const onUploadFormSubmit = (evt) => {
  backend.upload(new FormData(uploadForm), onSuccessUpload, onErrorUpload);
  evt.preventDefault();
};

/**
 * Закрывает панель редактирования фотографии,
 * восстанавливает стандартные значения всем элементам формы,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
const onEditPanelCloseClick = () => {
  uploadForm.reset();
  uploadButton.value = ``;
  resize.finalize();
  effects.finalize();
  bodyElement.classList.remove(`modal-open`);
  editPanel.classList.add(`hidden`);
  editPanelClose.removeEventListener(`click`, onEditPanelCloseClick);
  document.removeEventListener(`keydown`, onEditPanelEscPress);
};

/**
 * Закрывает панель редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onEditPanelEscPress = (evt) => {
  if (evt.target !== hashTagsField && evt.target !== commentField) {
    util.runOnEscPress(evt, onEditPanelCloseClick);
  }
};

/**
 * Показывает панель редактирования фотографии,
 * добавляет обработчики событий,
 * инициирует валидацию, масштабиование
 * и применение эффектов
 *
 */
const openUploadForm = () => {
  validation.initialize();
  resize.initialize();
  effects.initialize();
  bodyElement.classList.add(`modal-open`);
  editPanel.classList.remove(`hidden`);
  editPanelClose.addEventListener(`click`, onEditPanelCloseClick);
  document.addEventListener(`keydown`, onEditPanelEscPress);
  uploadForm.addEventListener(`submit`, onUploadFormSubmit);
};

export /**
 * Инициирует работу с загруженной фотографией
 *
 * @param {Event} evt
 */
const initialize = (evt) => {
  uploadMessage.classList.remove(`hidden`);
  const file = evt.target.files[0];

  // Результат чтения загруженной фотографии помещает в атрибут
  // src элемента uploadedPicture и в качестве фонового изображения
  // для превью эффектов
  uploadFile(file, FILE_TYPES, (readingResult) => {
    uploadedPicture.src = readingResult;
    Array.from(effectsPreviews).forEach((effect) => {
      effect.style.backgroundImage = `url(${readingResult})`;
    });

    openUploadForm();
    uploadMessage.classList.add(`hidden`);
  });
};
