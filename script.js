let numeroDeCartas = prompt("Selecione o numero de cartas");

let board = document.querySelector(".scene");

let deck = [];

let imagens = ["1", "2", "3", "4", "5", "6", "7"];

let contadorDeJogadas = 0;

let acertos= 0;

while (numeroDeCartas % 2 !== 0 || numeroDeCartas < 4 || numeroDeCartas > 14) {
  numeroDeCartas = prompt(
    "Número inválido. Selecione um número par entre 4 e 14"
  );
}



criarDeckEmbaralhável();

createCards();
createCards();

function createCards() {
  for (let i = 0; i < numeroDeCartas / 2; i++) {
    cartaAleatoria = deck[i];
    board.innerHTML =
      board.innerHTML +
      `<div class="card" data-image="${cartaAleatoria}">
      <div class="card__face card__face--back" > 
      <img src="/imagens/${cartaAleatoria}.gif" alt=""></div>
      <div class="card__face card__face--front">
      <img src="/imagens/back.png" alt=""></div></div>
      </div>`;
  }
}

shuffleArray(deck);

function shuffleArray(array) {
  return Math.random() - 0.5;
}

function criarDeckEmbaralhável() {
  for (let i = 0; i < numeroDeCartas / 2; i++) {
    deck.push(imagens[i]);
  }
}

const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;

let firstCard, secondCard;

function virarCartas() {
  this.classList.add("is-flipped");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    contadorDeJogadas += 1;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    contadorDeJogadas +=1;
    compararCartas()
  }
}

function compararCartas(){
let tempVar1 = firstCard.dataset.image;
let tempVar2 = secondCard.dataset.image;
if (tempVar1 === tempVar2) {
  firstCard.removeEventListener("click", virarCartas);
  secondCard.removeEventListener("click", virarCartas);
  acertos +=1;
  setTimeout(() => {
  (verificarVitoria())},1000)
} else {
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
  }, 1000);
}
}

function verificarVitoria(){
  if (acertos === (numeroDeCartas / 2)){
    alert(`Você ganhou em ${contadorDeJogadas} jogadas!`)
  }
}


cards.forEach((card) => card.addEventListener("click", virarCartas));
