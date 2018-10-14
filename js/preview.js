import * as util from './util';

const bodyElement = document.querySelector(`body`);
const preview = document.querySelector(`.big-picture`);
const previewClose = preview.querySelector(`.cancel`);
const previewImage = preview.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const previewCommentsCount = preview.querySelector(`.social__comment-count`);
const previewCommentsLoad = preview.querySelector(`.social__comment-loadmore`);
const previewCaption = preview.querySelector(`.social__caption`);
const previewLikes = preview.querySelector(`.likes-count`);
const previewCommentsBlock = preview.querySelector(`.social__comments`);

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
const onPreviewCloseClick = () => {
  bodyElement.classList.remove(`modal-open`);
  preview.classList.add(`hidden`);
  previewClose.removeEventListener(`click`, onPreviewCloseClick);
  document.removeEventListener(`keydown`, onPreviewEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onPreviewEscPress = (evt) => {
  util.runOnEscPress(evt, onPreviewCloseClick);
};

/**
 * Возвращает шаблон DOM-элемента для комментария comment
 *
 * @param {string} comment
 * @return {string}
 */
const createCommentTemplate = (comment) =>
  `<li class="social__comment social__comment--text">
  <img class="social__picture" src="img/avatar-${util.getRandomNumber(1, 6)}.svg"
  alt="Аватар комментатора фотографии" width="35" height="35">${comment}</li>`;

/**
 * Наполняет DOM-элемент `Фотография в полноэкранном режиме` данными объекта photoData
 *
 * @param {Photo} photoData
 */
const fillPreview = (photoData) => {
  previewCommentsCount.classList.add(`visually-hidden`);
  previewCommentsLoad.classList.add(`visually-hidden`);

  previewImage.src = photoData.url;
  previewCaption.textContent = photoData.description;
  previewLikes.textContent = photoData.likes;

  previewCommentsCount.classList.add(`visually-hidden`);
  previewCommentsLoad.classList.add(`visually-hidden`);

  util.removeChildren(previewCommentsBlock);

  const commentsBlockElements = photoData.comments.map((value) => createCommentTemplate(value));

  previewCommentsBlock.insertAdjacentHTML(`afterbegin`, commentsBlockElements.join(``));
};

export /**
 * Открывает поп-ап с полноэкранной версией фотографии
 *
 * @param {Photo} photoData
 */
const open = (photoData) => {
  bodyElement.classList.add(`modal-open`);
  preview.classList.remove(`hidden`);
  previewClose.addEventListener(`click`, onPreviewCloseClick);
  document.addEventListener(`keydown`, onPreviewEscPress);
  fillPreview(photoData);
};
