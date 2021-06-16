class Game {
    constructor() {
        console.log('he creado una instancia del juego')
        this.board = new Board(this.handleClicks.bind(this))
    }

    isXturn = true
    
    // executed by Board but "this" is bind to Game
    handleClicks(index) {
        if (this.board.tiles[index]) return;
        this.board.tiles[index] = this.getTurn()
        this.isXturn = !this.isXturn;
        this.updateHeader(`Ahora es turno de ${this.getTurn()}`);
        this.board.renderBoard();
        const winner = this.board.getWinner(); // undefined, 'o', 'x'
        const isDraw = this.board.allTilesFilled();
        if(winner) {
            this.updateHeader(`${winner.toUpperCase()} ha ganado el juego`);
            this.toggleRestart(true);
        } else if (isDraw) {
            this.updateHeader('Ups! buen juego pero fue un empate!');
            this.toggleRestart(true)
        }
    }

    toggleRestart(visibility = false) {
        const buttonRestartElement = document.querySelector('button.restart');
        buttonRestartElement.style.display = visibility ? 'block' : 'none';
    }

    getTurn() {
        return this.isXturn ? 'x' : 'o';
    }

    updateHeader(text = '') {
        const headerElement = document.querySelector('.interface h1')
        headerElement.innerText = text;
    }
    
    startGame() {
        console.log('juego iniciado...')
        this.toggleRestart(false);
        const initMessage = `Bienvenidos a Tic Tac Toe, inicia el juego ${this.getTurn()}`
        this.updateHeader(initMessage);
        this.board.reset();
        this.isXturn = true;
        this.board.renderBoard();
    }
}

class Board {
    constructor(externalClickHandler){
        console.log('he creado una instancia del tablero')
        this.tiles = new Array(9).fill(null);
        this.externalClickHandler = externalClickHandler
    }

    allTilesFilled() {
        return this.tiles.every(tile => tile)
    }

    reset() {
        this.tiles = new Array(9).fill(null);
    }

    handleClick(index) {
        if(typeof this.externalClickHandler === 'function') {
            this.externalClickHandler(index)
        }
    }

    getWinner() {
        const solutions = [
            [0,1,2], [3,4,5], [6,7,8], //horizontales
            [0,3,6], [1,4,7], [2,5,8], //verticales
            [0,4,8], [2,4,6], //diagonales
        ];
        let winner;
        solutions.forEach((solution) => {
            const [a,b,c] = solution;
            const value = this.tiles[a];
            const isMatch = this.tiles[a] === this.tiles[b] && this.tiles[a] === this.tiles[c];
            if (value && isMatch) {
                winner = value
            }
        })
        return winner;
    }
   
    renderBoard() {
        const boardElement = document.querySelector('.board');
        const buttons = this.tiles.map((tile, index) => {
            const button = document.createElement('button');
            const markClass = tile === 'x' ? 'mark-x' : 'mark-o';
            button.classList = `tile ${tile ? markClass : ''}`;
            button.innerText = tile;
            button.onclick = () => this.handleClick(index);
            return button;
        });
        boardElement.replaceChildren(...buttons);
    };


}

const game = new Game()
game.startGame()
console.log(game)

