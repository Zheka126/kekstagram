import * as gallery from './gallery.js';
import * as util from './util.js';

const filtersContainer = document.querySelector(`.img-filters`);
const filters = filtersContainer.querySelectorAll(`.img-filters__button`);
const DEBOUNCE_INTERVAL = 500;

let currentFilter;

/**
 * Устанавливает текущий применный фильтр
 * и добавляет ему класс для стилизации
 *
 * @param {Node} filter
 */
const setCurrentFilter = (filter) => {
  if (currentFilter) {
    currentFilter.classList.remove(`img-filters__button--active`);
  }
  filter.classList.add(`img-filters__button--active`);
  currentFilter = filter;
};

/**
 * Возвращает переданный аргумент без изменений
 *
 * @param {*} value
 * @return {*}
 */
const identity = (value) => value;

/**
 * Возвращает массив фотографий, отсортированный
 * по количеству лайков
 *
 * @param {Array.<Photo>} photos
 * @return {Array.<Photo>}
 */
const sortByLikes = (photos) =>
  photos.slice().sort((x, y) => y.likes - x.likes);

/**
 * Возвращает массив фотографий, отсортированный
 * по количеству комментариев
 *
 * @param {Array.<Photo>} photos
 * @return {Array.<Photo>}
 */
const sortByComments = (photos) =>
  photos.slice().sort((x, y) => y.comments.length - x.comments.length);

// Соответсвие выбранного фильтра функции фильтрации
const filterNameToFunction = {
  'filter-recommended': identity,
  'filter-popular': sortByLikes,
  'filter-discussed': sortByComments,
  'filter-random': util.getRandomArray
};

export /**
 * В соответвтвии с выбранным фильтром применяет
 * фильтрацию для фотографий photos и вызывает функцию updatePhotos
 * для обновления DOM-элементов `Фотография` с предотвравщением дребезга
 *
 * @param {Event} evt
 * @param {Array.<Photo>} photos
 */
const filterPhotos = (evt, photos) => {
  const appliedFilter = evt.target;

  if (appliedFilter !== currentFilter) {
    setCurrentFilter(appliedFilter);

    const filteredPhotos = filterNameToFunction[appliedFilter.id](photos);
    util.debounce(() => gallery.updatePhotos(filteredPhotos), DEBOUNCE_INTERVAL);
  }
};

export /**
 * Показывает блок с фильтрами,
 * устанавливает обработчики событий на переключатели фильтров
 *
 * @param {Array.<Photo>} photos
 */
const initialize = (photos) => {
  filtersContainer.classList.remove(`img-filters--inactive`);
  currentFilter = filters[0];
  Array.from(filters).forEach((filter) =>
    filter.addEventListener(`click`, (evt) => {
      filterPhotos(evt, photos);
    })
  );
};
