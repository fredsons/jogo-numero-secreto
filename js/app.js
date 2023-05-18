
const menorValor = 1;
const maiorValor = 1000;
const numeroSecreto = gerarNumeroAleatorio();

function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * (maiorValor - menorValor + 1));
}

console.log('Número Secreto:', numeroSecreto);

const elementoChute = document.getElementById("chute");
const elementoMenorValor = document.getElementById('menor-valor');
elementoMenorValor.innerHTML = menorValor;

const elementoMaiorValor = document.getElementById('maior-valor');
elementoMaiorValor.innerHTML = maiorValor;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';
recognition.start();

recognition.addEventListener('result', onSpeak);



function onSpeak(e) {
  const chute = e.results[0][0].transcript;
  exibeChuteNaTela(chute);
}

recognition.addEventListener('end', () => recognition.start());

function exibeChuteNaTela(chute) {
  elementoChute.innerHTML = `
    <div>Você disse:</div>
    <span class="box">${chute}</span>
  `;

  verificaSeOChutePossuiUmValorValido(chute);
}


function verificaSeOChutePossuiUmValorValido(chute) {
  const numero = +chute;

  if (chuteForInvalido(numero)) {
    elementoChute.innerHTML += '<div>Valor inválido</div>';
    return;
  }

  if (numeroForMaiorOuMenorQueOValorPermitido(numero)) {
    elementoChute.innerHTML += `
      <div>Valor inválido: Informe um número entre ${menorValor} e ${maiorValor}</div>`;
    return;
  }

  if (numero === numeroSecreto) {
    document.body.innerHTML = `
      <h2>Parabéns, você acertou! </h2>
      <h3>O número secreto é ${numeroSecreto}</h3>
      <button class="btn-jogar" id="reiniciarJogo">Reiniciar jogo</button>
    `;
  } else if (numero > numeroSecreto) {
    elementoChute.innerHTML += `
      <div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>
    `;
  } else {
    elementoChute.innerHTML += `
      <div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
    `;
  }
}

function chuteForInvalido(numero) {
  return Number.isNaN(numero);
}

function numeroForMaiorOuMenorQueOValorPermitido(numero) {
  return numero > maiorValor || numero < menorValor;
}

document.body.addEventListener('click', e => {
  if (e.target.id === 'reiniciarJogo') {
    location.reload();
  }
})