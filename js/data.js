import * as util from './util.js';

const PHOTO_AMOUNT = 25;

const LikesAmount = {
  MIN: 15,
  MAX: 200
};

const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const CommentsAmount = {
  MIN: 1,
  MAX: 2
};

const DESCRIPTIONS = [
  `Тестим новую камеру!`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`
];

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

  return () => `photos/${util.getRandomArrayElement(URLNames, true)}.jpg`;
};

const getURL = createUniqueURL(PHOTO_AMOUNT);

/**
 * Объект Photo, который описывает фотографию, размещенную пользователем
 * @typedef Photo
 * @type {Object}
 * @property {string} url Расположение фотографии
 * @property {number} likes Количество лайков, поставленных фотографии
 * @property {Array.<string>} COMMENTS Массив комментариев
 * @property {string} description Описание фотографии
 */

/**
 * Возвращает объект Photo, описывающий фотографию
 *
 * @return {Photo}
 */
const createPhotoData = () => ({
  url: getURL(),
  likes: util.getRandomNumber(LikesAmount.MIN, LikesAmount.MAX),
  comments: util.getRandomArray(CommentsAmount.MIN, CommentsAmount.MAX, COMMENTS),
  description: util.getRandomArrayElement(DESCRIPTIONS)
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

export const init = () => createPhotoDataArray(PHOTO_AMOUNT);
