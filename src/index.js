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

    const url = `https://dinoipsum.com/api/?format=json`;
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
  document.querySelector('p').innerText = dinos[0][0];
}

function printError(error) {
  document.querySelector('p').innerText = `Error: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

getDinoIpsum();

// function handleTriangleForm() {
//   event.preventDefault();
// }

// window.addEventListener("load", function() {
//   document.querySelector("#triangle-checker-form").addEventListener("submit", handleTriangleForm);
//   this.document.querySelector("#rectangle-area-form").addEventListener("submit", handleRectangleForm);
// });