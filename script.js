const ROWS = 6;
const COLS = 7;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let currentPlayer = 'yellow'; // Yellow is the player, Red is the computer

const boardElement = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');

// Function to create the board UI
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

// Handle the player's move (yellow)
function handlePlayerMove(event) {
  const col = parseInt(event.target.dataset.col, 10);
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

// Function for the computer's move (red)
function computerMove() {
  const bestMove = minimax(board, 5, -Infinity, Infinity, true); // Depth 5 for stronger AI
  const col = bestMove.col;
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

// Minimax algorithm with alpha-beta pruning
function minimax(board, depth, alpha, beta, isMaximizingPlayer) {
  const availableMoves = getAvailableMoves(board);
  if (depth === 0 || availableMoves.length === 0) {
    return { score: evaluateBoard(board), col: null };
  }

  let bestMove = { score: isMaximizingPlayer ? -Infinity : Infinity, col: null };

  for (let move of availableMoves) {
    const row = getAvailableRow(move);
    board[row][move] = isMaximizingPlayer ? 'red' : 'yellow'; // Simulate the move

    const score = minimax(board, depth - 1, alpha, beta, !isMaximizingPlayer).score;

    board[row][move] = null; // Undo the move

    if (isMaximizingPlayer) {
      if (score > bestMove.score) {
        bestMove.score = score;
        bestMove.col = move;
      }
      alpha = Math.max(alpha, bestMove.score);
    } else {
      if (score < bestMove.score) {
        bestMove.score = score;
        bestMove.col = move;
      }
      beta = Math.min(beta, bestMove.score);
    }

    if (beta <= alpha) {
      break; // Prune the branch
    }
  }

  return bestMove;
}

// Evaluate the board for scoring
function evaluateBoard(board) {
  const playerScore = calculateScore(board, 'yellow');
  const computerScore = calculateScore(board, 'red');
  return computerScore - playerScore; // Maximize computer score, minimize player score
}

// Calculate the score for rows, columns, and diagonals
function calculateScore(board, player) {
  let score = 0;
  score += scoreLines(board, player, 1, 0); // Horizontal
  score += scoreLines(board, player, 0, 1); // Vertical
  score += scoreLines(board, player, 1, 1); // Diagonal /
  score += scoreLines(board, player, 1, -1); // Diagonal \
  return score;
}

// Score individual lines (rows, columns, diagonals)
function scoreLines(board, player, dRow, dCol) {
  let score = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let lineScore = 0;
      for (let i = 0; i < 4; i++) {
        const r = row + i * dRow;
        const c = col + i * dCol;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
          if (board[r][c] === player) {
            lineScore++;
          } else if (board[r][c] !== null) {
            lineScore--;
          }
        } else {
          lineScore = -1;
          break;
        }
      }
      if (lineScore > 0) score += lineScore;
    }
  }
  return score;
}

// Get the available columns for a move
function getAvailableMoves(board) {
  const moves = [];
  for (let col = 0; col < COLS; col++) {
    if (getAvailableRow(col) !== -1) {
      moves.push(col);
    }
  }
  return moves;
}

// Get the row for the next available slot in the given column
function getAvailableRow(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      return row;
    }
  }
  return -1;
}

// Update the UI to reflect the current board state
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

// Check if a player has won
function checkWinner(player) {
  return (
    checkHorizontal(player) ||
    checkVertical(player) ||
    checkDiagonals(player)
  );
}

// Check for a horizontal win
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

// Check for a vertical win
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

// Check for diagonal wins
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

// Restart the game
function restartGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  currentPlayer = 'yellow';
  updateBoard();
}

restartBtn.addEventListener('click', restartGame);

createBoard();


