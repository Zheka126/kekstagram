import * as preview from './preview';

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

export /**
 * Возвращает DOM-элемент `Фотография`, созданный на основе объекта photoData
 *
 * @param {Object} photoData
 * @return {Node}
 */
const create = (photoData) => {
  const photo = template.cloneNode(true);
  const photoSource = photo.querySelector(`.picture__img`);
  const photoComments = photo.querySelector(`.picture__stat--comments`);
  const photoLikes = photo.querySelector(`.picture__stat--likes`);

  const {url, likes, comments} = photoData;

  photoSource.src = url;
  photoComments.textContent = comments.length;
  photoLikes.textContent = likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photo.addEventListener(`click`, () => {
    preview.open(photoData);
  });

  return photo;
};
