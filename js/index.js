// import double from './example.js';

const photoAmount = 25;

const likesAmount = {
  min: 15,
  max: 200
};

const comments = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const commentsAmount = {
  min: 1,
  max: 2
};

const descriptions = [
  `Тестим новую камеру!`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`
];

const container = document.querySelector(`.pictures`);
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);
const bigPhoto = document.querySelector(`.big-picture`);
const bigPhotoImage = bigPhoto.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const bigPhotoCaption = bigPhoto.querySelector(`.social__caption`);
const bigPhotoLikes = bigPhoto.querySelector(`.likes-count`);
const bigPhotoCommentsCount = bigPhoto.querySelector(`.social__comment-count`);
const bigPhotoCommentsLoad = bigPhoto.querySelector(`.social__comment-loadmore`);
const bigPhotoCommentsBLock = bigPhoto.querySelector(`.social__comments`);
const fragment = document.createDocumentFragment();

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const getRandomArrayElement = (initialArray, needRemove = false) => {
  const randomElementIndex = getRandomNumber(0, initialArray.length - 1);
  const randomElement = initialArray[randomElementIndex];

  return needRemove ? initialArray.splice(randomElementIndex, 1) : randomElement;
};

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

const createUniqueURL = (amount) => {
  const URLNames = new Array(amount)
      .fill()
      .map((value, index) => index + 1);

  return () => `photos/${getRandomArrayElement(URLNames, true)}.jpg`;
};

const getURL = createUniqueURL(photoAmount);

const createFhotoData = () => ({
  url: getURL(),
  likes: getRandomNumber(likesAmount.min, likesAmount.max),
  comments: getRandomArray(commentsAmount.min, commentsAmount.max, comments),
  description: getRandomArrayElement(descriptions)
});

const createFhotoDataArray = (length) => new Array(length)
    .fill()
    .map(createFhotoData);

const createPhotoElement = (photoData) => {
  const photoElement = template.cloneNode(true);
  const photoElementSource = photoElement.querySelector(`.picture__img`);
  const photoElementComments = photoElement.querySelector(`.picture__stat--comments`);
  const photoElementLikes = photoElement.querySelector(`.picture__stat--likes`);

  photoElementSource.src = photoData.url;
  photoElementComments.textContent = photoData.comments.length;
  photoElementLikes.textContent = photoData.likes;

  return photoElement;
};

const renderPhotos = (photoDataArray) => {
  photoDataArray.forEach((value) => fragment.appendChild(createPhotoElement(value)));

  return container.appendChild(fragment);
};

const renderBigPhoto = (photoData) => {
  bigPhoto.classList.remove(`hidden`);
  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  bigPhotoImage.src = photoData.url;
  bigPhotoCaption.textContent = photoData.description;
  bigPhotoLikes.textContent = photoData.likes;

  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  bigPhotoCommentsBLock.innerHTML = ``;

  const commentsBlockElements = photoData.comments.map((value) =>
    `<li class="social__comment social__comment--text">
    <img class="social__picture" src="img/avatar-${getRandomNumber(1, 6)}.svg"
    alt="Аватар комментатора фотографии" width="35" height="35">${value}</li>`
  );

  bigPhotoCommentsBLock.insertAdjacentHTML(`afterbegin`, commentsBlockElements.join(``));
};

const photos = createFhotoDataArray(photoAmount);

renderPhotos(photos);

renderBigPhoto(photos[0]);
