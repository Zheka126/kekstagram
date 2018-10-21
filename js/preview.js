import * as util from './util';

const bodyElement = document.querySelector(`body`);
const preview = document.querySelector(`.big-picture`);
const previewClose = preview.querySelector(`.cancel`);
const previewImage = preview.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const commentsCountBlock = preview.querySelector(`.social__comment-count`);
const commentsLoadMoreButton = preview.querySelector(`.social__comment-loadmore`);
const commentsLoaded = preview.querySelector(`.comments-loaded`);
const previewCaption = preview.querySelector(`.social__caption`);
const previewLikes = preview.querySelector(`.likes-count`);
const previewCommentsBlock = preview.querySelector(`.social__comments`);
const COMMENTS_STEP = 5;

let comments = [];
let commentsCounter = 0;

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
 * Показывает количество загруженных комментариев
 *
 * @param {number} count
 */
const showCommentsLoadedCount = (count) => {
  commentsLoaded.textContent = count;
};

/**
 * Вставляет сформированные на основе комментариев commentsArray
 * элементы в блок previewCommentsBlock,
 * показвает число загруженных комментариев commentsCounter
 *
 * @param {Array<String>} commentsArray
 */
const renderComments = (commentsArray) => {
  const commentsBlockElements = commentsArray.map((comment) => createCommentTemplate(comment));
  previewCommentsBlock.insertAdjacentHTML(`beforeend`, commentsBlockElements.join(``));
  commentsCounter += commentsArray.length;
  showCommentsLoadedCount(commentsCounter);
};

/**
 * Если оставшихся для отображения комментариев меньше COMMENTS_STEP,
 * то скрывает кнопку подгрузки новых комментариев.
 * Отображает не более COMMENTS_STEP комментариев
 *
 */
const onCommentsLoadMoreButtonClick = () => {
  if (comments.length <= COMMENTS_STEP) {
    hideCommentsLoadMoreButton();
  }
  renderComments(comments.splice(0, COMMENTS_STEP));
};

/**
 * Выполняет функцию onCommentsLoadMoreButtonClick при нажатии на ENTER
 *
 * @param {Event} evt
 */
const onCommentsLoadMoreButtonEnterPress = (evt) => {
  util.runOnEnterPress(evt, onCommentsLoadMoreButtonClick);
};

/**
 * Показывает кнопку подгрузки новых комментариев
 * и добавляет обработчики событий на кнопку
 *
 */
const showCommentsLoadMoreButton = () => {
  commentsLoadMoreButton.classList.remove(`hidden`);
  commentsLoadMoreButton.addEventListener(`click`, onCommentsLoadMoreButtonClick);
  commentsLoadMoreButton.addEventListener(`keydown`, onCommentsLoadMoreButtonEnterPress);
};

/**
 * Скрывает кнопку подгрузки новых комментариев
 * и удаляет обработчики событий с кнопки
 *
 */
const hideCommentsLoadMoreButton = () => {
  commentsLoadMoreButton.classList.add(`hidden`);
  commentsLoadMoreButton.removeEventListener(`click`, onCommentsLoadMoreButtonClick);
  commentsLoadMoreButton.removeEventListener(`keydown`, onCommentsLoadMoreButtonEnterPress);
};

/**
 * Показывает блок с количеством комментариев
 * и отображает не более COMMENTS_STEP комментариев
 *
 */
const showCommentsCountBlock = () => {
  commentsCountBlock.classList.remove(`hidden`);
  renderComments(comments.splice(0, COMMENTS_STEP));
};

/**
 * Скрывает блок с количеством комментариев
 *
 */
const hideCommentsCountBlock = () => {
  commentsCountBlock.classList.add(`hidden`);
};

/**
 * Наполняет DOM-элемент `Фотография в полноэкранном режиме` данными объекта photoData
 *
 * @param {Object} photoData
 */
const fillPreview = (photoData) => {
  previewImage.src = photoData.url;
  previewCaption.textContent = photoData.description;
  previewLikes.textContent = photoData.likes;

  util.removeChildren(previewCommentsBlock);

  comments = photoData.comments.slice();
  commentsCountBlock.querySelector(`.comments-count`).textContent = comments.length;

  showCommentsCountBlock();

  // В зависимости от количества комментариев показывает
  // или скрывает блок загрузки новых комментариев
  if (photoData.comments.length <= COMMENTS_STEP) {
    hideCommentsLoadMoreButton();
  } else {
    showCommentsLoadMoreButton();
  }
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
const onPreviewCloseClick = () => {
  comments = [];
  commentsCounter = 0;
  bodyElement.classList.remove(`modal-open`);
  preview.classList.add(`hidden`);
  hideCommentsCountBlock();
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

export /**
 * Открывает поп-ап с полноэкранной версией фотографии
 *
 * @param {Object} photoData
 */
const open = (photoData) => {
  bodyElement.classList.add(`modal-open`);
  preview.classList.remove(`hidden`);
  previewClose.addEventListener(`click`, onPreviewCloseClick);
  document.addEventListener(`keydown`, onPreviewEscPress);
  fillPreview(photoData);
};
