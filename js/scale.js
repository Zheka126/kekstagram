const editPanel = document.querySelector(`.img-upload__overlay`);
const scalePanel = editPanel.querySelector(`.scale`);
const effectLevel = scalePanel.querySelector(`.scale__value`);
const scalePin = scalePanel.querySelector(`.scale__pin`);
const scaleLevel = scalePanel.querySelector(`.scale__level`);
const scaleLine = scalePanel.querySelector(`.scale__line`);
const EFFECT_MAX_LEVEL = 100;
let pin;

export /**
 * Скрывает ползунок scale и удаляет обработчик событий
 * с пина ползунка
 *
 */
const hide = () => {
  scalePanel.classList.add(`hidden`);
  scalePin.removeEventListener(`mousedown`, onScalePinMouseDown);
};

export /**
 * Показывает ползунок scale и добавлляет обработчик событий
 * для пина ползунка
 *
 */
const show = () => {
  if (scalePanel.classList.contains(`hidden`)) {
    scalePanel.classList.remove(`hidden`);
    scalePin.addEventListener(`mousedown`, onScalePinMouseDown);
  }
};

export /**
 * Присваивает уровню эффекта effectLevel значение value;
 * перемещает пин ползунка в соответствии с величиной value
 *
 * @param {number} value Значение от 0 до 100
 */
const setPinPosition = (value) => {
  effectLevel.value = value;
  scalePin.style.left = `${value}%`;
  scaleLevel.style.width = `${value}%`;
};

export /**
 * Присваивает переменной pin значения примененного эффекта
 * и функции, используюшейся при перемещении пина
 *
 * @param {string} effect
 * @param {function} action
 */
const setPinAction = (effect, action) => {
  pin = {
    effect,
    action
  };
};

/**
 * Перемещает пин позунка и в зависимости от его положения
 * применяет эффекты к изображению
 *
 * @param {Event} evt
 */
const onScalePinMouseDown = (evt) => {
  evt.preventDefault();
  const scaleWidth = scaleLine.offsetWidth;

  let startCoord = evt.clientX;

  scalePin.style.cursor = `none`;
  document.documentElement.style.cursor = `none`;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;

    let currentCoord = scalePin.offsetLeft - shift;

    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > scaleWidth) {
      currentCoord = scaleWidth;
    }

    const currentValue = currentCoord * EFFECT_MAX_LEVEL / scaleWidth;

    setPinPosition(currentValue);
    pin.action(pin.effect);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    scalePin.style.cursor = `move`;
    document.documentElement.style.cursor = `auto`;

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
