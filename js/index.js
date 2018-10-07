// import double from './example.js';

const photoAmount = 25;

const LikesAmount = {
  min: 15,
  max: 200
};

const comments = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const CommentsAmount = {
  min: 1,
  max: 2
};

const descriptions = [
  `Тестим новую камеру!`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`
];

const escKeyCode = 27;

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

// Элементы для показа фотографии в полноэкранном режиме
const bodyElement = document.querySelector(`body`);
const bigPhoto = document.querySelector(`.big-picture`);
const bigPhotoImage = bigPhoto.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const bigPhotoClose = bigPhoto.querySelector(`.cancel`);
const bigPhotoCaption = bigPhoto.querySelector(`.social__caption`);
const bigPhotoLikes = bigPhoto.querySelector(`.likes-count`);
const bigPhotoCommentsCount = bigPhoto.querySelector(`.social__comment-count`);
const bigPhotoCommentsLoad = bigPhoto.querySelector(`.social__comment-loadmore`);
const bigPhotoCommentsBlock = bigPhoto.querySelector(`.social__comments`);

// Элементы для загрузки изображения и его редактирования
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadButton = uploadForm.querySelector(`#upload-file`);
const editForm = uploadForm.querySelector(`.img-upload__overlay`);
const editFormClose = uploadForm.querySelector(`#upload-cancel`);

// Элементы для масштабирования изображения
const resizeMinus = uploadForm.querySelector(`.resize__control--minus`);
const resizePlus = uploadForm.querySelector(`.resize__control--plus`);
const resizeValue = uploadForm.querySelector(`.resize__control--value`);
const PictureSize = {
  min: 25,
  max: 100,
  default: 100,
  current: 100,
  step: 25
};
const picturePreview = uploadForm.querySelector(`.img-upload__preview`);

/**
 * Возвращает целое случайное число из отрезка [min, max]
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

/**
 * Возвращает случайный элемент массива initialArray и при необходимости удаляет его из массива
 *
 * @param {Array}   initialArray
 * @param {boolean} [needRemove=false] True - элемент удаляется из массива initialArray
 * @return {*}
 */
const getRandomArrayElement = (initialArray, needRemove = false) => {
  const randomElementIndex = getRandomNumber(0, initialArray.length - 1);
  const randomElement = initialArray[randomElementIndex];

  return needRemove ? initialArray.splice(randomElementIndex, 1) : randomElement;
};

/**
 * Возвращает массив случайной длины из отрезка [min, max], составленный
 * из уникальных случайных элементов массива initialArray
 *
 * @param {number} min Минимальная возможная длина возвращаемого массива
 * @param {number} max Максимальная возможная длина возвращаемого массива
 * @param {Array} initialArray Массив, из элементов которого формируется новый массив
 * @return {Array}
 */
const getRandomArray = (min, max, initialArray) => {
  const copiedArray = initialArray.slice();
  const length = getRandomNumber(min, max);

  const iter = (acc, array) => {
    if (acc.length === length) {
      return acc;
    }

    const randomElement = getRandomArrayElement(array, true);
    return iter([...acc, randomElement], array);
  };

  return iter([], copiedArray);
};

/**
 * Возвращает функцию, которая формирует случайное уникальное
 * расположение фотографии
 *
 * @param {number} amount Количество фотографий
 * @return {function} Функция, возвращающая строку с расположением фотографии
 * вида photos/xx.jpg, где xx - случайное число из отрезка [1, amount]
 */
const createUniqueURL = (amount) => {
  const URLNames = new Array(amount)
      .fill()
      .map((value, index) => index + 1);

  return () => `photos/${getRandomArrayElement(URLNames, true)}.jpg`;
};

const getURL = createUniqueURL(photoAmount);

/**
 * Объект Photo, который описывает фотографию, размещенную пользователем
 * @typedef Photo
 * @type {Object}
 * @property {string} url Расположение фотографии
 * @property {number} likes Количество лайков, поставленных фотографии
 * @property {Array.<string>} comments Массив комментариев
 * @property {string} description Описание фотографии
 */

/**
 * Возвращает объект Photo, описывающий фотографию
 *
 * @return {Photo}
 */
const createPhotoData = () => ({
  url: getURL(),
  likes: getRandomNumber(LikesAmount.min, LikesAmount.max),
  comments: getRandomArray(CommentsAmount.min, CommentsAmount.max, comments),
  description: getRandomArrayElement(descriptions)
});

/**
 * Возвращает массив заданной длины length объектов Photo
 *
 * @param {number} length
 * @return {Array.<Photo>}
 */
const createPhotoDataArray = (length) => new Array(length)
    .fill()
    .map(createPhotoData);

/**
 * Удаляет дочерние DOM-элементы у элемента parent
 *
 * @param {Node} parent
 */
const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

/**
 * Открывает поп-ап с полноэкранной версией фотографии
 *
 */
const onPhotoElementClick = () => {
  bodyElement.classList.add(`modal-open`);
  bigPhoto.classList.remove(`hidden`);
  bigPhotoClose.addEventListener(`click`, onBigPhotoCloseClick);
  document.addEventListener(`keydown`, onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
const onBigPhotoCloseClick = () => {
  bodyElement.classList.remove(`modal-open`);
  bigPhoto.classList.add(`hidden`);
  bigPhotoClose.removeEventListener(`click`, onBigPhotoCloseClick);
  document.removeEventListener(`keydown`, onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onBigPhotoEscPress = (evt) => {
  if (evt.keyCode === escKeyCode) {
    onBigPhotoCloseClick();
  }
};

/**
 * Возвращает DOM-элемент `Фотография`, созданный на основе объекта Photo
 *
 * @param {Photo} photoData
 * @return {Node}
 */
const createPhotoElement = (photoData) => {
  const photoElement = template.cloneNode(true);
  const photoElementSource = photoElement.querySelector(`.picture__img`);
  const photoElementComments = photoElement.querySelector(`.picture__stat--comments`);
  const photoElementLikes = photoElement.querySelector(`.picture__stat--likes`);

  photoElementSource.src = photoData.url;
  photoElementComments.textContent = photoData.comments.length;
  photoElementLikes.textContent = photoData.likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photoElement.addEventListener(`click`, () => {
    onPhotoElementClick();
    fillBigPhoto(photoData);
  });

  return photoElement;
};

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов Photo,
 * на странице
 *
 * @param {Array.<Photo>} photoDataArray
 */
const renderPhotos = (photoDataArray) => {
  const fragment = document.createDocumentFragment();
  photoDataArray.forEach((value) => fragment.appendChild(createPhotoElement(value)));

  container.appendChild(fragment);
};

/**
 * Возвращает шаблон DOM-элемента для комментария comment
 *
 * @param {string} comment
 * @return {string}
 */
const createCommentTemplate = (comment) =>
  `<li class="social__comment social__comment--text">
  <img class="social__picture" src="img/avatar-${getRandomNumber(1, 6)}.svg"
  alt="Аватар комментатора фотографии" width="35" height="35">${comment}</li>`;

/**
 * Наполняет DOM-элемент `Фотография в полноэкранном режиме` данными объекта photoData
 *
 * @param {Photo} photoData
 */
const fillBigPhoto = (photoData) => {
  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  bigPhotoImage.src = photoData.url;
  bigPhotoCaption.textContent = photoData.description;
  bigPhotoLikes.textContent = photoData.likes;

  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  removeChildren(bigPhotoCommentsBlock);

  const commentsBlockElements = photoData.comments.map((value) => createCommentTemplate(value));

  bigPhotoCommentsBlock.insertAdjacentHTML(`afterbegin`, commentsBlockElements.join(``));
};

const photos = createPhotoDataArray(photoAmount);

renderPhotos(photos);

// Загрузка изображения и формы редактирования

/**
 * Открывает форму редактирования фотографии,
 * добавляет обработчики событий
 *
 */
const onUploadButtonClick = () => {
  bodyElement.classList.add(`modal-open`);
  editForm.classList.remove(`hidden`);
  editFormClose.addEventListener(`click`, onEditFormCloseClick);
  document.addEventListener(`keydown`, onEditFormEscPress);
  activateResizePicture();
};

/**
 * Закрывает форму редактирования фотографии,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
const onEditFormCloseClick = () => {
  uploadButton.value = ``;
  bodyElement.classList.remove(`modal-open`);
  editForm.classList.add(`hidden`);
  editFormClose.removeEventListener(`click`, onEditFormCloseClick);
  document.removeEventListener(`keydown`, onEditFormEscPress);
  deactivateResizePicture();
};

/**
 * Закрывает форму редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onEditFormEscPress = (evt) => {
  if (evt.keyCode === escKeyCode) {
    onEditFormCloseClick();
  }
};

uploadButton.addEventListener(`change`, onUploadButtonClick);

// Масштабирование изображения

/**
 * Записывает новый масштаб изображения size в поле resizeValue
 * м масштабирует изображение picturePreview на величину size
 * через задание ему стиля `transform: scale(size / 100)`
 *
 * @param {number} size
 */
const setPictureSize = (size) => {
  resizeValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  PictureSize.current = size;
};

/**
 * Уменьшает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizeMinusClick = () => {
  if (PictureSize.current > PictureSize.min) {
    const newSize = PictureSize.current - PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Увеличивает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizePlusClick = () => {
  if (PictureSize.current < PictureSize.max) {
    const newSize = PictureSize.current + PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Устанавливает масштаб PictureSize.default загруженному изображению
 * и добавляет обработчики на кнопки масштабирования изображения
 *
 */
const activateResizePicture = () => {
  setPictureSize(PictureSize.default);
  resizeMinus.addEventListener(`click`, onResizeMinusClick);
  resizePlus.addEventListener(`click`, onResizePlusClick);
};

/**
 * Удаляет обработчики с кнопок масштабирования изображения
 *
 */
const deactivateResizePicture = () => {
  resizeMinus.removeEventListener(`click`, onResizeMinusClick);
  resizePlus.removeEventListener(`click`, onResizePlusClick);
};
