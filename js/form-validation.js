import * as util from './util.js';

const uploadForm = document.querySelector(`.img-upload__form`);
const hashTagsField = uploadForm.querySelector(`.text__hashtags`);
const commentField = uploadForm.querySelector(`.text__description`);
const submitButton = uploadForm.querySelector(`.img-upload__submit`);

const HashTag = {
  SYMBOL: `#`,
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5
};

const COMMENT_MAX_SIZE = 140;
const ERROR_STYLE = `2px solid #ff0000`;

/**
 * Выделяет неверно заполненные поля
 *
 * @param {Node} element
 */
const setErrorValidStyle = (element) => {
  element.style.border = ERROR_STYLE;
};

/**
 * Отменяет выделение неверно заполненного поля
 *
 * @param {Node} element
 */
const resetErrorValidStyle = (element) => {
  element.style.border = ``;
};

// Массив объектов, ставящих в соответствие функцию проверки
// формата хэштегов и сообщение об его ошибке
const checkActions = [
  {
    message: false,
    check: (arg) => arg.length === 0
  },
  {
    message: `Хэш-тэгов должно быть не более ${HashTag.AMOUNT}`,
    check: (arg) => arg.length > HashTag.AMOUNT
  },
  {
    message: `Хэш-тэг должен начинаться с #`,
    check: (arg) => arg.some((value) => value[0] !== HashTag.SYMBOL)
  },
  {
    message: `Хэш-тэг должен состоять минимум из ${HashTag.MIN_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length < HashTag.MIN_SIZE)
  },
  {
    message: `Хэш-тэг не должен превышать ${HashTag.MAX_SIZE} символов`,
    check: (arg) => arg.some((value) => value.length > HashTag.MAX_SIZE)
  },
  {
    message: `Хэш-тэги должны быть уникальными`,
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index)
  },
  {
    message: false,
    check: (arg) => arg
  },
];

/**
 * Возвращает первый объект массива checkActions,
 * у которого функция check
 * от аргумента arg возвращает true
 *
 * @param {Array} arg
 * @return {Object}
 */
const getCheckAction = (arg) => checkActions.find(({check}) => check(arg));

/**
 * Возвращает массив, сформированный из строки str.
 * Переводит элементы массива в нижний регистр,
 * исключает пустые элементы
 *
 * @param {String} str
 * @return {Array}
 */
const getHashTagsArray = (str) => {
  const arr = str.split(` `).map(((value) => value.toLowerCase()));
  return util.getArrayWithoutElement(arr, ``);
};

/**
 * Проверяет правильность заполнения поля с хэштегами.
 * При неверно заполненном поле показывает сообщение об ошибке
 *
 * @param {String} data
 */
const checkHashTags = (data) => {
  const hashTags = getHashTagsArray(data);
  const {message} = getCheckAction(hashTags);
  if (message) {
    hashTagsField.setCustomValidity(message);
  } else {
    hashTagsField.setCustomValidity(``);
  }
};

/**
 * Проверяет правильность заполнения поля с комментарием.
 * При неверно заполненном поле показывает сообщение об ошибке
 *
 * @param {String} data
 */
const checkComment = (data) => {
  if (data.length > COMMENT_MAX_SIZE) {
    commentField.setCustomValidity(`Длина комментария не должна
    превышать ${COMMENT_MAX_SIZE} символов. Текущая длина сообщения ${data.length}`);
  } else {
    commentField.setCustomValidity(``);
  }
};

/**
 * Скрывает сообщения о неверно заполненных полях fields
 * при событии input
 *
 * @param {Nodes} fields
 */
const clearCustomValidity = (...fields) => {
  fields.forEach((field) => {
    field.addEventListener(`input`, () => {
      field.setCustomValidity(``);
    });
  });
};

export /**
 * Инициирует проверку полей формы
 *
 */
const initialize = () => {
  clearCustomValidity(hashTagsField, commentField);

  submitButton.addEventListener(`click`, () => {
    checkHashTags(hashTagsField.value);
    checkComment(commentField.value);
  });

  uploadForm.addEventListener(`invalid`, function (evt) {
    setErrorValidStyle(evt.target);
  }, true);

  uploadForm.addEventListener(`input`, function (evt) {
    resetErrorValidStyle(evt.target);
  });
};
