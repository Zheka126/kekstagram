
const URL = `https://js.dump.academy/kekstagram`;
const SUCCESS_STATUS = 200;
const REQUEST_TIMEOUT = 5000;

const ErrorStatus = {
  400: `Неверный запрос`,
  401: `Пользователь не авторизован`,
  404: `Ничего на найдено`,
  500: `Внутренняя ошибка сервера`
};

/**
 * Возвращает новый объект XMLHttpRequest
 *
 * @param  {function} onSuccess Коллбэк, срабатывает при при успешном выполнении запроса
 * @param  {function} onError Коллбэк, срабатывает при при неуспешном выполнении запроса
 * @return {XMLHttpRequest} Объект XMLHttpRequest
 */
const createRequest = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === SUCCESS_STATUS) {
      onSuccess(xhr.response);
    } else {
      onError(`${xhr.status}: ${ErrorStatus[xhr.status]}`);
    }
  });

  xhr.addEventListener(`error`, () =>
    onError(`Произошла ошибка соединения`));

  xhr.addEventListener(`timeout`, () =>
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`));

  xhr.timeout = REQUEST_TIMEOUT;

  return xhr;
};

export /**
 * Получает данные с сервера
 *
 * @param  {function} onSuccess Коллбэк, срабатывает при при успешном выполнении запроса
 * @param  {function} onError Коллбэк, срабатывает при при неуспешном выполнении запроса
 */
const load = (onSuccess, onError) => {
  const xhr = createRequest(onSuccess, onError);

  xhr.open(`GET`, `${URL}/data`);
  xhr.send();
};

export /**
 * Отправляет данные data на сервер
 *
 * @param  {*} data
 * @param  {function} onSuccess Коллбэк, срабатывает при при успешной отправке данных
 * @param  {function} onError Коллбэк, срабатывает при при неуспешной отправке данных
 */
const upload = (data, onSuccess, onError) => {
  const xhr = createRequest(onSuccess, onError);

  xhr.open(`POST`, URL);
  xhr.send(data);
};
