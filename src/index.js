// import Triangle from './js/triangle.js';
// import Rectangle from './js/rectangle.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getDinoIpsum() {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();

    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response);
      } else {
        reject([this, response]);
      }
    });

    const url = `https://dinoipsum.com/api/?format=json&paragraphs=1&words=1`;
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(dinos) {
    printDinos(dinos);
  }, function(error) {
    printError(error);
  });
}

function printDinos(dinos) {
  let display = '';
  for (let index = 0; index < dinos[0][0].length; index++) {
    display = display + '_ ';
  }
  document.querySelector('#display').innerText = `${display}`;
  document.querySelector('#answer').innerText = dinos[0][0];
}

function printError(error) {
  document.querySelector('p').innerText = `Error: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function evaluateGuess(guess) {
  const answer = document.querySelector('#answer').innerText.toLowerCase();
  let display = document.querySelector('#display').innerText.toLowerCase();
  display = display.split(' ');
  for (let index = 0; index < answer.length; index++) {
    const element = answer[index];
    if (element === guess) {
      display[index] = guess;
    }
  }
  return display.join(' ');
}


function handleForm() {
  event.preventDefault();
  const guess = document.querySelector('input').value;
  // let guessed = document.querySelector('#guessed').innertext;
  document.querySelector('#display').innerText = evaluateGuess(guess);
  // guessed = guessed + guess;
  // document.querySelector('#guessed').innertext = guessed;
}

window.addEventListener("load", function() {
  getDinoIpsum();
  document.querySelector("form").addEventListener("submit", function() {
    handleForm();
  });
});