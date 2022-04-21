const boxes = document.querySelectorAll('.box');
const title = document.querySelector('#title');
const winPrompt = document.querySelector('#winprompt');
const restartBtn = document.querySelector('#restart');

const spaces = [];
const tick_circle = 'O';
const tick_x = 'X';
let currentPlayer = tick_circle;

const drawBoard = () => {
    boxes.forEach((box, i) => {
        let styleString = '';
        if (i < 3) {
            styleString += 'border-bottom: 3px solid var;';
        }
        if (i % 3 === 0) {
            styleString += 'border-right: 3px solid var;';
        }
        if (i % 3 === 2) {
            styleString += 'border-left: 3px solid var;';
        }
        if (i > 5) {
            styleString += 'border-top: 3px solid var;';
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
};

const boxClicked = (e) => {
    const id = e.target.id;
    console.log(e);
    if (!spaces[id]) {
        console.log(spaces[id]);
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerWon()) {
            restart();
            return;
        }

        if (playerDraw()) {
            return;
        }
        currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
    }
};

const playerWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins on the top row!`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins on the left column!`;
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins diagonally!`;
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins on the right column!`;
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins on the bottom row!`;
            return true;
        }
    }
    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins vertically in the middle!`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins horizontally in the middle!`;
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            winPrompt.innerText = `${currentPlayer} wins diagonally!`;
            return true;
        }
    }
};

const playerDraw = () => {
    let draw = 0;
    spaces.forEach((space, i) => {
        if (spaces[i] !== null) draw++;
    });
    if (draw === 9) {
        title.innerText = `Draw`;
        restart();
    }
};

const restart = () => {
    setTimeout(() => {
        spaces.forEach((space, i) => {
            spaces[i] = null;
        });
        boxes.forEach((box) => {
            box.innerText = '';
        });
        title.innerText = `Tic-Tac-Toe`;
    }, 1000);
};
restartBtn.addEventListener('click', restart);
restart();
drawBoard();
