'use strict';

var _data = require('./data.js');

var data = _interopRequireWildcard(_data);

var _util = require('./util.js');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var escKeyCode = 27;

// DOM-элемент, в котором размещаются фотографии пользователей
var container = document.querySelector('.pictures');

// Шаблон для фотографии пользователя
var template = document.querySelector('#picture').content.querySelector('.picture__link');

// Элементы для показа фотографии в полноэкранном режиме
var bodyElement = document.querySelector('body');
var bigPhoto = document.querySelector('.big-picture');
var bigPhotoImage = bigPhoto.querySelector('.big-picture__img').querySelector('img');
var bigPhotoClose = bigPhoto.querySelector('.cancel');
var bigPhotoCaption = bigPhoto.querySelector('.social__caption');
var bigPhotoLikes = bigPhoto.querySelector('.likes-count');
var bigPhotoCommentsCount = bigPhoto.querySelector('.social__comment-count');
var bigPhotoCommentsLoad = bigPhoto.querySelector('.social__comment-loadmore');
var bigPhotoCommentsBlock = bigPhoto.querySelector('.social__comments');

// Элементы для загрузки изображения и его редактирования
var uploadForm = document.querySelector('.img-upload__form');
var uploadButton = uploadForm.querySelector('#upload-file');
var editForm = uploadForm.querySelector('.img-upload__overlay');
var editFormClose = uploadForm.querySelector('#upload-cancel');

// Элементы для масштабирования изображения
var resizeMinus = uploadForm.querySelector('.resize__control--minus');
var resizePlus = uploadForm.querySelector('.resize__control--plus');
var resizeValue = uploadForm.querySelector('.resize__control--value');
var PictureSize = {
  min: 25,
  max: 100,
  default: 100,
  current: 100,
  step: 25
};
var picturePreview = uploadForm.querySelector('.img-upload__preview');

/**
 * Открывает поп-ап с полноэкранной версией фотографии
 *
 */
var onPhotoElementClick = function onPhotoElementClick() {
  bodyElement.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  bigPhotoClose.addEventListener('click', onBigPhotoCloseClick);
  document.addEventListener('keydown', onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
var onBigPhotoCloseClick = function onBigPhotoCloseClick() {
  bodyElement.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  bigPhotoClose.removeEventListener('click', onBigPhotoCloseClick);
  document.removeEventListener('keydown', onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
var onBigPhotoEscPress = function onBigPhotoEscPress(evt) {
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
var createPhotoElement = function createPhotoElement(photoData) {
  var photoElement = template.cloneNode(true);
  var photoElementSource = photoElement.querySelector('.picture__img');
  var photoElementComments = photoElement.querySelector('.picture__stat--comments');
  var photoElementLikes = photoElement.querySelector('.picture__stat--likes');

  photoElementSource.src = photoData.url;
  photoElementComments.textContent = photoData.comments.length;
  photoElementLikes.textContent = photoData.likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photoElement.addEventListener('click', function () {
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
var renderPhotos = function renderPhotos(photoDataArray) {
  var fragment = document.createDocumentFragment();
  photoDataArray.forEach(function (value) {
    return fragment.appendChild(createPhotoElement(value));
  });

  container.appendChild(fragment);
};

/**
 * Возвращает шаблон DOM-элемента для комментария comment
 *
 * @param {string} comment
 * @return {string}
 */
var createCommentTemplate = function createCommentTemplate(comment) {
  return '<li class="social__comment social__comment--text">\n  <img class="social__picture" src="img/avatar-' + util.getRandomNumber(1, 6) + '.svg"\n  alt="\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0442\u043E\u0440\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438" width="35" height="35">' + comment + '</li>';
};

/**
 * Наполняет DOM-элемент `Фотография в полноэкранном режиме` данными объекта photoData
 *
 * @param {Photo} photoData
 */
var fillBigPhoto = function fillBigPhoto(photoData) {
  bigPhotoCommentsCount.classList.add('visually-hidden');
  bigPhotoCommentsLoad.classList.add('visually-hidden');

  bigPhotoImage.src = photoData.url;
  bigPhotoCaption.textContent = photoData.description;
  bigPhotoLikes.textContent = photoData.likes;

  bigPhotoCommentsCount.classList.add('visually-hidden');
  bigPhotoCommentsLoad.classList.add('visually-hidden');

  util.removeChildren(bigPhotoCommentsBlock);

  var commentsBlockElements = photoData.comments.map(function (value) {
    return createCommentTemplate(value);
  });

  bigPhotoCommentsBlock.insertAdjacentHTML('afterbegin', commentsBlockElements.join(''));
};

var photos = data.init();

renderPhotos(photos);

// Загрузка изображения и формы редактирования

/**
 * Открывает форму редактирования фотографии,
 * добавляет обработчики событий
 *
 */
var onUploadButtonClick = function onUploadButtonClick() {
  bodyElement.classList.add('modal-open');
  editForm.classList.remove('hidden');
  editFormClose.addEventListener('click', onEditFormCloseClick);
  document.addEventListener('keydown', onEditFormEscPress);
  activateResizePicture();
  activateEffectsPicture();
};

/**
 * Закрывает форму редактирования фотографии,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
var onEditFormCloseClick = function onEditFormCloseClick() {
  uploadButton.value = '';
  bodyElement.classList.remove('modal-open');
  editForm.classList.add('hidden');
  editFormClose.removeEventListener('click', onEditFormCloseClick);
  document.removeEventListener('keydown', onEditFormEscPress);
  deactivateResizePicture();
  deactivateEffectsPicture();
};

/**
 * Закрывает форму редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
var onEditFormEscPress = function onEditFormEscPress(evt) {
  if (evt.keyCode === escKeyCode) {
    onEditFormCloseClick();
  }
};

uploadButton.addEventListener('change', onUploadButtonClick);

// Масштабирование изображения

/**
 * Записывает новый масштаб изображения size в поле resizeValue
 * м масштабирует изображение picturePreview на величину size
 * через задание ему стиля `transform: scale(size / 100)`
 *
 * @param {number} size
 */
var setPictureSize = function setPictureSize(size) {
  resizeValue.value = size + '%';
  picturePreview.style = 'transform: scale(' + size / 100 + ')';
  PictureSize.current = size;
};

/**
 * Уменьшает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
var onResizeMinusClick = function onResizeMinusClick() {
  if (PictureSize.current > PictureSize.min) {
    var newSize = PictureSize.current - PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Увеличивает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
var onResizePlusClick = function onResizePlusClick() {
  if (PictureSize.current < PictureSize.max) {
    var newSize = PictureSize.current + PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Устанавливает масштаб PictureSize.default загруженному изображению
 * и добавляет обработчики на кнопки масштабирования изображения
 *
 */
var activateResizePicture = function activateResizePicture() {
  setPictureSize(PictureSize.default);
  resizeMinus.addEventListener('click', onResizeMinusClick);
  resizePlus.addEventListener('click', onResizePlusClick);
};

/**
 * Удаляет обработчики с кнопок масштабирования изображения
 *
 */
var deactivateResizePicture = function deactivateResizePicture() {
  resizeMinus.removeEventListener('click', onResizeMinusClick);
  resizePlus.removeEventListener('click', onResizePlusClick);
};

// Применение эффекта для изображения
var scalePanel = uploadForm.querySelector('.scale');
var scalePin = scalePanel.querySelector('.scale__pin');
var scaleLevel = scalePanel.querySelector('.scale__level');
var effectLevel = scalePanel.querySelector('.scale__value');
var effectPanel = uploadForm.querySelector('.effects');
var effectToggles = effectPanel.querySelectorAll('.effects__radio');
var defaultEffect = effectPanel.querySelector('#effect-none');
var uploadedPicture = uploadForm.querySelector('.img-upload__preview > img');
var effectMaxLevel = 100;
var currentPictureClass = void 0;

var effects = {
  chrome: {
    min: 0,
    max: 1,
    setFilter: function setFilter(value) {
      return 'grayscale(' + value + ')';
    }
  },
  sepia: {
    min: 0,
    max: 1,
    setFilter: function setFilter(value) {
      return 'sepia(' + value + ')';
    }
  },
  marvin: {
    min: 0,
    max: 100,
    setFilter: function setFilter(value) {
      return 'invert(' + value + '%)';
    }
  },
  phobos: {
    min: 0,
    max: 3,
    setFilter: function setFilter(value) {
      return 'blur(' + value + 'px)';
    }
  },
  heat: {
    min: 1,
    max: 3,
    setFilter: function setFilter(value) {
      return 'brightness(' + value + ')';
    }
  },
  none: {
    min: 0,
    max: 0,
    setFilter: function setFilter() {
      return 'none';
    }
  }
};

/**
 * Скрывает ползунок scale и удаляет обработчик событий
 * с пина ползунка
 *
 */
var hideScalePanel = function hideScalePanel() {
  scalePanel.classList.add('hidden');
  scalePin.removeEventListener('mousedown', onScalePinMouseDown);
};

/**
 * Показывает ползунок scale и добавлляет обработчик событий
 * для пина ползунка
 *
 */
var showScalePanel = function showScalePanel() {
  if (scalePanel.classList.contains('hidden')) {
    scalePanel.classList.remove('hidden');
    scalePin.addEventListener('mousedown', onScalePinMouseDown);
  }
};

/**
 * Устанавливает класс загруженному изображению
 * в соответствии с effectName
 *
 * @param {string} effectName
 */
var setPictureClass = function setPictureClass(effectName) {
  if (currentPictureClass) {
    uploadedPicture.classList.remove(currentPictureClass);
  }
  uploadedPicture.classList.add('effects__preview--' + effectName);
  currentPictureClass = 'effects__preview--' + effectName;
};

/**
 * Возвращает отмасштабированное в соответствии с effectName
 * значение для эффекта
 *
 * @param {number} value Значение до масштабирования: от 0 до 100
 * @param {string} effectName Примененный эффект
 * @return {number} Отмасштабированное значение
 */
var getEffectValue = function getEffectValue(value, effectName) {
  var currentEffect = effects[effectName];
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / effectMaxLevel;
};

/**
 * Устанавливает стиль для загруженного изображения
 * в зависимости от примененного эффекта effectName
 *
 * @param {string} effectName
 */
var setPictureEffect = function setPictureEffect(effectName) {
  var effectValue = getEffectValue(effectLevel.value, effectName);
  uploadedPicture.style.filter = effects[effectName].setFilter(effectValue);
};

/**
 * Присваивает уровню эффекта effectLevel значение value;
 * перемещает пин ползунка в соответствии с величиной value
 *
 * @param {number} value Значение от 0 до 100
 */
var setPinPosition = function setPinPosition(value) {
  effectLevel.value = value;
  scalePin.style.left = value + '%';
  scaleLevel.style.width = value + '%';
};

/**
 * В зависимости от выбранного эффекта скрывает или показывает
 * ползунок scalePanel; передает эффект и функцию применения эффекта
 * для пина ползунка; устанавливает пин ползунка в максимальное
 * положение; устанавливает класс и стиль на загруженное изображение
 *
 * @param {Event} evt
 */
var onEffectToggleClick = function onEffectToggleClick(evt) {
  var selectedEffect = evt.target;
  if (selectedEffect === defaultEffect) {
    hideScalePanel();
  } else {
    showScalePanel();
    setPinAction(selectedEffect.value, setPictureEffect);
  }
  setPinPosition(effectMaxLevel);
  setPictureClass(selectedEffect.value);
  setPictureEffect(selectedEffect.value);
};

/**
 * Устанавливает обработчики событий на переключатели эффектов;
 * устанавливает класс и стиль `без эффектов` загруженному изображению
 * и скрывает ползунок scalePanel
 *
 */
var activateEffectsPicture = function activateEffectsPicture() {
  Array.from(effectToggles).forEach(function (effectToggle) {
    return effectToggle.addEventListener('click', onEffectToggleClick);
  });
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  hideScalePanel();
};

/**
 * Удаляет обработчики событий с переключателей эффектов
 *
 */
var deactivateEffectsPicture = function deactivateEffectsPicture() {
  Array.from(effectToggles).forEach(function (effectToggle) {
    return effectToggle.removeEventListener('click', onEffectToggleClick);
  });
};

// Перемещение ползунка
var scaleLine = scalePanel.querySelector('.scale__line');
var pin = void 0;

/**
 * Присваивает переменной pin значения примененного эффекта
 * и функции, используюшейся при перемещении пина
 *
 * @param {string} effect
 * @param {function} action
 */
var setPinAction = function setPinAction(effect, action) {
  pin = {
    effect: effect,
    action: action
  };
};

/**
 * Перемещает пин позунка и в зависимости от его положения
 * применяет эффекты к изображению
 *
 * @param {Event} evt
 */
var onScalePinMouseDown = function onScalePinMouseDown(evt) {
  evt.preventDefault();
  var scaleWidth = scaleLine.offsetWidth;

  var startCoord = evt.clientX;

  scalePin.style.cursor = 'none';
  document.documentElement.style.cursor = 'none';

  var onMouseMove = function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;

    var currentCoord = scalePin.offsetLeft - shift;

    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > scaleWidth) {
      currentCoord = scaleWidth;
    }

    var currentValue = currentCoord * 100 / scaleWidth;
    setPinPosition(currentValue);
    pin.action(pin.effect);
  };

  var onMouseUp = function onMouseUp(upEvt) {
    upEvt.preventDefault();

    scalePin.style.cursor = 'move';
    document.documentElement.style.cursor = 'auto';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJ1dGlsIiwiZXNjS2V5Q29kZSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRlbXBsYXRlIiwiY29udGVudCIsImJvZHlFbGVtZW50IiwiYmlnUGhvdG8iLCJiaWdQaG90b0ltYWdlIiwiYmlnUGhvdG9DbG9zZSIsImJpZ1Bob3RvQ2FwdGlvbiIsImJpZ1Bob3RvTGlrZXMiLCJiaWdQaG90b0NvbW1lbnRzQ291bnQiLCJiaWdQaG90b0NvbW1lbnRzTG9hZCIsImJpZ1Bob3RvQ29tbWVudHNCbG9jayIsInVwbG9hZEZvcm0iLCJ1cGxvYWRCdXR0b24iLCJlZGl0Rm9ybSIsImVkaXRGb3JtQ2xvc2UiLCJyZXNpemVNaW51cyIsInJlc2l6ZVBsdXMiLCJyZXNpemVWYWx1ZSIsIlBpY3R1cmVTaXplIiwibWluIiwibWF4IiwiZGVmYXVsdCIsImN1cnJlbnQiLCJzdGVwIiwicGljdHVyZVByZXZpZXciLCJvblBob3RvRWxlbWVudENsaWNrIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQmlnUGhvdG9DbG9zZUNsaWNrIiwib25CaWdQaG90b0VzY1ByZXNzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleUNvZGUiLCJjcmVhdGVQaG90b0VsZW1lbnQiLCJwaG90b0RhdGEiLCJwaG90b0VsZW1lbnQiLCJjbG9uZU5vZGUiLCJwaG90b0VsZW1lbnRTb3VyY2UiLCJwaG90b0VsZW1lbnRDb21tZW50cyIsInBob3RvRWxlbWVudExpa2VzIiwic3JjIiwidXJsIiwidGV4dENvbnRlbnQiLCJjb21tZW50cyIsImxlbmd0aCIsImxpa2VzIiwiZmlsbEJpZ1Bob3RvIiwicmVuZGVyUGhvdG9zIiwicGhvdG9EYXRhQXJyYXkiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJmb3JFYWNoIiwidmFsdWUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbW1lbnRUZW1wbGF0ZSIsImNvbW1lbnQiLCJnZXRSYW5kb21OdW1iZXIiLCJkZXNjcmlwdGlvbiIsInJlbW92ZUNoaWxkcmVuIiwiY29tbWVudHNCbG9ja0VsZW1lbnRzIiwibWFwIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiam9pbiIsInBob3RvcyIsImluaXQiLCJvblVwbG9hZEJ1dHRvbkNsaWNrIiwib25FZGl0Rm9ybUNsb3NlQ2xpY2siLCJvbkVkaXRGb3JtRXNjUHJlc3MiLCJhY3RpdmF0ZVJlc2l6ZVBpY3R1cmUiLCJhY3RpdmF0ZUVmZmVjdHNQaWN0dXJlIiwiZGVhY3RpdmF0ZVJlc2l6ZVBpY3R1cmUiLCJkZWFjdGl2YXRlRWZmZWN0c1BpY3R1cmUiLCJzZXRQaWN0dXJlU2l6ZSIsInNpemUiLCJzdHlsZSIsIm9uUmVzaXplTWludXNDbGljayIsIm5ld1NpemUiLCJvblJlc2l6ZVBsdXNDbGljayIsInNjYWxlUGFuZWwiLCJzY2FsZVBpbiIsInNjYWxlTGV2ZWwiLCJlZmZlY3RMZXZlbCIsImVmZmVjdFBhbmVsIiwiZWZmZWN0VG9nZ2xlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZWZhdWx0RWZmZWN0IiwidXBsb2FkZWRQaWN0dXJlIiwiZWZmZWN0TWF4TGV2ZWwiLCJjdXJyZW50UGljdHVyZUNsYXNzIiwiZWZmZWN0cyIsImNocm9tZSIsInNldEZpbHRlciIsInNlcGlhIiwibWFydmluIiwicGhvYm9zIiwiaGVhdCIsIm5vbmUiLCJoaWRlU2NhbGVQYW5lbCIsIm9uU2NhbGVQaW5Nb3VzZURvd24iLCJzaG93U2NhbGVQYW5lbCIsImNvbnRhaW5zIiwic2V0UGljdHVyZUNsYXNzIiwiZWZmZWN0TmFtZSIsImdldEVmZmVjdFZhbHVlIiwiY3VycmVudEVmZmVjdCIsInNldFBpY3R1cmVFZmZlY3QiLCJlZmZlY3RWYWx1ZSIsImZpbHRlciIsInNldFBpblBvc2l0aW9uIiwibGVmdCIsIndpZHRoIiwib25FZmZlY3RUb2dnbGVDbGljayIsInNlbGVjdGVkRWZmZWN0IiwidGFyZ2V0Iiwic2V0UGluQWN0aW9uIiwiQXJyYXkiLCJmcm9tIiwiZWZmZWN0VG9nZ2xlIiwiY2hlY2tlZCIsInNjYWxlTGluZSIsInBpbiIsImVmZmVjdCIsImFjdGlvbiIsInByZXZlbnREZWZhdWx0Iiwic2NhbGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic3RhcnRDb29yZCIsImNsaWVudFgiLCJjdXJzb3IiLCJkb2N1bWVudEVsZW1lbnQiLCJvbk1vdXNlTW92ZSIsIm1vdmVFdnQiLCJzaGlmdCIsImN1cnJlbnRDb29yZCIsIm9mZnNldExlZnQiLCJjdXJyZW50VmFsdWUiLCJvbk1vdXNlVXAiLCJ1cEV2dCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7SUFBWUEsSTs7QUFDWjs7SUFBWUMsSTs7OztBQUVaLElBQU1DLGFBQWEsRUFBbkI7O0FBRUE7QUFDQSxJQUFNQyxZQUFZQyxTQUFTQyxhQUFULGFBQWxCOztBQUVBO0FBQ0EsSUFBTUMsV0FBV0YsU0FBU0MsYUFBVCxhQUNaRSxPQURZLENBRVpGLGFBRlksa0JBQWpCOztBQUlBO0FBQ0EsSUFBTUcsY0FBY0osU0FBU0MsYUFBVCxRQUFwQjtBQUNBLElBQU1JLFdBQVdMLFNBQVNDLGFBQVQsZ0JBQWpCO0FBQ0EsSUFBTUssZ0JBQWdCRCxTQUFTSixhQUFULHNCQUNqQkEsYUFEaUIsT0FBdEI7QUFFQSxJQUFNTSxnQkFBZ0JGLFNBQVNKLGFBQVQsV0FBdEI7QUFDQSxJQUFNTyxrQkFBa0JILFNBQVNKLGFBQVQsb0JBQXhCO0FBQ0EsSUFBTVEsZ0JBQWdCSixTQUFTSixhQUFULGdCQUF0QjtBQUNBLElBQU1TLHdCQUF3QkwsU0FBU0osYUFBVCwwQkFBOUI7QUFDQSxJQUFNVSx1QkFBdUJOLFNBQVNKLGFBQVQsNkJBQTdCO0FBQ0EsSUFBTVcsd0JBQXdCUCxTQUFTSixhQUFULHFCQUE5Qjs7QUFFQTtBQUNBLElBQU1ZLGFBQWFiLFNBQVNDLGFBQVQscUJBQW5CO0FBQ0EsSUFBTWEsZUFBZUQsV0FBV1osYUFBWCxnQkFBckI7QUFDQSxJQUFN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QztBQUNBaEIsbUJBQWUyQixZQUFmO0FBQ0FmLFFBQUlFLE1BQUosQ0FBV0YsSUFBSUMsTUFBZjtBQUNELEdBakJEOztBQW1CQSxNQUFNZSxZQUFZLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRCxFQUFXO0FBQzNCQSxVQUFNZCxjQUFOOztBQUVBNUMsYUFBU0wsS0FBVCxDQUFlc0QsTUFBZjtBQUNBcEksYUFBU3FJLGVBQVQsQ0FBeUJ2RCxLQUF6QixDQUErQnNELE1BQS9COztBQUVBcEksYUFBU2tDLG1CQUFULGNBQTBDb0csV0FBMUM7QUFDQXRJLGFBQVNrQyxtQkFBVCxZQUF3QzBHLFNBQXhDO0FBQ0QsR0FSRDs7QUFVQTVJLFdBQVMrQixnQkFBVCxjQUF1Q3VHLFdBQXZDO0FBQ0F0SSxXQUFTK0IsZ0JBQVQsWUFBcUM2RyxTQUFyQztBQUNELENBeENEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGF0YSBmcm9tICcuL2RhdGEuanMnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG5jb25zdCBlc2NLZXlDb2RlID0gMjc7XG5cbi8vIERPTS3RjdC70LXQvNC10L3Rgiwg0LIg0LrQvtGC0L7RgNC+0Lwg0YDQsNC30LzQtdGJ0LDRjtGC0YHRjyDRhNC+0YLQvtCz0YDQsNGE0LjQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQuVxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBpY3R1cmVzYCk7XG5cbi8vINCo0LDQsdC70L7QvSDQtNC70Y8g0YTQvtGC0L7Qs9GA0LDRhNC40Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwaWN0dXJlYClcbiAgICAuY29udGVudFxuICAgIC5xdWVyeVNlbGVjdG9yKGAucGljdHVyZV9fbGlua2ApO1xuXG4vLyDQrdC70LXQvNC10L3RgtGLINC00LvRjyDQv9C+0LrQsNC30LAg0YTQvtGC0L7Qs9GA0LDRhNC40Lgg0LIg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdC+0Lwg0YDQtdC20LjQvNC1XG5jb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJvZHlgKTtcbmNvbnN0IGJpZ1Bob3RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmJpZy1waWN0dXJlYCk7XG5jb25zdCBiaWdQaG90b0ltYWdlID0gYmlnUGhvdG8ucXVlcnlTZWxlY3RvcihgLmJpZy1waWN0dXJlX19pbWdgKVxuICAgIC5xdWVyeVNlbGVjdG9yKGBpbWdgKTtcbmNvbnN0IGJpZ1Bob3RvQ2xvc2UgPSBiaWdQaG90by5xdWVyeVNlbGVjdG9yKGAuY2FuY2VsYCk7XG5jb25zdCBiaWdQaG90b0NhcHRpb24gPSBiaWdQaG90by5xdWVyeVNlbGVjdG9yKGAuc29jaWFsX19jYXB0aW9uYCk7XG5jb25zdCBiaWdQaG90b0xpa2VzID0gYmlnUGhvdG8ucXVlcnlTZWxlY3RvcihgLmxpa2VzLWNvdW50YCk7XG5jb25zdCBiaWdQaG90b0NvbW1lbnRzQ291bnQgPSBiaWdQaG90by5xdWVyeVNlbGVjdG9yKGAuc29jaWFsX19jb21tZW50LWNvdW50YCk7XG5jb25zdCBiaWdQaG90b0NvbW1lbnRzTG9hZCA9IGJpZ1Bob3RvLnF1ZXJ5U2VsZWN0b3IoYC5zb2NpYWxfX2NvbW1lbnQtbG9hZG1vcmVgKTtcbmNvbnN0IGJpZ1Bob3RvQ29tbWVudHNCbG9jayA9IGJpZ1Bob3RvLnF1ZXJ5U2VsZWN0b3IoYC5zb2NpYWxfX2NvbW1lbnRzYCk7XG5cbi8vINCt0LvQtdC80LXQvdGC0Ysg0LTQu9GPINC30LDQs9GA0YPQt9C60Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQuCDQtdCz0L4g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuY29uc3QgdXBsb2FkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19mb3JtYCk7XG5jb25zdCB1cGxvYWRCdXR0b24gPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYCN1cGxvYWQtZmlsZWApO1xuY29uc3QgZWRpdEZvcm0gPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19vdmVybGF5YCk7XG5jb25zdCBlZGl0Rm9ybUNsb3NlID0gdXBsb2FkRm9ybS5xdWVyeVNlbGVjdG9yKGAjdXBsb2FkLWNhbmNlbGApO1xuXG4vLyDQrdC70LXQvNC10L3RgtGLINC00LvRjyDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Y8g0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuY29uc3QgcmVzaXplTWludXMgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5yZXNpemVfX2NvbnRyb2wtLW1pbnVzYCk7XG5jb25zdCByZXNpemVQbHVzID0gdXBsb2FkRm9ybS5xdWVyeVNlbGVjdG9yKGAucmVzaXplX19jb250cm9sLS1wbHVzYCk7XG5jb25zdCByZXNpemVWYWx1ZSA9IHVwbG9hZEZvcm0ucXVlcnlTZWxlY3RvcihgLnJlc2l6ZV9fY29udHJvbC0tdmFsdWVgKTtcbmNvbnN0IFBpY3R1cmVTaXplID0ge1xuICBtaW46IDI1LFxuICBtYXg6IDEwMCxcbiAgZGVmYXVsdDogMTAwLFxuICBjdXJyZW50OiAxMDAsXG4gIHN0ZXA6IDI1XG59O1xuY29uc3QgcGljdHVyZVByZXZpZXcgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19wcmV2aWV3YCk7XG5cbi8qKlxuICog0J7RgtC60YDRi9Cy0LDQtdGCINC/0L7Qvy3QsNC/INGBINC/0L7Qu9C90L7RjdC60YDQsNC90L3QvtC5INCy0LXRgNGB0LjQtdC5INGE0L7RgtC+0LPRgNCw0YTQuNC4XG4gKlxuICovXG5jb25zdCBvblBob3RvRWxlbWVudENsaWNrID0gKCkgPT4ge1xuICBib2R5RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtb2RhbC1vcGVuYCk7XG4gIGJpZ1Bob3RvLmNsYXNzTGlzdC5yZW1vdmUoYGhpZGRlbmApO1xuICBiaWdQaG90b0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb25CaWdQaG90b0Nsb3NlQ2xpY2spO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBrZXlkb3duYCwgb25CaWdQaG90b0VzY1ByZXNzKTtcbn07XG5cbi8qKlxuICog0JfQsNC60YDRi9Cy0LDQtdGCINC/0L7Qvy3QsNC/INGBINC/0L7Qu9C90L7RjdC60YDQsNC90L3QvtC5INCy0LXRgNGB0LjQtdC5INGE0L7RgtC+0LPRgNCw0YTQuNC4XG4gKlxuICovXG5jb25zdCBvbkJpZ1Bob3RvQ2xvc2VDbGljayA9ICgpID0+IHtcbiAgYm9keUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbW9kYWwtb3BlbmApO1xuICBiaWdQaG90by5jbGFzc0xpc3QuYWRkKGBoaWRkZW5gKTtcbiAgYmlnUGhvdG9DbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uQmlnUGhvdG9DbG9zZUNsaWNrKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIG9uQmlnUGhvdG9Fc2NQcmVzcyk7XG59O1xuXG4vKipcbiAqINCX0LDQutGA0YvQstCw0LXRgiDQv9C+0L8t0LDQvyDRgSDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90L7QuSDQstC10YDRgdC40LXQuSDRhNC+0YLQvtCz0YDQsNGE0LjQuCDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCBFU0NcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAqL1xuY29uc3Qgb25CaWdQaG90b0VzY1ByZXNzID0gKGV2dCkgPT4ge1xuICBpZiAoZXZ0LmtleUNvZGUgPT09IGVzY0tleUNvZGUpIHtcbiAgICBvbkJpZ1Bob3RvQ2xvc2VDbGljaygpO1xuICB9XG59O1xuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCIERPTS3RjdC70LXQvNC10L3RgiBg0KTQvtGC0L7Qs9GA0LDRhNC40Y9gLCDRgdC+0LfQtNCw0L3QvdGL0Lkg0L3QsCDQvtGB0L3QvtCy0LUg0L7QsdGK0LXQutGC0LAgUGhvdG9cbiAqXG4gKiBAcGFyYW0ge1Bob3RvfSBwaG90b0RhdGFcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmNvbnN0IGNyZWF0ZVBob3RvRWxlbWVudCA9IChwaG90b0RhdGEpID0+IHtcbiAgY29uc3QgcGhvdG9FbGVtZW50ID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICBjb25zdCBwaG90b0VsZW1lbnRTb3VyY2UgPSBwaG90b0VsZW1lbnQucXVlcnlTZWxlY3RvcihgLnBpY3R1cmVfX2ltZ2ApO1xuICBjb25zdCBwaG90b0VsZW1lbnRDb21tZW50cyA9IHBob3RvRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAucGljdHVyZV9fc3RhdC0tY29tbWVudHNgKTtcbiAgY29uc3QgcGhvdG9FbGVtZW50TGlrZXMgPSBwaG90b0VsZW1lbnQucXVlcnlTZWxlY3RvcihgLnBpY3R1cmVfX3N0YXQtLWxpa2VzYCk7XG5cbiAgcGhvdG9FbGVtZW50U291cmNlLnNyYyA9IHBob3RvRGF0YS51cmw7XG4gIHBob3RvRWxlbWVudENvbW1lbnRzLnRleHRDb250ZW50ID0gcGhvdG9EYXRhLmNvbW1lbnRzLmxlbmd0aDtcbiAgcGhvdG9FbGVtZW50TGlrZXMudGV4dENvbnRlbnQgPSBwaG90b0RhdGEubGlrZXM7XG5cbiAgLy8g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAgRE9NLdGN0LvQtdC80LXQvdGCIGDQpNC+0YLQvtCz0YDQsNGE0LjRj2Ag0L7RgtC60YDRi9Cy0LDQtdGC0YHRjyDQtdCz0L4g0L/QvtC70L3QvtGN0LrRgNCw0L3QvdCw0Y8g0LLQtdGA0YHQuNGPXG4gIHBob3RvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsICgpID0+IHtcbiAgICBvblBob3RvRWxlbWVudENsaWNrKCk7XG4gICAgZmlsbEJpZ1Bob3RvKHBob3RvRGF0YSk7XG4gIH0pO1xuXG4gIHJldHVybiBwaG90b0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqINCe0YLQvtCx0YDQsNC20LDQtdGCIERPTS3RjdC70LXQvNC10L3RgtGLIGDQpNC+0YLQvtCz0YDQsNGE0LjRj2AsINGB0L7Qt9C00LDQvdC90YvQuSDQvdCwINC+0YHQvdC+0LLQtSDQvNCw0YHRgdC40LLQsCDQvtCx0YrQtdC60YLQvtCyIFBob3RvLFxuICog0L3QsCDRgdGC0YDQsNC90LjRhtC1XG4gKlxuICogQHBhcmFtIHtBcnJheS48UGhvdG8+fSBwaG90b0RhdGFBcnJheVxuICovXG5jb25zdCByZW5kZXJQaG90b3MgPSAocGhvdG9EYXRhQXJyYXkpID0+IHtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIHBob3RvRGF0YUFycmF5LmZvckVhY2goKHZhbHVlKSA9PiBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVQaG90b0VsZW1lbnQodmFsdWUpKSk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbn07XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YjQsNCx0LvQvtC9IERPTS3RjdC70LXQvNC10L3RgtCwINC00LvRjyDQutC+0LzQvNC10L3RgtCw0YDQuNGPIGNvbW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBjcmVhdGVDb21tZW50VGVtcGxhdGUgPSAoY29tbWVudCkgPT5cbiAgYDxsaSBjbGFzcz1cInNvY2lhbF9fY29tbWVudCBzb2NpYWxfX2NvbW1lbnQtLXRleHRcIj5cbiAgPGltZyBjbGFzcz1cInNvY2lhbF9fcGljdHVyZVwiIHNyYz1cImltZy9hdmF0YXItJHt1dGlsLmdldFJhbmRvbU51bWJlcigxLCA2KX0uc3ZnXCJcbiAgYWx0PVwi0JDQstCw0YLQsNGAINC60L7QvNC80LXQvdGC0LDRgtC+0YDQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuFwiIHdpZHRoPVwiMzVcIiBoZWlnaHQ9XCIzNVwiPiR7Y29tbWVudH08L2xpPmA7XG5cbi8qKlxuICog0J3QsNC/0L7Qu9C90Y/QtdGCIERPTS3RjdC70LXQvNC10L3RgiBg0KTQvtGC0L7Qs9GA0LDRhNC40Y8g0LIg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdC+0Lwg0YDQtdC20LjQvNC1YCDQtNCw0L3QvdGL0LzQuCDQvtCx0YrQtdC60YLQsCBwaG90b0RhdGFcbiAqXG4gKiBAcGFyYW0ge1Bob3RvfSBwaG90b0RhdGFcbiAqL1xuY29uc3QgZmlsbEJpZ1Bob3RvID0gKHBob3RvRGF0YSkgPT4ge1xuICBiaWdQaG90b0NvbW1lbnRzQ291bnQuY2xhc3NMaXN0LmFkZChgdmlzdWFsbHktaGlkZGVuYCk7XG4gIGJpZ1Bob3RvQ29tbWVudHNMb2FkLmNsYXNzTGlzdC5hZGQoYHZpc3VhbGx5LWhpZGRlbmApO1xuXG4gIGJpZ1Bob3RvSW1hZ2Uuc3JjID0gcGhvdG9EYXRhLnVybDtcbiAgYmlnUGhvdG9DYXB0aW9uLnRleHRDb250ZW50ID0gcGhvdG9EYXRhLmRlc2NyaXB0aW9uO1xuICBiaWdQaG90b0xpa2VzLnRleHRDb250ZW50ID0gcGhvdG9EYXRhLmxpa2VzO1xuXG4gIGJpZ1Bob3RvQ29tbWVudHNDb3VudC5jbGFzc0xpc3QuYWRkKGB2aXN1YWxseS1oaWRkZW5gKTtcbiAgYmlnUGhvdG9Db21tZW50c0xvYWQuY2xhc3NMaXN0LmFkZChgdmlzdWFsbHktaGlkZGVuYCk7XG5cbiAgdXRpbC5yZW1vdmVDaGlsZHJlbihiaWdQaG90b0NvbW1lbnRzQmxvY2spO1xuXG4gIGNvbnN0IGNvbW1lbnRzQmxvY2tFbGVtZW50cyA9IHBob3RvRGF0YS5jb21tZW50cy5tYXAoKHZhbHVlKSA9PiBjcmVhdGVDb21tZW50VGVtcGxhdGUodmFsdWUpKTtcblxuICBiaWdQaG90b0NvbW1lbnRzQmxvY2suaW5zZXJ0QWRqYWNlbnRIVE1MKGBhZnRlcmJlZ2luYCwgY29tbWVudHNCbG9ja0VsZW1lbnRzLmpvaW4oYGApKTtcbn07XG5cbmNvbnN0IHBob3RvcyA9IGRhdGEuaW5pdCgpO1xuXG5yZW5kZXJQaG90b3MocGhvdG9zKTtcblxuLy8g0JfQsNCz0YDRg9C30LrQsCDQuNC30L7QsdGA0LDQttC10L3QuNGPINC4INGE0L7RgNC80Ysg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuXG4vKipcbiAqINCe0YLQutGA0YvQstCw0LXRgiDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0YTQvtGC0L7Qs9GA0LDRhNC40LgsXG4gKiDQtNC+0LHQsNCy0LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxuICpcbiAqL1xuY29uc3Qgb25VcGxvYWRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgYm9keUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbW9kYWwtb3BlbmApO1xuICBlZGl0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKGBoaWRkZW5gKTtcbiAgZWRpdEZvcm1DbG9zZS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uRWRpdEZvcm1DbG9zZUNsaWNrKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIG9uRWRpdEZvcm1Fc2NQcmVzcyk7XG4gIGFjdGl2YXRlUmVzaXplUGljdHVyZSgpO1xuICBhY3RpdmF0ZUVmZmVjdHNQaWN0dXJlKCk7XG59O1xuXG4vKipcbiAqINCX0LDQutGA0YvQstCw0LXRgiDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0YTQvtGC0L7Qs9GA0LDRhNC40LgsXG4gKiDRg9C00LDQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5INGBINC90LXQtNC+0YHRgtGD0L/QvdGL0YUg0LHQvtC70LXQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAqXG4gKi9cbmNvbnN0IG9uRWRpdEZvcm1DbG9zZUNsaWNrID0gKCkgPT4ge1xuICB1cGxvYWRCdXR0b24udmFsdWUgPSBgYDtcbiAgYm9keUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbW9kYWwtb3BlbmApO1xuICBlZGl0Rm9ybS5jbGFzc0xpc3QuYWRkKGBoaWRkZW5gKTtcbiAgZWRpdEZvcm1DbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uRWRpdEZvcm1DbG9zZUNsaWNrKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihga2V5ZG93bmAsIG9uRWRpdEZvcm1Fc2NQcmVzcyk7XG4gIGRlYWN0aXZhdGVSZXNpemVQaWN0dXJlKCk7XG4gIGRlYWN0aXZhdGVFZmZlY3RzUGljdHVyZSgpO1xufTtcblxuLyoqXG4gKiDQl9Cw0LrRgNGL0LLQsNC10YIg0YTQvtGA0LzRgyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINGE0L7RgtC+0LPRgNCw0YTQuNC4INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwIEVTQ1xuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICovXG5jb25zdCBvbkVkaXRGb3JtRXNjUHJlc3MgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQua2V5Q29kZSA9PT0gZXNjS2V5Q29kZSkge1xuICAgIG9uRWRpdEZvcm1DbG9zZUNsaWNrKCk7XG4gIH1cbn07XG5cbnVwbG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCBvblVwbG9hZEJ1dHRvbkNsaWNrKTtcblxuLy8g0JzQsNGB0YjRgtCw0LHQuNGA0L7QstCw0L3QuNC1INC40LfQvtCx0YDQsNC20LXQvdC40Y9cblxuLyoqXG4gKiDQl9Cw0L/QuNGB0YvQstCw0LXRgiDQvdC+0LLRi9C5INC80LDRgdGI0YLQsNCxINC40LfQvtCx0YDQsNC20LXQvdC40Y8gc2l6ZSDQsiDQv9C+0LvQtSByZXNpemVWYWx1ZVxuICog0Lwg0LzQsNGB0YjRgtCw0LHQuNGA0YPQtdGCINC40LfQvtCx0YDQsNC20LXQvdC40LUgcGljdHVyZVByZXZpZXcg0L3QsCDQstC10LvQuNGH0LjQvdGDIHNpemVcbiAqINGH0LXRgNC10Lcg0LfQsNC00LDQvdC40LUg0LXQvNGDINGB0YLQuNC70Y8gYHRyYW5zZm9ybTogc2NhbGUoc2l6ZSAvIDEwMClgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemVcbiAqL1xuY29uc3Qgc2V0UGljdHVyZVNpemUgPSAoc2l6ZSkgPT4ge1xuICByZXNpemVWYWx1ZS52YWx1ZSA9IGAke3NpemV9JWA7XG4gIHBpY3R1cmVQcmV2aWV3LnN0eWxlID0gYHRyYW5zZm9ybTogc2NhbGUoJHtzaXplIC8gMTAwfSlgO1xuICBQaWN0dXJlU2l6ZS5jdXJyZW50ID0gc2l6ZTtcbn07XG5cbi8qKlxuICog0KPQvNC10L3RjNGI0LDQtdGCINC80LDRgdGI0YLQsNCxINC40LfQvtCx0YDQsNC20LXQvdC40Y8g0L3QsCDQstC10LvQuNGH0LjQvdGDIFBpY3R1cmVTaXplLnN0ZXBcbiAqINC4INC30LDQv9C40YHRi9Cy0LDQtdGCINC90L7QstGL0Lkg0LzQsNGB0YjRgtCw0LEg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQsiDQv9C+0LvQtSByZXNpemVWYWx1ZVxuICpcbiAqL1xuY29uc3Qgb25SZXNpemVNaW51c0NsaWNrID0gKCkgPT4ge1xuICBpZiAoUGljdHVyZVNpemUuY3VycmVudCA+IFBpY3R1cmVTaXplLm1pbikge1xuICAgIGNvbnN0IG5ld1NpemUgPSBQaWN0dXJlU2l6ZS5jdXJyZW50IC0gUGljdHVyZVNpemUuc3RlcDtcbiAgICBzZXRQaWN0dXJlU2l6ZShuZXdTaXplKTtcbiAgfVxufTtcblxuLyoqXG4gKiDQo9Cy0LXQu9C40YfQuNCy0LDQtdGCINC80LDRgdGI0YLQsNCxINC40LfQvtCx0YDQsNC20LXQvdC40Y8g0L3QsCDQstC10LvQuNGH0LjQvdGDIFBpY3R1cmVTaXplLnN0ZXBcbiAqINC4INC30LDQv9C40YHRi9Cy0LDQtdGCINC90L7QstGL0Lkg0LzQsNGB0YjRgtCw0LEg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQsiDQv9C+0LvQtSByZXNpemVWYWx1ZVxuICpcbiAqL1xuY29uc3Qgb25SZXNpemVQbHVzQ2xpY2sgPSAoKSA9PiB7XG4gIGlmIChQaWN0dXJlU2l6ZS5jdXJyZW50IDwgUGljdHVyZVNpemUubWF4KSB7XG4gICAgY29uc3QgbmV3U2l6ZSA9IFBpY3R1cmVTaXplLmN1cnJlbnQgKyBQaWN0dXJlU2l6ZS5zdGVwO1xuICAgIHNldFBpY3R1cmVTaXplKG5ld1NpemUpO1xuICB9XG59O1xuXG4vKipcbiAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC80LDRgdGI0YLQsNCxIFBpY3R1cmVTaXplLmRlZmF1bHQg0LfQsNCz0YDRg9C20LXQvdC90L7QvNGDINC40LfQvtCx0YDQsNC20LXQvdC40Y5cbiAqINC4INC00L7QsdCw0LLQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INC90LAg0LrQvdC+0L/QutC4INC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjyDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gKlxuICovXG5jb25zdCBhY3RpdmF0ZVJlc2l6ZVBpY3R1cmUgPSAoKSA9PiB7XG4gIHNldFBpY3R1cmVTaXplKFBpY3R1cmVTaXplLmRlZmF1bHQpO1xuICByZXNpemVNaW51cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uUmVzaXplTWludXNDbGljayk7XG4gIHJlc2l6ZVBsdXMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBvblJlc2l6ZVBsdXNDbGljayk7XG59O1xuXG4vKipcbiAqINCj0LTQsNC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YEg0LrQvdC+0L/QvtC6INC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjyDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gKlxuICovXG5jb25zdCBkZWFjdGl2YXRlUmVzaXplUGljdHVyZSA9ICgpID0+IHtcbiAgcmVzaXplTWludXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBvblJlc2l6ZU1pbnVzQ2xpY2spO1xuICByZXNpemVQbHVzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb25SZXNpemVQbHVzQ2xpY2spO1xufTtcblxuLy8g0J/RgNC40LzQtdC90LXQvdC40LUg0Y3RhNGE0LXQutGC0LAg0LTQu9GPINC40LfQvtCx0YDQsNC20LXQvdC40Y9cbmNvbnN0IHNjYWxlUGFuZWwgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5zY2FsZWApO1xuY29uc3Qgc2NhbGVQaW4gPSBzY2FsZVBhbmVsLnF1ZXJ5U2VsZWN0b3IoYC5zY2FsZV9fcGluYCk7XG5jb25zdCBzY2FsZUxldmVsID0gc2NhbGVQYW5lbC5xdWVyeVNlbGVjdG9yKGAuc2NhbGVfX2xldmVsYCk7XG5jb25zdCBlZmZlY3RMZXZlbCA9IHNjYWxlUGFuZWwucXVlcnlTZWxlY3RvcihgLnNjYWxlX192YWx1ZWApO1xuY29uc3QgZWZmZWN0UGFuZWwgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5lZmZlY3RzYCk7XG5jb25zdCBlZmZlY3RUb2dnbGVzID0gZWZmZWN0UGFuZWwucXVlcnlTZWxlY3RvckFsbChgLmVmZmVjdHNfX3JhZGlvYCk7XG5jb25zdCBkZWZhdWx0RWZmZWN0ID0gZWZmZWN0UGFuZWwucXVlcnlTZWxlY3RvcihgI2VmZmVjdC1ub25lYCk7XG5jb25zdCB1cGxvYWRlZFBpY3R1cmUgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19wcmV2aWV3ID4gaW1nYCk7XG5jb25zdCBlZmZlY3RNYXhMZXZlbCA9IDEwMDtcbmxldCBjdXJyZW50UGljdHVyZUNsYXNzO1xuXG5jb25zdCBlZmZlY3RzID0ge1xuICBjaHJvbWU6IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxLFxuICAgIHNldEZpbHRlcjogKHZhbHVlKSA9PiBgZ3JheXNjYWxlKCR7dmFsdWV9KWBcbiAgfSxcbiAgc2VwaWE6IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxLFxuICAgIHNldEZpbHRlcjogKHZhbHVlKSA9PiBgc2VwaWEoJHt2YWx1ZX0pYFxuICB9LFxuICBtYXJ2aW46IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAxMDAsXG4gICAgc2V0RmlsdGVyOiAodmFsdWUpID0+IGBpbnZlcnQoJHt2YWx1ZX0lKWBcbiAgfSxcbiAgcGhvYm9zOiB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMyxcbiAgICBzZXRGaWx0ZXI6ICh2YWx1ZSkgPT4gYGJsdXIoJHt2YWx1ZX1weClgXG4gIH0sXG4gIGhlYXQ6IHtcbiAgICBtaW46IDEsXG4gICAgbWF4OiAzLFxuICAgIHNldEZpbHRlcjogKHZhbHVlKSA9PiBgYnJpZ2h0bmVzcygke3ZhbHVlfSlgXG4gIH0sXG4gIG5vbmU6IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAwLFxuICAgIHNldEZpbHRlcjogKCkgPT4gYG5vbmVgXG4gIH1cbn07XG5cbi8qKlxuICog0KHQutGA0YvQstCw0LXRgiDQv9C+0LvQt9GD0L3QvtC6IHNjYWxlINC4INGD0LTQsNC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNC5XG4gKiDRgSDQv9C40L3QsCDQv9C+0LvQt9GD0L3QutCwXG4gKlxuICovXG5jb25zdCBoaWRlU2NhbGVQYW5lbCA9ICgpID0+IHtcbiAgc2NhbGVQYW5lbC5jbGFzc0xpc3QuYWRkKGBoaWRkZW5gKTtcbiAgc2NhbGVQaW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihgbW91c2Vkb3duYCwgb25TY2FsZVBpbk1vdXNlRG93bik7XG59O1xuXG4vKipcbiAqINCf0L7QutCw0LfRi9Cy0LDQtdGCINC/0L7Qu9C30YPQvdC+0Logc2NhbGUg0Lgg0LTQvtCx0LDQstC70LvRj9C10YIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40LlcbiAqINC00LvRjyDQv9C40L3QsCDQv9C+0LvQt9GD0L3QutCwXG4gKlxuICovXG5jb25zdCBzaG93U2NhbGVQYW5lbCA9ICgpID0+IHtcbiAgaWYgKHNjYWxlUGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGBoaWRkZW5gKSkge1xuICAgIHNjYWxlUGFuZWwuY2xhc3NMaXN0LnJlbW92ZShgaGlkZGVuYCk7XG4gICAgc2NhbGVQaW4uYWRkRXZlbnRMaXN0ZW5lcihgbW91c2Vkb3duYCwgb25TY2FsZVBpbk1vdXNlRG93bik7XG4gIH1cbn07XG5cbi8qKlxuICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0LrQu9Cw0YHRgSDQt9Cw0LPRgNGD0LbQtdC90L3QvtC80YMg0LjQt9C+0LHRgNCw0LbQtdC90LjRjlxuICog0LIg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC4INGBIGVmZmVjdE5hbWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZWZmZWN0TmFtZVxuICovXG5jb25zdCBzZXRQaWN0dXJlQ2xhc3MgPSAoZWZmZWN0TmFtZSkgPT4ge1xuICBpZiAoY3VycmVudFBpY3R1cmVDbGFzcykge1xuICAgIHVwbG9hZGVkUGljdHVyZS5jbGFzc0xpc3QucmVtb3ZlKGN1cnJlbnRQaWN0dXJlQ2xhc3MpO1xuICB9XG4gIHVwbG9hZGVkUGljdHVyZS5jbGFzc0xpc3QuYWRkKGBlZmZlY3RzX19wcmV2aWV3LS0ke2VmZmVjdE5hbWV9YCk7XG4gIGN1cnJlbnRQaWN0dXJlQ2xhc3MgPSBgZWZmZWN0c19fcHJldmlldy0tJHtlZmZlY3ROYW1lfWA7XG59O1xuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC+0YLQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC90L7QtSDQsiDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Lgg0YEgZWZmZWN0TmFtZVxuICog0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8g0Y3RhNGE0LXQutGC0LBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUg0JfQvdCw0YfQtdC90LjQtSDQtNC+INC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjzog0L7RgiAwINC00L4gMTAwXG4gKiBAcGFyYW0ge3N0cmluZ30gZWZmZWN0TmFtZSDQn9GA0LjQvNC10L3QtdC90L3Ri9C5INGN0YTRhNC10LrRglxuICogQHJldHVybiB7bnVtYmVyfSDQntGC0LzQsNGB0YjRgtCw0LHQuNGA0L7QstCw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxuICovXG5jb25zdCBnZXRFZmZlY3RWYWx1ZSA9ICh2YWx1ZSwgZWZmZWN0TmFtZSkgPT4ge1xuICBjb25zdCBjdXJyZW50RWZmZWN0ID0gZWZmZWN0c1tlZmZlY3ROYW1lXTtcbiAgcmV0dXJuIGN1cnJlbnRFZmZlY3QubWluICsgdmFsdWUgKiAoY3VycmVudEVmZmVjdC5tYXggLSBjdXJyZW50RWZmZWN0Lm1pbikgLyBlZmZlY3RNYXhMZXZlbDtcbn07XG5cbi8qKlxuICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHRgtC40LvRjCDQtNC70Y8g0LfQsNCz0YDRg9C20LXQvdC90L7Qs9C+INC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAqINCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0LjQvNC10L3QtdC90L3QvtCz0L4g0Y3RhNGE0LXQutGC0LAgZWZmZWN0TmFtZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlZmZlY3ROYW1lXG4gKi9cbmNvbnN0IHNldFBpY3R1cmVFZmZlY3QgPSAoZWZmZWN0TmFtZSkgPT4ge1xuICBjb25zdCBlZmZlY3RWYWx1ZSA9IGdldEVmZmVjdFZhbHVlKGVmZmVjdExldmVsLnZhbHVlLCBlZmZlY3ROYW1lKTtcbiAgdXBsb2FkZWRQaWN0dXJlLnN0eWxlLmZpbHRlciA9IGVmZmVjdHNbZWZmZWN0TmFtZV0uc2V0RmlsdGVyKGVmZmVjdFZhbHVlKTtcbn07XG5cbi8qKlxuICog0J/RgNC40YHQstCw0LjQstCw0LXRgiDRg9GA0L7QstC90Y4g0Y3RhNGE0LXQutGC0LAgZWZmZWN0TGV2ZWwg0LfQvdCw0YfQtdC90LjQtSB2YWx1ZTtcbiAqINC/0LXRgNC10LzQtdGJ0LDQtdGCINC/0LjQvSDQv9C+0LvQt9GD0L3QutCwINCyINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQuCDRgSDQstC10LvQuNGH0LjQvdC+0LkgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUg0JfQvdCw0YfQtdC90LjQtSDQvtGCIDAg0LTQviAxMDBcbiAqL1xuY29uc3Qgc2V0UGluUG9zaXRpb24gPSAodmFsdWUpID0+IHtcbiAgZWZmZWN0TGV2ZWwudmFsdWUgPSB2YWx1ZTtcbiAgc2NhbGVQaW4uc3R5bGUubGVmdCA9IGAke3ZhbHVlfSVgO1xuICBzY2FsZUxldmVsLnN0eWxlLndpZHRoID0gYCR7dmFsdWV9JWA7XG59O1xuXG4vKipcbiAqINCSINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQstGL0LHRgNCw0L3QvdC+0LPQviDRjdGE0YTQtdC60YLQsCDRgdC60YDRi9Cy0LDQtdGCINC40LvQuCDQv9C+0LrQsNC30YvQstCw0LXRglxuICog0L/QvtC70LfRg9C90L7QuiBzY2FsZVBhbmVsOyDQv9C10YDQtdC00LDQtdGCINGN0YTRhNC10LrRgiDQuCDRhNGD0L3QutGG0LjRjiDQv9GA0LjQvNC10L3QtdC90LjRjyDRjdGE0YTQtdC60YLQsFxuICog0LTQu9GPINC/0LjQvdCwINC/0L7Qu9C30YPQvdC60LA7INGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC/0LjQvSDQv9C+0LvQt9GD0L3QutCwINCyINC80LDQutGB0LjQvNCw0LvRjNC90L7QtVxuICog0L/QvtC70L7QttC10L3QuNC1OyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQutC70LDRgdGBINC4INGB0YLQuNC70Ywg0L3QsCDQt9Cw0LPRgNGD0LbQtdC90L3QvtC1INC40LfQvtCx0YDQsNC20LXQvdC40LVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAqL1xuY29uc3Qgb25FZmZlY3RUb2dnbGVDbGljayA9IChldnQpID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWRFZmZlY3QgPSBldnQudGFyZ2V0O1xuICBpZiAoc2VsZWN0ZWRFZmZlY3QgPT09IGRlZmF1bHRFZmZlY3QpIHtcbiAgICBoaWRlU2NhbGVQYW5lbCgpO1xuICB9IGVsc2Uge1xuICAgIHNob3dTY2FsZVBhbmVsKCk7XG4gICAgc2V0UGluQWN0aW9uKHNlbGVjdGVkRWZmZWN0LnZhbHVlLCBzZXRQaWN0dXJlRWZmZWN0KTtcbiAgfVxuICBzZXRQaW5Qb3NpdGlvbihlZmZlY3RNYXhMZXZlbCk7XG4gIHNldFBpY3R1cmVDbGFzcyhzZWxlY3RlZEVmZmVjdC52YWx1ZSk7XG4gIHNldFBpY3R1cmVFZmZlY3Qoc2VsZWN0ZWRFZmZlY3QudmFsdWUpO1xufTtcblxuLyoqXG4gKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5INC90LAg0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70Lgg0Y3RhNGE0LXQutGC0L7QsjtcbiAqINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC60LvQsNGB0YEg0Lgg0YHRgtC40LvRjCBg0LHQtdC3INGN0YTRhNC10LrRgtC+0LJgINC30LDQs9GA0YPQttC10L3QvdC+0LzRgyDQuNC30L7QsdGA0LDQttC10L3QuNGOXG4gKiDQuCDRgdC60YDRi9Cy0LDQtdGCINC/0L7Qu9C30YPQvdC+0Logc2NhbGVQYW5lbFxuICpcbiAqL1xuY29uc3QgYWN0aXZhdGVFZmZlY3RzUGljdHVyZSA9ICgpID0+IHtcbiAgQXJyYXkuZnJvbShlZmZlY3RUb2dnbGVzKS5mb3JFYWNoKChlZmZlY3RUb2dnbGUpID0+XG4gICAgZWZmZWN0VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb25FZmZlY3RUb2dnbGVDbGljaykpO1xuICBkZWZhdWx0RWZmZWN0LmNoZWNrZWQgPSB0cnVlO1xuICBzZXRQaWN0dXJlQ2xhc3MoZGVmYXVsdEVmZmVjdC52YWx1ZSk7XG4gIHNldFBpY3R1cmVFZmZlY3QoZGVmYXVsdEVmZmVjdC52YWx1ZSk7XG4gIGhpZGVTY2FsZVBhbmVsKCk7XG59O1xuXG4vKipcbiAqINCj0LTQsNC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40Lkg0YEg0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDRjdGE0YTQtdC60YLQvtCyXG4gKlxuICovXG5jb25zdCBkZWFjdGl2YXRlRWZmZWN0c1BpY3R1cmUgPSAoKSA9PiB7XG4gIEFycmF5LmZyb20oZWZmZWN0VG9nZ2xlcykuZm9yRWFjaCgoZWZmZWN0VG9nZ2xlKSA9PlxuICAgIGVmZmVjdFRvZ2dsZS5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uRWZmZWN0VG9nZ2xlQ2xpY2spKTtcbn07XG5cbi8vINCf0LXRgNC10LzQtdGJ0LXQvdC40LUg0L/QvtC70LfRg9C90LrQsFxuY29uc3Qgc2NhbGVMaW5lID0gc2NhbGVQYW5lbC5xdWVyeVNlbGVjdG9yKGAuc2NhbGVfX2xpbmVgKTtcbmxldCBwaW47XG5cbi8qKlxuICog0J/RgNC40YHQstCw0LjQstCw0LXRgiDQv9C10YDQtdC80LXQvdC90L7QuSBwaW4g0LfQvdCw0YfQtdC90LjRjyDQv9GA0LjQvNC10L3QtdC90L3QvtCz0L4g0Y3RhNGE0LXQutGC0LBcbiAqINC4INGE0YPQvdC60YbQuNC4LCDQuNGB0L/QvtC70YzQt9GD0Y7RiNC10LnRgdGPINC/0YDQuCDQv9C10YDQtdC80LXRidC10L3QuNC4INC/0LjQvdCwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVmZmVjdFxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uXG4gKi9cbmNvbnN0IHNldFBpbkFjdGlvbiA9IChlZmZlY3QsIGFjdGlvbikgPT4ge1xuICBwaW4gPSB7XG4gICAgZWZmZWN0LFxuICAgIGFjdGlvblxuICB9O1xufTtcblxuLyoqXG4gKiDQn9C10YDQtdC80LXRidCw0LXRgiDQv9C40L0g0L/QvtC30YPQvdC60LAg0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC10LPQviDQv9C+0LvQvtC20LXQvdC40Y9cbiAqINC/0YDQuNC80LXQvdGP0LXRgiDRjdGE0YTQtdC60YLRiyDQuiDQuNC30L7QsdGA0LDQttC10L3QuNGOXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZ0XG4gKi9cbmNvbnN0IG9uU2NhbGVQaW5Nb3VzZURvd24gPSAoZXZ0KSA9PiB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBzY2FsZVdpZHRoID0gc2NhbGVMaW5lLm9mZnNldFdpZHRoO1xuXG4gIGxldCBzdGFydENvb3JkID0gZXZ0LmNsaWVudFg7XG5cbiAgc2NhbGVQaW4uc3R5bGUuY3Vyc29yID0gYG5vbmVgO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gYG5vbmVgO1xuXG4gIGNvbnN0IG9uTW91c2VNb3ZlID0gKG1vdmVFdnQpID0+IHtcbiAgICBtb3ZlRXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBzaGlmdCA9IHN0YXJ0Q29vcmQgLSBtb3ZlRXZ0LmNsaWVudFg7XG4gICAgc3RhcnRDb29yZCA9IG1vdmVFdnQuY2xpZW50WDtcblxuICAgIGxldCBjdXJyZW50Q29vcmQgPSBzY2FsZVBpbi5vZmZzZXRMZWZ0IC0gc2hpZnQ7XG5cbiAgICBpZiAoY3VycmVudENvb3JkIDwgMCkge1xuICAgICAgY3VycmVudENvb3JkID0gMDtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRDb29yZCA+IHNjYWxlV2lkdGgpIHtcbiAgICAgIGN1cnJlbnRDb29yZCA9IHNjYWxlV2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gY3VycmVudENvb3JkICogMTAwIC8gc2NhbGVXaWR0aDtcbiAgICBzZXRQaW5Qb3NpdGlvbihjdXJyZW50VmFsdWUpO1xuICAgIHBpbi5hY3Rpb24ocGluLmVmZmVjdCk7XG4gIH07XG5cbiAgY29uc3Qgb25Nb3VzZVVwID0gKHVwRXZ0KSA9PiB7XG4gICAgdXBFdnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHNjYWxlUGluLnN0eWxlLmN1cnNvciA9IGBtb3ZlYDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gYGF1dG9gO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihgbW91c2Vtb3ZlYCwgb25Nb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYG1vdXNldXBgLCBvbk1vdXNlVXApO1xuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNlbW92ZWAsIG9uTW91c2VNb3ZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgbW91c2V1cGAsIG9uTW91c2VVcCk7XG59O1xuIl19