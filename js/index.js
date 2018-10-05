// import double from './example.js';

const photoAmount = 25;

const likesAmount = {
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

const commentsAmount = {
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

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

// Элементы для показа фотографии в полноэкранном режиме
const bigPhoto = document.querySelector(`.big-picture`);
const bigPhotoImage = bigPhoto.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const bigPhotoCaption = bigPhoto.querySelector(`.social__caption`);
const bigPhotoLikes = bigPhoto.querySelector(`.likes-count`);
const bigPhotoCommentsCount = bigPhoto.querySelector(`.social__comment-count`);
const bigPhotoCommentsLoad = bigPhoto.querySelector(`.social__comment-loadmore`);
const bigPhotoCommentsBLock = bigPhoto.querySelector(`.social__comments`);

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
  likes: getRandomNumber(likesAmount.min, likesAmount.max),
  comments: getRandomArray(commentsAmount.min, commentsAmount.max, comments),
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

const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
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
 * Отображает DOM-элемент `Фотография`, созданный на основе объетка photoData,
 * в полноэкранном режиме
 *
 * @param {Photo} photoData
 */
const renderBigPhoto = (photoData) => {
  bigPhoto.classList.remove(`hidden`);
  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  bigPhotoImage.src = photoData.url;
  bigPhotoCaption.textContent = photoData.description;
  bigPhotoLikes.textContent = photoData.likes;

  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  removeChildren(bigPhotoCommentsBLock);

  const commentsBlockElements = photoData.comments.map((value) => createCommentTemplate(value));

  bigPhotoCommentsBLock.insertAdjacentHTML(`afterbegin`, commentsBlockElements.join(``));
};

const photos = createPhotoDataArray(photoAmount);

renderPhotos(photos);

renderBigPhoto(photos[0]);
