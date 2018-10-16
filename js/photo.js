import * as preview from './preview';

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

const COMMENT_LENGTH_MAX = 140;

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

  // Для корректного отображения разбивает слишком длинные комментарии,
  // предоставленные сервером
  const [description, ...userComments] = comments.reduce((acc, comment) =>
    (comment.length > COMMENT_LENGTH_MAX ?
      [...acc, ...comment.split(`. `)] :
      [...acc, comment]),
  []);

  photoSource.src = url;
  photoComments.textContent = userComments.length;
  photoLikes.textContent = likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photo.addEventListener(`click`, () => {
    preview.open({url, likes, description, userComments});
  });

  return photo;
};
