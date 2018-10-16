import * as util from './util.js';
import * as resize from './resize.js';
import * as effects from './effects.js';

const bodyElement = document.querySelector(`body`);
const uploadButton = document.querySelector(`#upload-file`);
const editPanel = document.querySelector(`.img-upload__overlay`);
const editPanelClose = editPanel.querySelector(`#upload-cancel`);

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
  resize.initialize();
  effects.initialize();
};
