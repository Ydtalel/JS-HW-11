const url = 'https://students.netoservices.ru/nestjs-backend/poll';
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', () => {
  if (request.readyState === request.DONE) {
    const data = JSON.parse(request.responseText);
    renderElement(parseData(data))
  }
});

request.open('GET', url);
request.send();

function parseData(dataJSON) {
  const title = dataJSON['data']['title'];
  const answersArr = dataJSON['data']['answers'];
  const id = dataJSON['id'];
  return [title, answersArr, id];
}

function renderElement(dict) {
  pollTitle.textContent = dict[0];
  pollTitle.dataset.id = dict[2];
  let arr = dict[1];
  for (let i = 0; i < arr.length; i++) {
    let button = document.createElement('button');
    button.classList.add('poll__answer');
    button.textContent = arr[i];
    button.dataset.id = i;
    pollAnswers.append(button);
  }
}

pollAnswers.addEventListener('click', (e) => {
  if (e.target.classList.contains('poll__answer')) {
    const vote = e.target.dataset.id;
    const answerID = pollTitle.dataset.id;
    const params = `vote=${answerID}&answer=${vote}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.addEventListener('load', () => {
      if (xhr.readyState === xhr.DONE) {
        const data = JSON.parse(xhr.responseText);
        displayResults(data);
      } else {
        console.error('Error:', xhr.status, xhr.statusText);
      }
    });

    xhr.addEventListener('error', () => {
      console.error('Request failed');
    });

    xhr.send(params);
  }
});

function displayResults(data) {
  const stat = data['stat'];
  const totalVotes = stat.reduce((total, answer) => total + answer.votes, 0);
  pollAnswers.innerHTML = '';

  stat.forEach((answer) => {
    const percentage = ((answer.votes / totalVotes) * 100).toFixed(2);
    const resultButton = document.createElement('button');
    resultButton.classList.add('poll_result');
    resultButton.textContent = `${answer.answer}: ${percentage}%`;
    pollAnswers.append(resultButton);
  });
}
