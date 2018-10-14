import * as scale from './scale.js';

const editPanel = document.querySelector(`.img-upload__overlay`);
const scalePanel = editPanel.querySelector(`.scale`);
const effectLevel = scalePanel.querySelector(`.scale__value`);
const effectPanel = editPanel.querySelector(`.effects`);
const effectToggles = effectPanel.querySelectorAll(`.effects__radio`);
const defaultEffect = effectPanel.querySelector(`#effect-none`);
const uploadedPicture = editPanel.querySelector(`.img-upload__preview > img`);

const EFFECT_MAX_LEVEL = 100;

const effects = {
  chrome: {
    min: 0,
    max: 1,
    setFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    setFilter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    setFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    setFilter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    setFilter: (value) => `brightness(${value})`
  },
  none: {
    min: 0,
    max: 0,
    setFilter: () => `none`
  }
};

let currentPictureClass;

/**
 * Устанавливает класс загруженному изображению
 * в соответствии с effectName
 *
 * @param {string} effectName
 */
const setPictureClass = (effectName) => {
  if (currentPictureClass) {
    uploadedPicture.classList.remove(currentPictureClass);
  }
  uploadedPicture.classList.add(`effects__preview--${effectName}`);
  currentPictureClass = `effects__preview--${effectName}`;
};

/**
 * Возвращает отмасштабированное в соответствии с effectName
 * значение для эффекта
 *
 * @param {number} value Значение до масштабирования: от 0 до 100
 * @param {string} effectName Примененный эффект
 * @return {number} Отмасштабированное значение
 */
const getEffectValue = (value, effectName) => {
  const currentEffect = effects[effectName];
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / EFFECT_MAX_LEVEL;
};

/**
 * Устанавливает стиль для загруженного изображения
 * в зависимости от примененного эффекта effectName
 *
 * @param {string} effectName
 */
const setPictureEffect = (effectName) => {
  const effectValue = getEffectValue(effectLevel.value, effectName);
  uploadedPicture.style.filter = effects[effectName].setFilter(effectValue);
};

/**
 * В зависимости от выбранного эффекта скрывает или показывает
 * ползунок scalePanel; передает эффект и функцию применения эффекта
 * для пина ползунка; устанавливает пин ползунка в максимальное
 * положение; устанавливает класс и стиль на загруженное изображение
 *
 * @param {Event} evt
 */
const onEffectToggleClick = (evt) => {
  const selectedEffect = evt.target;
  if (selectedEffect === defaultEffect) {
    scale.hide();
  } else {
    scale.show();
    scale.setPinAction(selectedEffect.value, setPictureEffect);
  }
  scale.setPinPosition(EFFECT_MAX_LEVEL);
  setPictureClass(selectedEffect.value);
  setPictureEffect(selectedEffect.value);
};

export /**
 * Устанавливает обработчики событий на переключатели эффектов;
 * устанавливает класс и стиль `без эффектов` загруженному изображению
 * и скрывает ползунок scalePanel
 *
 */
const initialize = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.addEventListener(`click`, onEffectToggleClick));
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  scale.hide();
};

export /**
 * Удаляет обработчики событий с переключателей эффектов
 *
 */
const finalize = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.removeEventListener(`click`, onEffectToggleClick));
};
