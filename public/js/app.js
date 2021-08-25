console.log('Client JavaScript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('.msgOne');
const msg2 = document.querySelector('.msgTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    fetch('http://localhost:3000/weather?address='+location)
    .then(res => res.json())
    .then(data => {
       if(data.error) {
           msg1.innerHTML = data.error;
           msg2.innerHTML = '';
           return console.log(data.error)
       } else {
           msg1.innerHTML = data.forecast;
           msg2.innerHTML = data.location;
       }
    });

})