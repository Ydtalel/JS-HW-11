// Функция для отправки XMLHttpRequest
function sendXHR(url, formData) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        progress.value = percent / 100;
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Произошла ошибка при загрузке: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Произошла ошибка при загрузке файла'));
    });

    xhr.open('POST', url);
    xhr.send(formData);
  });
}

const progress = document.getElementById('progress');
const url = 'https://students.netoservices.ru/nestjs-backend/upload';
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await sendXHR(url, formData);
    console.log('Успех', response);
    progress.value = 1.0;
  } catch (error) {
    console.error(error.message);
  }
});
