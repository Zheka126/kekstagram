import * as preview from './preview';

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

export /**
 * Возвращает DOM-элемент `Фотография`, созданный на основе объекта Photo
 *
 * @param {Photo} photoData
 * @return {Node}
 */
const create = (photoData) => {
  const photo = template.cloneNode(true);
  const photoSource = photo.querySelector(`.picture__img`);
  const photoComments = photo.querySelector(`.picture__stat--comments`);
  const photoLikes = photo.querySelector(`.picture__stat--likes`);

  photoSource.src = photoData.url;
  photoComments.textContent = photoData.comments.length;
  photoLikes.textContent = photoData.likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photo.addEventListener(`click`, () => {
    preview.open(photoData);
  });

  return photo;
};
