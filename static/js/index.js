const firebaseConfig = {
    apiKey: "AIzaSyDAtZRFZXt-1H_trwymC6IUE1RbK_VzInE",
    authDomain: "jogodavelhaonline-bbc8e.firebaseapp.com",
    databaseURL: "https://jogodavelhaonline-bbc8e-default-rtdb.firebaseio.com",
    projectId: "jogodavelhaonline-bbc8e",
    storageBucket: "jogodavelhaonline-bbc8e.appspot.com",
    messagingSenderId: "139484916596",
    appId: "1:139484916596:web:63b109b1d2ad630e0ada21",
    measurementId: "G-WG1HKRVJ08"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById('result').innerText = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
    } else if (isBoardFull()) {
        document.getElementById('result').innerText = 'Empate! O jogo terminou.';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return !gameBoard.includes('');
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('result').innerText = '';
    
    const cells = document.getElementById('board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

// Dynamically create the game board cells
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
}