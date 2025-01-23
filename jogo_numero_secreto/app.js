let numerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

exibirMensagemInicial();

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Selecione um número entre 1 e 10');
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function reiniciarJogo() {

    exibirMensagemInicial();

    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    tentativas = 1;

    let campoInput = document.getElementsByClassName("container__input")[0];
    campoInput.value = "";
    campoInput.focus();

    let buttonReiniciar = document.getElementById("reiniciar");
    buttonReiniciar.disabled = true;
}

function verificarChute() {

    numberChute = document.getElementsByClassName("container__input")[0].value;

    if (parseInt(numberChute) === numeroSecreto) {

        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto, com ${tentativas} ${palavraTentativa}`);

        let buttonReiniciar = document.getElementById("reiniciar");
        buttonReiniciar.disabled = false;
    } else {
        if (numberChute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor do que: ${numberChute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior do que: ${numberChute}`);
        }
        tentativas++;

        let campoInput = document.getElementsByClassName("container__input")[0];
        campoInput.value = "";
        campoInput.focus();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosGerados = numerosSorteados.length;

    if (quantidadeDeNumerosGerados === numeroLimite) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroGerado);
        return numeroGerado;
    }

}