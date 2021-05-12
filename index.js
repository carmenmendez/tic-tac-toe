let tiles= [];
let isXTurn = true;

const getTurn = () => isXTurn ? 'x' : 'o';

function handleClick(index) {
    if (tiles[index]) return;
    
    // ternary operator
    tiles[index] = getTurn();
    isXTurn = !isXTurn;
    updateHeader(`Ahora es turno de ${getTurn()}`);
    renderBoard();
    
    // validar al ganador
    const winner = getWinner();
    const isDraw = tiles.every((tile) => tile);
    
    if (winner) {
        updateHeader(`${winner.toUpperCase()} ha ganado el juego`);
        toggleRestart(true);
    } else if (isDraw) {
        updateHeader('Ups! buen juego pero fue un empate!');
        toggleRestart(true);
    }
}

function getWinner() {
    const solutions = [
        [0,1,2], [3,4,5], [6,7,8], //horizontales
        [0,3,6], [1,4,7], [2,5,8], //verticales
        [0,4,8], [2,4,6], //diagonales
    ];
    let winner;
    solutions.forEach((solution) => {
        const [a,b,c] = solution; // destructure assignment
        const value = tiles[a];
        const isMatch = tiles[a] === tiles[b] && tiles[a] === tiles[c];
        if (value && isMatch) {
            winner = value
        }
    })
    return winner;
}

function renderBoard() {
    const boardElement = document.querySelector('.board');
    const buttons = tiles.map((tile, index) => {
        const button = document.createElement('button');
        const markClass = tile === 'x' ? 'mark-x' : 'mark-o';
        button.classList = `tile ${tile ? markClass : ''}` ;
        button.innerText = tile;
        button.onclick = () => handleClick(index);
        return button;
    });
    boardElement.replaceChildren(...buttons);
};

function updateHeader(text) {
    const headerElement = document.querySelector('.interface h1');
    headerElement.innerText = text || `Bienvenidos a Tic Tac Toe, inicia el juego ${getTurn()}`;
}

function toggleRestart(visibility = false) {
    const buttonRestartElement = document.querySelector('button.restart');
    buttonRestartElement.style.display = visibility ? 'block' : 'none';
}

function startGame() {
    //inicializar valores
    tiles= new Array(9).fill(null);
    isXTurn = true;
    //update UI
    toggleRestart(false);
    updateHeader();
    renderBoard();
}

startGame();