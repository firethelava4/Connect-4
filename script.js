const ROWS = 6;
const COLS = 7;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let currentPlayer = 'yellow'; // Yellow is the player, Red is the computer

const boardElement = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');

function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handlePlayerMove);
      boardElement.appendChild(cell);
    }
  }
}

function handlePlayerMove(event) {
  const col = event.target.dataset.col;
  const row = getAvailableRow(col);
  
  if (row === -1) return; // Column is full
  
  // Make the player's move
  board[row][col] = 'yellow';
  updateBoard();

  if (checkWinner('yellow')) {
    setTimeout(() => alert('You Win!'), 100);
    return;
  }

  // If no winner, it's the computer's turn
  currentPlayer = 'red';
  setTimeout(computerMove, 500);
}

function computerMove() {
  const availableCols = [];
  for (let col = 0; col < COLS; col++) {
    if (getAvailableRow(col) !== -1) {
      availableCols.push(col);
    }
  }

  // Random computer move
  const col = availableCols[Math.floor(Math.random() * availableCols.length)];
  const row = getAvailableRow(col);

  if (row === -1) return; // Column is full

  board[row][col] = 'red';
  updateBoard();

  if (checkWinner('red')) {
    setTimeout(() => alert('Computer Wins!'), 100);
    return;
  }

  currentPlayer = 'yellow';
}

function getAvailableRow(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      return row;
    }
  }
  return -1;
}

function updateBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const player = board[row][col];
    
    cell.classList.remove('yellow', 'red');
    if (player) {
      cell.classList.add(player);
    }
  });
}

function checkWinner(player) {
  // Check horizontal, vertical, and diagonal lines for a win
  return (
    checkHorizontal(player) ||
    checkVertical(player) ||
    checkDiagonals(player)
  );
}

function checkHorizontal(player) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkVertical(player) {
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonals(player) {
  // Check descending diagonals
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check ascending diagonals
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

function restartGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  currentPlayer = 'yellow';
  updateBoard();
}

restartBtn.addEventListener('click', restartGame);

createBoard();
