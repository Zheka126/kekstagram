import * as preview from './preview';

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

export default /**
 * Формирует объект типа `Фотография` и метод для создания
 * DOM-элемент `Фотография`
 *
 * @class Photo
 */
class Photo {
  constructor({url, likes, comments, description}) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
  }

  /**
   * Возвращает DOM-элемент `Фотография`
   *
   * @memberof Photo
   * @return {Node}
   */
  create() {
    const photo = template.cloneNode(true);
    const photoSource = photo.querySelector(`.picture__img`);
    const photoComments = photo.querySelector(`.picture__stat--comments`);
    const photoLikes = photo.querySelector(`.picture__stat--likes`);

    photoSource.src = this.url;
    photoComments.textContent = this.comments.length;
    photoLikes.textContent = this.likes;

    // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
    photo.addEventListener(`click`, () => {
      preview.open(this);
    });

    return photo;
  }
}
