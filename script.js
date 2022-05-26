let dados = [
            {
                nome: 'Jonas',
                senha: '1234',
                cargo: 'funcionario'
            },
            {
                nome: 'JonasVas',
                senha: '123456',
                cargo: 'adm'
            },
            {
              nome: 'Tuanny',
              senha: '1234',
              cargo: 'funcionario'
            }

]

const getDados = (name) => JSON.parse(localStorage.getItem(name)) ?? []
const setDados = (name, obj) => localStorage.setItem(name, JSON.stringify(obj))

setDados('dados', dados)

const resetData = () => {
  window.localStorage.clear();
}
const inputFields = document.querySelectorAll('input');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnlogout');
const mainTables = document.getElementsByClassName('container');

const erro = document.getElementById('erro');

inputFields.forEach(function(inputItem){
  inputItem.addEventListener('input', function() {
    if (passwordInput.value.length > 3 & loginInput.value.length > 3) {
      btnLogin.classList.remove('disabled');
    } else {
      btnLogin.classList.add('disabled');
    }
  });
});

function validation() {
  let flag = false;
  for (let i = 0; i < dados.length; i += 1) {
    if (loginInput.value === dados[i].nome && passwordInput.value === dados[i].senha){
      flag = true;
      resetData()
      localStorage.setItem('garcom', dados[i].nome);
      open('./tables.html', target = '_self')
      break;
    }
  }
  if (flag === false){
    var e = new Error('Could not parse input');
    throw e;
  }
};

btnLogin.addEventListener('click', validation);
window.addEventListener('keydown', function (event) {
  if (event.defaultPrevented) {
    return; 
  }
  switch (event.key) {
    case "Enter":
      validation();
      break;
    default:
      return; 
  }
  event.preventDefault();
}, true);
