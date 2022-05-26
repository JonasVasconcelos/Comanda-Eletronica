const today = new Date();
const date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
const mesaCurrent = localStorage.getItem('mesa')
const garcomCurrent = localStorage.getItem('garcom')

const btnProx = document.getElementsByClassName('pedidosProx')

const dataComanda = document.getElementById('data');
const mesaComanda = document.getElementById('mesa');
const garcomComanda = document.getElementById('garcom');

const totalDaConta = document.getElementById('totalDaConta');

const getDados = (name) => JSON.parse(localStorage.getItem(name)) ?? []
const setDados = (name, obj) => localStorage.setItem(name, JSON.stringify(obj))

let form = document.querySelector('form');

dataComanda.innerHTML = date;
mesaComanda.innerHTML += mesaCurrent;
garcomComanda.innerHTML += garcomCurrent;


const menu = {
    'Brahma (600ml)': 7,
    'Brahma (1000ml)': 10,
    'Devassa (600ml)': 12,
    'Heineken (Long neck)': 9,
    'Heineken (600ml)': 15,
    'Guaraná (lata)': 4
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

function fillFormWithClientOrder() {
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

const stringficar = (string, number) => {
  let res = [];
  for (let i = 0; i < string.length; i += 1) {
    for (let j = 0; j < number[i]; j += 1) {
      res.push(string[i].repeat(1));
    }
  }
  return res
}

const enviar = () => {
  /* Como enviar para outra pessoa? */
  let orderString = stringficar(Order.consumption, Order.qnt);
  let mesaName = 'mesa' + mesaCurrent;

  let dataTable = getDados(mesaName);
  if (dataTable.length === 0) {
    setDados(mesaName, orderString); 
  } else {
    Array.prototype.push.apply(dataTable, orderString);
    setDados(mesaName, dataTable); 
  }

  let tableBusy = getDados('tableBusy');
  if (tableBusy.length === 0) {
    tableBusy.push(mesaCurrent)
    console.log(tableBusy)
    setDados('tableBusy', tableBusy); 
  } else {
    tableBusy.push(mesaCurrent);
    tableBusy = [...new Set(tableBusy)];
    setDados('tableBusy', tableBusy); 
  }
  alert('Pedido enviado com sucesso!');

}

btnProx[0].addEventListener('click', () =>{
    /* open('./Resumo.html', target = '_self') */
    fillFormWithClientOrder();
    open('./tables.html', '_self')

})

const totalUpdate = (mesaCurrent) => {
  const orders = getDados('mesa' + mesaCurrent);
  let total = 0;
  for(i in orders) {
    total += menu[orders[i]]
  }
  return total.toFixed(2); 
}

totalDaConta.innerHTML = `Total: R$ ${totalUpdate(mesaCurrent)}`
