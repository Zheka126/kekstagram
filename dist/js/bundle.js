/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/backend.js":
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var URL = "https://js.dump.academy/kekstagram";
var SUCCESS_STATUS = 200;
var REQUEST_TIMEOUT = 5000;

var ErrorStatus = {
  400: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441",
  401: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D",
  404: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0430 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  500: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
};

/**
 * Возвращает новый объект XMLHttpRequest
 *
 * @param  {function} onSuccess Коллбэк, срабатывает при при успешном выполнении запроса
 * @param  {function} onError Коллбэк, срабатывает при при неуспешном выполнении запроса
 * @return {XMLHttpRequest} Объект XMLHttpRequest
 */
var createRequest = function createRequest(onSuccess, onError) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = "json";

  xhr.addEventListener("load", function () {
    if (xhr.status === SUCCESS_STATUS) {
      onSuccess(xhr.response);
    } else {
      onError(xhr.status + ": " + ErrorStatus[xhr.status]);
    }
  });

  xhr.addEventListener("error", function () {
    return onError("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F");
  });

  xhr.addEventListener("timeout", function () {
    return onError("\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u0443\u0441\u043F\u0435\u043B \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C\u0441\u044F \u0437\u0430 " + xhr.timeout + " \u043C\u0441");
  });

  xhr.timeout = REQUEST_TIMEOUT;

  return xhr;
};

/**
* Получает данные с сервера
*
* @param  {function} onSuccess Коллбэк, срабатывает при при успешном выполнении запроса
* @param  {function} onError Коллбэк, срабатывает при при неуспешном выполнении запроса
*/
var load = exports.load = function load(onSuccess, onError) {
  var xhr = createRequest(onSuccess, onError);

  xhr.open("GET", URL + "/data");
  xhr.send();
};

/**
* Отправляет данные data на сервер
*
* @param  {*} data
* @param  {function} onSuccess Коллбэк, срабатывает при при успешной отправке данных
* @param  {function} onError Коллбэк, срабатывает при при неуспешной отправке данных
*/
var upload = exports.upload = function upload(data, onSuccess, onError) {
  var xhr = createRequest(onSuccess, onError);

  xhr.open("POST", URL);
  xhr.send(data);
};

/***/ }),

/***/ "./js/effects.js":
/*!***********************!*\
  !*** ./js/effects.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalize = exports.initialize = undefined;

var _scale = __webpack_require__(/*! ./scale.js */ "./js/scale.js");

var scale = _interopRequireWildcard(_scale);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var editPanel = document.querySelector('.img-upload__overlay');
var scalePanel = editPanel.querySelector('.scale');
var effectLevel = scalePanel.querySelector('.scale__value');
var effectPanel = editPanel.querySelector('.effects');
var effectToggles = effectPanel.querySelectorAll('.effects__radio');
var defaultEffect = effectPanel.querySelector('#effect-none');
var uploadedPicture = editPanel.querySelector('.img-upload__preview > img');

var EFFECT_MAX_LEVEL = 100;

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

var currentPictureClass = void 0;

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
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / EFFECT_MAX_LEVEL;
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
    scale.hide();
  } else {
    scale.show();
    scale.setPinAction(selectedEffect.value, setPictureEffect);
  }
  scale.setPinPosition(EFFECT_MAX_LEVEL);
  setPictureClass(selectedEffect.value);
  setPictureEffect(selectedEffect.value);
};

/**
* Устанавливает обработчики событий на переключатели эффектов;
* устанавливает класс и стиль `без эффектов` загруженному изображению
* и скрывает ползунок scalePanel
*
*/
var initialize = exports.initialize = function initialize() {
  Array.from(effectToggles).forEach(function (effectToggle) {
    return effectToggle.addEventListener('click', onEffectToggleClick);
  });
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  scale.hide();
};

/**
* Удаляет обработчики событий с переключателей эффектов
*
*/
var finalize = exports.finalize = function finalize() {
  Array.from(effectToggles).forEach(function (effectToggle) {
    return effectToggle.removeEventListener('click', onEffectToggleClick);
  });
};

/***/ }),

/***/ "./js/filter.js":
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = exports.filterPhotos = undefined;

var _gallery = __webpack_require__(/*! ./gallery.js */ "./js/gallery.js");

var gallery = _interopRequireWildcard(_gallery);

var _util = __webpack_require__(/*! ./util.js */ "./js/util.js");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var filtersContainer = document.querySelector('.img-filters');
var filters = filtersContainer.querySelectorAll('.img-filters__button');
var DEBOUNCE_INTERVAL = 500;

var currentFilter = void 0;

/**
 * Устанавливает текущий применный фильтр
 * и добавляет ему класс для стилизации
 *
 * @param {Node} filter
 */
var setCurrentFilter = function setCurrentFilter(filter) {
  if (currentFilter) {
    currentFilter.classList.remove('img-filters__button--active');
  }
  filter.classList.add('img-filters__button--active');
  currentFilter = filter;
};

/**
 * Возвращает переданный аргумент без изменений
 *
 * @param {*} value
 * @return {*}
 */
var identity = function identity(value) {
  return value;
};

/**
 * Возвращает массив фотографий, отсортированный
 * по количеству лайков
 *
 * @param {Array<Object>} photos
 * @return {Array<Object>}
 */
var sortByLikes = function sortByLikes(photos) {
  return photos.slice().sort(function (x, y) {
    return y.likes - x.likes;
  });
};

/**
 * Возвращает массив фотографий, отсортированный
 * по количеству комментариев
 *
 * @param {Array<Object>} photos
 * @return {Array<Object>}
 */
var sortByComments = function sortByComments(photos) {
  return photos.slice().sort(function (x, y) {
    return y.comments.length - x.comments.length;
  });
};

// Соответсвие выбранного фильтра функции фильтрации
var filterNameToFunction = {
  'filter-recommended': identity,
  'filter-popular': sortByLikes,
  'filter-discussed': sortByComments,
  'filter-random': util.getRandomArray
};

/**
* В соответвтвии с выбранным фильтром применяет
* фильтрацию для фотографий photos и вызывает функцию updatePhotos
* для обновления DOM-элементов `Фотография` с предотвравщением дребезга
*
* @param {Event} evt
* @param {Array<Object>} photos
*/
var filterPhotos = exports.filterPhotos = function filterPhotos(evt, photos) {
  var appliedFilter = evt.target;

  if (appliedFilter !== currentFilter) {
    setCurrentFilter(appliedFilter);

    var filteredPhotos = filterNameToFunction[appliedFilter.id](photos);
    util.debounce(function () {
      return gallery.updatePhotos(filteredPhotos);
    }, DEBOUNCE_INTERVAL);
  }
};

/**
* Показывает блок с фильтрами,
* устанавливает обработчики событий на переключатели фильтров
*
* @param {Array<Object>} photos
*/
var initialize = exports.initialize = function initialize(photos) {
  filtersContainer.classList.remove('img-filters--inactive');
  currentFilter = filters[0];
  Array.from(filters).forEach(function (filter) {
    return filter.addEventListener('click', function (evt) {
      filterPhotos(evt, photos);
    });
  });
};

/***/ }),

/***/ "./js/form.js":
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = undefined;

var _util = __webpack_require__(/*! ./util.js */ "./js/util.js");

var util = _interopRequireWildcard(_util);

var _resize = __webpack_require__(/*! ./resize.js */ "./js/resize.js");

var resize = _interopRequireWildcard(_resize);

var _effects = __webpack_require__(/*! ./effects.js */ "./js/effects.js");

var effects = _interopRequireWildcard(_effects);

var _backend = __webpack_require__(/*! ./backend.js */ "./js/backend.js");

var backend = _interopRequireWildcard(_backend);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bodyElement = document.querySelector('body');
var uploadButton = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.img-upload__form');
var uploadErrorBLock = uploadForm.querySelector('.img-upload__message--error');
var uploadErrorMessage = uploadErrorBLock.querySelector('.error__message');
var editPanel = document.querySelector('.img-upload__overlay');
var editPanelClose = editPanel.querySelector('#upload-cancel');

/**
 * При успешной отправке формы очищает ее поля
 * и закрывает панель редактирования
 *
 */
var onSuccessUpload = function onSuccessUpload() {
  uploadForm.reset();
  onEditPanelCloseClick();
};

/**
 * При неуспешной отправке формы закрывает панель редактирования
 * и показывает блок с ошибкой message
 *
 * @param {string} message
 */
var onErrorUpload = function onErrorUpload(message) {
  onEditPanelCloseClick();
  uploadErrorBLock.classList.remove('hidden');
  uploadErrorMessage.textContent = message;
};

/**
 * Отменяет действия по умолчанию при отправке формы
 * и запускает функцию отправки данных на сервер
 *
 * @param {Event} evt
 */
var onUploadFormSubmit = function onUploadFormSubmit(evt) {
  backend.upload(new FormData(uploadForm), onSuccessUpload, onErrorUpload);
  evt.preventDefault();
};

/**
 * Закрывает панель редактирования фотографии,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
var onEditPanelCloseClick = function onEditPanelCloseClick() {
  uploadButton.value = '';
  bodyElement.classList.remove('modal-open');
  editPanel.classList.add('hidden');
  editPanelClose.removeEventListener('click', onEditPanelCloseClick);
  document.removeEventListener('keydown', onEditPanelEscPress);
  resize.finalize();
  effects.finalize();
};

/**
 * Закрывает панель редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
var onEditPanelEscPress = function onEditPanelEscPress(evt) {
  util.runOnEscPress(evt, onEditPanelCloseClick);
};

/**
* Открывает панель редактирования фотографии,
* добавляет обработчики событий
*
*/
var initialize = exports.initialize = function initialize() {
  bodyElement.classList.add('modal-open');
  editPanel.classList.remove('hidden');
  editPanelClose.addEventListener('click', onEditPanelCloseClick);
  document.addEventListener('keydown', onEditPanelEscPress);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  resize.initialize();
  effects.initialize();
};

/***/ }),

/***/ "./js/gallery.js":
/*!***********************!*\
  !*** ./js/gallery.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePhotos = undefined;

var _photo = __webpack_require__(/*! ./photo.js */ "./js/photo.js");

var photo = _interopRequireWildcard(_photo);

var _form = __webpack_require__(/*! ./form.js */ "./js/form.js");

var form = _interopRequireWildcard(_form);

var _backend = __webpack_require__(/*! ./backend.js */ "./js/backend.js");

var backend = _interopRequireWildcard(_backend);

var _filter = __webpack_require__(/*! ./filter.js */ "./js/filter.js");

var filter = _interopRequireWildcard(_filter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// DOM-элемент, в котором размещаются фотографии пользователей
var container = document.querySelector('.pictures');

// Форма загрузки изображения
var uploadForm = document.querySelector('.img-upload__form');

// Кнопка загрузки изображения
var uploadButton = uploadForm.querySelector('#upload-file');

// Поп-ап для вывода возможной ошибки при загрузке и его элементы
var errorPopup = document.querySelector('.error-popup');
var errorPopupClose = errorPopup.querySelector('.error-popup__cancel');
var errorPopupMessage = errorPopup.querySelector('.error-popup__message');

var POPAP_ERROR_INTERVAL = 5000;
var COMMENT_LENGTH_MAX = 140;

var photos = [];
var photoElements = [];

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов photoData,
 * на странице
 *
 * @param {Array.<Object>} photoDataArray
 */
var renderPhotos = function renderPhotos(photoDataArray) {
  var fragment = document.createDocumentFragment();
  photoElements = photoDataArray.map(function (value) {
    return photo.create(value);
  });
  photoElements.forEach(function (value) {
    return fragment.appendChild(value);
  });

  container.appendChild(fragment);
};

/**
 * Удаляет DOM-элементы `Фотография` photoElements
 *
 */
var removePhotos = function removePhotos() {
  photoElements.forEach(function (it) {
    return container.removeChild(it);
  });
};

/**
* Обновляет DOM-элементы `Фотография` после фильтрации
*
* @param {Array.<Object>} photoDataArray
*/
var updatePhotos = exports.updatePhotos = function updatePhotos(photoDataArray) {
  removePhotos();
  renderPhotos(photoDataArray);
};

/**
 * Для корректного отображения разбивает слишком длинные комментарии,
 * предоставленные сервером, на комментарии длины не более COMMENT_LENGTH_MAX
 * и возвращает новый объект photoData
 *
 * @param {Object} photoData Объект до форматирования
 * @return {Object} Объект после форматирования
 */
var formatData = function formatData(photoData) {
  var comments = photoData.comments.reduce(function (acc, comment) {
    return comment.length > COMMENT_LENGTH_MAX ? [].concat(_toConsumableArray(acc), _toConsumableArray(comment.split('. '))) : [].concat(_toConsumableArray(acc), [comment]);
  }, []);

  var url = photoData.url,
      likes = photoData.likes,
      description = photoData.description;


  return { url: url, likes: likes, comments: comments, description: description };
};

/**
 * Форматирует полученные данные и отображает их,
 * инициализирует работу фильтрации
 *
 * @param {Array.<Object>} data Загруженные с сервера данные
 */
var onSuccess = function onSuccess(data) {
  photos = data.map(function (it) {
    return formatData(it);
  });
  renderPhotos(photos);
  filter.initialize(photos);
};

/**
 * Закрывает поп-ап с сообщением об ошибке
 *
 */
var onErrorPopupCloseClick = function onErrorPopupCloseClick() {
  errorPopup.classList.add('hidden');
  errorPopupClose.removeEventListener('click', onErrorPopupCloseClick);
};

/**
 * Показывает поп-ап с сообщением об ошибке
 *
 * @param {string} message
 */
var onError = function onError(message) {
  if (errorPopup.classList.contains('hidden')) {
    errorPopup.classList.remove('hidden');
    errorPopupMessage.textContent = message;
    setTimeout(onErrorPopupCloseClick, POPAP_ERROR_INTERVAL);
    errorPopupClose.addEventListener('click', onErrorPopupCloseClick);
  }
};

/**
 * Инициализирует работу со страницей сайта
 *
 */
var initialize = function initialize() {
  // Загружает с сервера фотографии и отображает их.
  // В случае ошибки загрузки данных показывает поп-ап с описанием ошибки
  backend.load(onSuccess, onError);

  // Открывает панель редактирования фотографии при
  // нажатии на кнопку uploadButton
  uploadButton.addEventListener('change', form.initialize);
};

initialize();

/***/ }),

/***/ "./js/photo.js":
/*!*********************!*\
  !*** ./js/photo.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _preview = __webpack_require__(/*! ./preview */ "./js/preview.js");

var preview = _interopRequireWildcard(_preview);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Шаблон для фотографии пользователя
var template = document.querySelector('#picture').content.querySelector('.picture__link');

/**
* Возвращает DOM-элемент `Фотография`, созданный на основе объекта photoData
*
* @param {Object} photoData
* @return {Node}
*/
var create = exports.create = function create(photoData) {
  var photo = template.cloneNode(true);
  var photoSource = photo.querySelector('.picture__img');
  var photoComments = photo.querySelector('.picture__stat--comments');
  var photoLikes = photo.querySelector('.picture__stat--likes');

  var url = photoData.url,
      likes = photoData.likes,
      comments = photoData.comments;


  photoSource.src = url;
  photoComments.textContent = comments.length;
  photoLikes.textContent = likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photo.addEventListener('click', function () {
    preview.open(photoData);
  });

  return photo;
};

/***/ }),

/***/ "./js/preview.js":
/*!***********************!*\
  !*** ./js/preview.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = undefined;

var _util = __webpack_require__(/*! ./util */ "./js/util.js");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bodyElement = document.querySelector('body');
var preview = document.querySelector('.big-picture');
var previewClose = preview.querySelector('.cancel');
var previewImage = preview.querySelector('.big-picture__img').querySelector('img');
var previewCommentsCount = preview.querySelector('.social__comment-count');
var previewCommentsLoad = preview.querySelector('.social__comment-loadmore');
var previewCaption = preview.querySelector('.social__caption');
var previewLikes = preview.querySelector('.likes-count');
var previewCommentsBlock = preview.querySelector('.social__comments');

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
var onPreviewCloseClick = function onPreviewCloseClick() {
  bodyElement.classList.remove('modal-open');
  preview.classList.add('hidden');
  previewClose.removeEventListener('click', onPreviewCloseClick);
  document.removeEventListener('keydown', onPreviewEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
var onPreviewEscPress = function onPreviewEscPress(evt) {
  util.runOnEscPress(evt, onPreviewCloseClick);
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
 * @param {Object} photoData
 */
var fillPreview = function fillPreview(photoData) {
  previewCommentsCount.classList.add('visually-hidden');
  previewCommentsLoad.classList.add('visually-hidden');

  previewImage.src = photoData.url;
  previewCaption.textContent = photoData.description;
  previewLikes.textContent = photoData.likes;

  util.removeChildren(previewCommentsBlock);

  var commentsBlockElements = photoData.comments.map(function (value) {
    return createCommentTemplate(value);
  });

  previewCommentsBlock.insertAdjacentHTML('afterbegin', commentsBlockElements.join(''));
};

/**
* Открывает поп-ап с полноэкранной версией фотографии
*
* @param {Object} photoData
*/
var open = exports.open = function open(photoData) {
  bodyElement.classList.add('modal-open');
  preview.classList.remove('hidden');
  previewClose.addEventListener('click', onPreviewCloseClick);
  document.addEventListener('keydown', onPreviewEscPress);
  fillPreview(photoData);
};

/***/ }),

/***/ "./js/resize.js":
/*!**********************!*\
  !*** ./js/resize.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var uploadForm = document.querySelector(".img-upload__form");
var resizeMinus = uploadForm.querySelector(".resize__control--minus");
var resizePlus = uploadForm.querySelector(".resize__control--plus");
var resizeValue = uploadForm.querySelector(".resize__control--value");
var picturePreview = uploadForm.querySelector(".img-upload__preview");

var PictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

var currentPictureSize = 100;

// Масштабирование изображения
/**
 * Записывает новый масштаб изображения size в поле resizeValue
 * м масштабирует изображение picturePreview на величину size
 * через задание ему стиля `transform: scale(size / 100)`
 *
 * @param {number} size
 */
var setPictureSize = function setPictureSize(size) {
  resizeValue.value = size + "%";
  picturePreview.style = "transform: scale(" + size / 100 + ")";
  currentPictureSize = size;
};

/**
 * Уменьшает масштаб изображения на величину PictureSize.STEP
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
var onResizeMinusClick = function onResizeMinusClick() {
  if (currentPictureSize > PictureSize.MIN) {
    var newSize = currentPictureSize - PictureSize.STEP;
    setPictureSize(newSize);
  }
};

/**
 * Увеличивает масштаб изображения на величину PictureSize.STEP
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
var onResizePlusClick = function onResizePlusClick() {
  if (currentPictureSize < PictureSize.MAX) {
    var newSize = currentPictureSize + PictureSize.STEP;
    setPictureSize(newSize);
  }
};

/**
* Устанавливает масштаб PictureSize.DEFAULT загруженному изображению
* и добавляет обработчики на кнопки масштабирования изображения
*
*/
var initialize = exports.initialize = function initialize() {
  setPictureSize(PictureSize.DEFAULT);
  resizeMinus.addEventListener("click", onResizeMinusClick);
  resizePlus.addEventListener("click", onResizePlusClick);
};

/**
* Удаляет обработчики с кнопок масштабирования изображения
*
*/
var finalize = exports.finalize = function finalize() {
  resizeMinus.removeEventListener("click", onResizeMinusClick);
  resizePlus.removeEventListener("click", onResizePlusClick);
};

/***/ }),

/***/ "./js/scale.js":
/*!*********************!*\
  !*** ./js/scale.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var editPanel = document.querySelector(".img-upload__overlay");
var scalePanel = editPanel.querySelector(".scale");
var effectLevel = scalePanel.querySelector(".scale__value");
var scalePin = scalePanel.querySelector(".scale__pin");
var scaleLevel = scalePanel.querySelector(".scale__level");
var scaleLine = scalePanel.querySelector(".scale__line");
var EFFECT_MAX_LEVEL = 100;
var pin = void 0;

/**
* Скрывает ползунок scale и удаляет обработчик событий
* с пина ползунка
*
*/
var hide = exports.hide = function hide() {
  scalePanel.classList.add("hidden");
  scalePin.removeEventListener("mousedown", onScalePinMouseDown);
};

/**
* Показывает ползунок scale и добавлляет обработчик событий
* для пина ползунка
*
*/
var show = exports.show = function show() {
  if (scalePanel.classList.contains("hidden")) {
    scalePanel.classList.remove("hidden");
    scalePin.addEventListener("mousedown", onScalePinMouseDown);
  }
};

/**
* Присваивает уровню эффекта effectLevel значение value;
* перемещает пин ползунка в соответствии с величиной value
*
* @param {number} value Значение от 0 до 100
*/
var setPinPosition = exports.setPinPosition = function setPinPosition(value) {
  effectLevel.value = Math.round(value);
  scalePin.style.left = value + "%";
  scaleLevel.style.width = value + "%";
};

/**
* Присваивает переменной pin значения примененного эффекта
* и функции, используюшейся при перемещении пина
*
* @param {string} effect
* @param {function} action
*/
var setPinAction = exports.setPinAction = function setPinAction(effect, action) {
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

  scalePin.style.cursor = "none";
  document.documentElement.style.cursor = "none";

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

    var currentValue = currentCoord * EFFECT_MAX_LEVEL / scaleWidth;

    setPinPosition(currentValue);
    pin.action(pin.effect);
  };

  var onMouseUp = function onMouseUp(upEvt) {
    upEvt.preventDefault();

    scalePin.style.cursor = "move";
    document.documentElement.style.cursor = "auto";

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ESC_KEY_CODE = 27;

/**
* Возвращает целое случайное число из отрезка [min, max]
*
* @param {number} min
* @param {number} max
* @return {number}
*/
var getRandomNumber = exports.getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

/**
* Возвращает случайный элемент массива initialArray и при необходимости удаляет его из массива
*
* @param {Array}   initialArray
* @param {boolean} [needRemove=false] True - элемент удаляется из массива initialArray
* @return {*}
*/
var getRandomArrayElement = exports.getRandomArrayElement = function getRandomArrayElement(initialArray) {
  var needRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var randomElementIndex = getRandomNumber(0, initialArray.length - 1);
  var randomElement = initialArray[randomElementIndex];
  if (needRemove) {
    initialArray.splice(randomElementIndex, 1);
  }

  return randomElement;
};

/**
* Возвращает массив случайной длины из отрезка [min, max], составленный
* из уникальных случайных элементов массива initialArray
*
* @param {Array} initialArray Массив, из элементов которого формируется новый массив
* @param {number} min Минимальная возможная длина возвращаемого массива (по умолчанию = 1)
* @param {number} max Максимальная возможная длина возвращаемого массива (по умолчанию = длине массива initialArray)
* @return {Array}
*/
var getRandomArray = exports.getRandomArray = function getRandomArray(initialArray) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : initialArray.length;

  var copiedArray = initialArray.slice();
  var length = getRandomNumber(min, max);

  var iter = function iter(acc, array) {
    if (acc.length === length) {
      return acc;
    }

    var randomElement = getRandomArrayElement(array, true);
    return iter([].concat(_toConsumableArray(acc), [randomElement]), array);
  };

  return iter([], copiedArray);
};

/**
* Удаляет дочерние DOM-элементы у элемента parent
*
* @param {Node} parent
*/
var removeChildren = exports.removeChildren = function removeChildren(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

/**
* Вызывает переданную функцию action, если нажатая клавиша - Esc
*
* @param {Event} evt
* @param {function} action
*/
var runOnEscPress = exports.runOnEscPress = function runOnEscPress(evt, action) {
  if (evt.keyCode === ESC_KEY_CODE) {
    action();
  }
};

var lastTimeout = void 0;

/**
* Откладывает выполнение функции cb на время debounceInterval
* и предотвращает 'дребезг' при повтороном обращении к фукнции cb раньше,
* чем через время debounceInterval
*
* @param {function} cb Выполняемая функция
* @param {number} debounceInterval Время в мс
*/
var debounce = exports.debounce = function debounce(cb, debounceInterval) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, debounceInterval);
};

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./js/gallery.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./js/gallery.js */"./js/gallery.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map