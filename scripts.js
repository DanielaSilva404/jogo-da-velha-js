/* Seleciona todos os elementos HTML que possuem o atributo data-cell */
const cellElements = document.querySelectorAll('[data-cell]'); 
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

const winningMessage = document.querySelector('[data-winning-message]');
const restartButton= document.querySelector('[data-restart-button]');

const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const jogador1Input = document.getElementById('jogador1');
const jogador2Input = document.getElementById('jogador2');
const vezJogador = document.getElementById('vez-jogador');

let nome1 = '';
let nome2 = '';
let jogadorAtual = '';

let isCircleTurn;// Inicializa a variável (evita undefined)

function iniciarJogo() {
  nome1 = jogador1Input.value.trim();
  nome2 = jogador2Input.value.trim();

  if (nome1 === '' || nome2 === '') {
    alert('Preencha os nomes dos jogadores!');
    return;
  }

  jogadorAtual = nome1;
  vezJogador.textContent = `Jogada atual: ${jogadorAtual}`;

  telaInicial.style.display = 'none';
  telaJogo.style.display = 'flex';

  startGame();
}

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () =>{ 
    isCircleTurn = false;
    for (const cell of cellElements) {
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    }

setBoardHoverClass();
winningMessage.classList.remove('show-winning-message')
};

//função para exibir a mensagem de viória ou empate
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = 'Empate!';
  } else {
    const vencedor = isCircleTurn ? nome2 : nome1;
    winningMessageTextElement.innerText = `${vencedor} venceu!`;
  }

  winningMessage.classList.add('show-winning-message');
};


//Verificando as combinações da matriz
const checkForWin = (currentPlayer) =>{
    return winningCombination.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentPlayer);
        });
    });

};

const checkForDraw = () => {
    return [...cellElements].every(cell =>{
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

const setBoardHoverClass = () => {

board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }

};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

//Mudar Símbolo
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  jogadorAtual = isCircleTurn ? nome2 : nome1;
  vezJogador.textContent = `Jogada atual: ${jogadorAtual}`;
  setBoardHoverClass();
};

/* Função que será chamada ao clicar em uma célula */
const handleClick = (e) => {

    // Colocar a marca (X ou Circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //Verificar por vitória
    const isWin = checkForWin(classToAdd); 

    //Verificar por empate
    const isDraw = checkForDraw();

     if (isWin) {
        endGame(false)
    }
    else if (isDraw){
        endGame(true);
    }
    else{
        swapTurns();
    } 
};

restartButton.addEventListener("click", startGame);

