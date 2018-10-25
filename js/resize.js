const uploadForm = document.querySelector(`.img-upload__form`);
const resizeMinus = uploadForm.querySelector(`.resize__control--minus`);
const resizePlus = uploadForm.querySelector(`.resize__control--plus`);
const resizeValue = uploadForm.querySelector(`.resize__control--value`);
const picturePreview = uploadForm.querySelector(`.img-upload__preview`);

const PictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

let currentPictureSize = 100;

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
  currentPictureSize = size;
};

/**
 * Уменьшает масштаб изображения на величину PictureSize.STEP
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizeMinusClick = () => {
  if (currentPictureSize > PictureSize.MIN) {
    const newSize = currentPictureSize - PictureSize.STEP;
    setPictureSize(newSize);
  }
};

/**
 * Увеличивает масштаб изображения на величину PictureSize.STEP
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizePlusClick = () => {
  if (currentPictureSize < PictureSize.MAX) {
    const newSize = currentPictureSize + PictureSize.STEP;
    setPictureSize(newSize);
  }
};

export /**
 * Устанавливает масштаб PictureSize.DEFAULT загруженному изображению
 * и добавляет обработчики на кнопки масштабирования изображения
 *
 */
const initialize = () => {
  setPictureSize(PictureSize.DEFAULT);
  resizeMinus.addEventListener(`click`, onResizeMinusClick);
  resizePlus.addEventListener(`click`, onResizePlusClick);
};

export /**
 * Удаляет обработчики с кнопок масштабирования изображения
 *
 */
const finalize = () => {
  resizeMinus.removeEventListener(`click`, onResizeMinusClick);
  resizePlus.removeEventListener(`click`, onResizePlusClick);
};
