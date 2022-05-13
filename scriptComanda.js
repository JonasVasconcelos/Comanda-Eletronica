const today = new Date();
const date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
const mesaCurrent = localStorage.getItem('mesa')
const garcomCurrent = localStorage.getItem('garcom')

const btnProx = document.getElementsByClassName('pedidosProx')

const dataComanda = document.getElementById('data');
const mesaComanda = document.getElementById('mesa');
const garcomComanda = document.getElementById('garcom');

dataComanda.innerHTML = date;
mesaComanda.innerHTML += mesaCurrent;
garcomComanda.innerHTML += garcomCurrent;

let form = document.querySelector('form');
/* let brahma600 = document.getElementById('brahma600');
let brahma1000 = document.getElementById('brahma1000');
let devassa600 = document.getElementById('devassa600');
let heinekenlong = document.getElementById('heinekenlong');
let heineken600 = document.getElementById('heineken600');

let guarana = document.getElementById('guarana');
let Cocacola = document.getElementById('Coca-cola');
let agua500 = document.getElementById('agua500');
let laranjaCopo = document.getElementById('laranjaCopo');
let laranjaJarra = document.getElementById('laranjaJarra');

let queijo = document.getElementById('queijo');
let FrangoCat = document.getElementById('FrangoCat');
let queijo = document.getElementById('queijo');
let FrangoCat = document.getElementById('FrangoCat');
let queijo = document.getElementById('queijo');
let FrangoCat = document.getElementById('FrangoCat');
let queijo = document.getElementById('queijo');
let FrangoCat = document.getElementById('FrangoCat');
let queijo = document.getElementById('queijo');
let FrangoCat = document.getElementById('FrangoCat');
 */

let menu = {
    brahma600: 5,
    brahma1000: 5,
    devassa600: 5,
    heinekenlong: 5,
    heineken600: 5,
    guarana: 5
}

function createMenu(menu) {
    this.table = mesaCurrent;
    this.consumption = [];
    this.qnt = [];
    this.order = (string, number) => {
        this.consumption.push(string);
        this.qnt.push(number);
    };
    this.pay = () => {
      let sum = 0;
      for (let i = 0; i < this.consumption.length; i += 1) {
        let index = menu[this.consumption[i]];
        sum += index;
      }
      return sum;
    };
}

let Order = new createMenu(menu)
const Inputs = document.querySelectorAll('input')
const Labels = document.querySelectorAll('label')

function addPedido() {
  let N = Inputs.length;
  for(i = 0; i < N; i++) {
    if(Number(Inputs[i].value) > 0) {
      Order.order(Labels[i].innerHTML.replace(':',''), Number(Inputs[i].value));
    }
  }
}


function fillFormWithUserInfo() {
    addPedido();
    form.style.display = 'block';
    form.style.paddingTop = '10px';
    form.innerHTML = `<h2>Resumo do pedido</h2>`
    form.innerHTML += `<h3>Mesa: ${Order.table}</h3>`
    for(i = 0; i < Order.consumption.length; i++){
        form.innerHTML += `<p class='pResumo'> ${Order.qnt[i]} ${Order.consumption[i]}</p>`
    }
    
    let diV = document.createElement('div');
    diV.classList.add('divResumo');
    form.appendChild(diV);

    let btn = document.createElement('button');
    btn.classList.add('pedidosReset');
    btn.style.width = '50%';
    btn.style.color = 'white';
    btn.innerHTML = 'Apagar tudo?'
    diV.appendChild(btn);

    btn = document.createElement('button');
    btn.classList.add('pedidosProx');
    btn.setAttribute('id', 'Confirmar')
    btn.style.width = '50%';
    btn.style.color = 'white';
    btn.innerHTML = 'Confirmar?'
    diV.appendChild(btn);

    btn.addEventListener('click', enviar)
}

function enviar(Order){
    /* Como enviar para outra pessoa? */
    window.localStorage.setItem('mesa2',JSON.stringify(Order))
    alert('Pedido enviado com sucesso!')
}

btnProx[0].addEventListener('click', () =>{
    /* open('./Resumo.html', target = '_self') */
    fillFormWithUserInfo();
})