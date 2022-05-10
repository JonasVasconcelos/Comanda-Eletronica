const today = new Date();
const date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
const mesaCurrent = localStorage.getItem('mesa')
const garcomCurrent = localStorage.getItem('garcom')

const dataComanda = document.getElementById('data');
const mesaComanda = document.getElementById('mesa');
const garcomComanda = document.getElementById('garcom');


dataComanda.innerHTML = date;
mesaComanda.innerHTML += mesaCurrent;
garcomComanda.innerHTML += garcomCurrent;