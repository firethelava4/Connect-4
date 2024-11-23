let points = 0;
let gold = 100; // Shared across all games
let health = 5; // Starting health for tower defense

function updatePointsAndGold() {
  document.getElementById("points-display").textContent = points;
  document.getElementById("gold-display").textContent = gold;
}

// Start a game
function startGame(game) {
  const gameContainer = document.getElementById("game-container");
  if (game === "phishing-quiz") {
    gameContainer.innerHTML = phishingQuizHTML();
    initializePhishingQuiz();
  } else if (game === "password-game") {
    gameContainer.innerHTML = passwordGameHTML();
    initializePasswordGame();
  } else if (game === "tower-defense") {
    gameContainer.innerHTML = towerDefenseHTML();
    initializeTowerDefense();
  }
  document.getElementById("game-modal").classList.remove("hidden");
}

// Close the game modal
function closeGame() {
  document.getElementById("game-modal").classList.add("hidden");
  document.getElementById("game-container").innerHTML = "";
}

// Tower Defense Game
function towerDefenseHTML() {
  return `
    <h2>Cyber Defense Tower Game</h2>
    <canvas id="game-canvas" width="800" height="600"></canvas>
    <div id="tower-defense-ui">
      <p>Health: <span id="health-display">5</span></p>
      <p>Gold: <span id="gold-display">100</span></p>
      <p>Points Earned: <span id="points-earned">0</span></p>
      <button id="start-button">Start Game</button>
    </div>
  `;
}

function initializeTowerDefense() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  let level = 1;
  let currentHealth = health; // Local health for this game session
  let currentGold = gold; // Local gold for this game session
  let localPoints = 0; // Points earned in this session
  let enemies = [];
  let towers = [];
  let gameRunning = false;

  // Path and enemies logic remain the same as before
  const PATH = [...]; // The same PATH array
  const TOWER_TYPES = [...]; // The same tower types
  const ENEMY_TYPES = [...]; // The same enemy types

  function startGame() {
    gameRunning = true;
    level = 1;
    currentHealth = health;
    currentGold = gold;
    localPoints = 0;
    enemies = [];
    towers = [];
    spawnEnemies();
    gameLoop();
  }

  function spawnEnemies() {
    const enemyType = ENEMY_TYPES[Math.min(level - 1, ENEMY_TYPES.length - 1)];
    const numEnemies = level * 5;
    for (let i = 0; i < numEnemies; i++) {
      enemies.push({ ...enemyType, x: PATH[0].x, y: PATH[0].y, progress: 0 });
    }
  }

  function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPath();
    updateEnemies();
    drawEnemies();
    updateTowers();
    drawTowers();
    checkGameOver();

    if (enemies.length === 0) {
      level++;
      currentGold += 5;
      localPoints += 5;
      spawnEnemies();
    }

    updateUI();
    requestAnimationFrame(gameLoop);
  }

  function updateUI() {
    document.getElementById("health-display").textContent = currentHealth;
    document.getElementById("gold-display").textContent = currentGold;
    document.getElementById("points-earned").textContent = localPoints;
  }

  function checkGameOver() {
    if (currentHealth <= 0) {
      alert("Game Over! Restarting...");
      gameRunning = false;
      endGame();
    }
  }

  function endGame() {
    points += localPoints;
    gold = currentGold;
    health = currentHealth;
    updatePointsAndGold();
    closeGame();
  }

  document.getElementById("start-button").addEventListener("click", startGame);
}






