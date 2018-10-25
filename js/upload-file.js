export default
/**
 * Читает содержимое файла file и вызывает коллбэк cb
 * с результатом чтения содержимого файла в виде
 * URL, представляющего файл, закодированый в base64 строку
 *
 * @param {File} file
 * @param {Array<String>} fileTypes возможные типы файла
 * @param {Function} cb
 */
(file, fileTypes, cb) => {
  if (file) {
    const fileName = file.name.toLowerCase();

    const matches = fileTypes.some((fileType) => fileName.endsWith(fileType));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        cb(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }
};
