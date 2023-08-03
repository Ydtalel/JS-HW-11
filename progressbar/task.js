// const progress = document.getElementById('progress');
// const url = 'https://students.netoservices.ru/nestjs-backend/upload';
// const form = document.getElementById('form');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', url);

//   xhr.upload.addEventListener('progress', (e) => {
//     if (e.lengthComputable) {
//       progress.value = (e.loaded / e.total);
//     }
//   });

//   xhr.addEventListener('load', () => {
//     progress.value = 1.0; 
//   });

//   xhr.addEventListener('error', () => {
//     console.error('Произошла ошибка при загрузке файла');
//   });

//   xhr.send(formData);
// });


const progress = document.getElementById('progress');
const url = 'https://students.netoservices.ru/nestjs-backend/upload';
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Произошла ошибка при загрузке файла');
    }

    progress.value = 1.0;
  } catch (error) {
    console.error(error.message);
  }
});
