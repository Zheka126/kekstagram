import * as util from './util.js';
import * as resize from './resize.js';
import * as effects from './effects.js';
import * as backend from './backend.js';

const bodyElement = document.querySelector(`body`);
const uploadButton = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadErrorBLock = uploadForm.querySelector(`.img-upload__message--error`);
const uploadErrorMessage = uploadErrorBLock.querySelector(`.error__message`);
const editPanel = document.querySelector(`.img-upload__overlay`);
const editPanelClose = editPanel.querySelector(`#upload-cancel`);

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
 * удаляет обработчики событий с недоступных более элементов
 *
 */
const onEditPanelCloseClick = () => {
  uploadButton.value = ``;
  bodyElement.classList.remove(`modal-open`);
  editPanel.classList.add(`hidden`);
  editPanelClose.removeEventListener(`click`, onEditPanelCloseClick);
  document.removeEventListener(`keydown`, onEditPanelEscPress);
  resize.finalize();
  effects.finalize();
};

/**
 * Закрывает панель редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onEditPanelEscPress = (evt) => {
  util.runOnEscPress(evt, onEditPanelCloseClick);
};

export /**
 * Открывает панель редактирования фотографии,
 * добавляет обработчики событий
 *
 */
const initialize = () => {
  bodyElement.classList.add(`modal-open`);
  editPanel.classList.remove(`hidden`);
  editPanelClose.addEventListener(`click`, onEditPanelCloseClick);
  document.addEventListener(`keydown`, onEditPanelEscPress);
  uploadForm.addEventListener(`submit`, onUploadFormSubmit);
  resize.initialize();
  effects.initialize();
};

