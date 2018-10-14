const ESC_KEY_CODE = 27;

export /**
 * Возвращает целое случайное число из отрезка [min, max]
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

export /**
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

export /**
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

export /**
 * Удаляет дочерние DOM-элементы у элемента parent
 *
 * @param {Node} parent
 */
const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

export /**
 * Вызывает переданную функцию action, если нажатая клавиша - Esc
 *
 * @param {Event} evt
 * @param {function} action
 */
const runOnEscPress = (evt, action) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    action();
  }
};
