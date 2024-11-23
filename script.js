// Set up game variables
let health = 5;
let gold = 100;
let level = 1;
let gridSize = 10;
let towers = [];
let enemies = [];
let currentTower = null;
let enemySpeed = 500; // Speed of enemy movement in milliseconds

let towerCosts = {
    basic: 20,
    medium: 50,
    large: 100,
    cyber: 500,
    security: 1000
};

let enemyTypes = {
    mini: { health: 5, goldReward: 5, speed: 1 },
    medium: { health: 20, goldReward: 20, speed: 2 },
    huge: { health: 100, goldReward: 100, speed: 3 }
};

// Setup the game grid
function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", placeTower);
        gameBoard.appendChild(cell);
    }
}

// Place tower function
function placeTower(event) {
    if (currentTower && gold >= towerCosts[currentTower]) {
        const cell = event.target;
        if (!cell.hasChildNodes()) {
            const tower = document.createElement("div");
            tower.classList.add("tower", currentTower);
            cell.appendChild(tower);
            gold -= towerCosts[currentTower];
            document.getElementById("gold").textContent = gold;
            towers.push({ type: currentTower, position: parseInt(cell.dataset.index) });
        }
    }
}

// Set the current tower based on the selected button
function setCurrentTower(towerType) {
    currentTower = towerType;
}

// Start the game
function startGame() {
    createGameBoard();

    // Event listeners for tower selection
    document.getElementById("basic-computer-btn").addEventListener("click", () => setCurrentTower("basic"));
    document.getElementById("medium-computer-btn").addEventListener("click", () => setCurrentTower("medium"));
    document.getElementById("large-computer-btn").addEventListener("click", () => setCurrentTower("large"));
    document.getElementById("cyber-attacker-btn").addEventListener("click", () => setCurrentTower("cyber"));
    document.getElementById("cyber-security-btn").addEventListener("click", () => setCurrentTower("security"));
}

// Define enemy path (simplified as an array of indexes)
let enemyPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Spawn enemies based on level
function spawnEnemies() {
    let enemyType;
    if (level >= 10) {
        enemyType = "huge";
    } else if (level >= 5) {
        enemyType = "medium";
    } else {
        enemyType = "mini";
    }

    let enemy = { 
        type: enemyType, 
        health: enemyTypes[enemyType].health, 
        position: 0, 
        speed: enemyTypes[enemyType].speed 
    };

    enemies.push(enemy);
}

// Update enemy movement and collision detection
function moveEnemies() {
    enemies.forEach(enemy => {
        // Move enemy along the path
        const currentPosition = enemy.position;
        if (currentPosition < enemyPath.length) {
            enemy.position++;
            let currentCell = document.querySelector(`[data-index='${enemyPath[currentPosition]}']`);
            const enemyElement = document.createElement("div");
            enemyElement.classList.add("enemy");
            currentCell.appendChild(enemyElement);

            // Check for tower collision
            towers.forEach(tower => {
                // Check if tower is in range (simple distance calculation)
                if (Math.abs(tower.position - enemy.position) <= 2) {
                    enemy.health -= 1; // Each tower deals 1 damage
                    if (enemy.health <= 0) {
                        enemyElement.remove();
                        gold += enemyTypes[enemy.type].goldReward;
                        document.getElementById("gold").textContent = gold;
                    }
                }
            });
        } else {
            // Enemy reaches the end of the path
            health -= 1;
            if (health <= 0) {
                alert("Game Over!");
                resetGame();
            }
            enemies.splice(enemies.indexOf(enemy), 1); // Remove enemy
        }
    });
}

// Increase level difficulty
function levelUp() {
    level++;
    document.getElementById("level").textContent = level;
    spawnEnemies();
}

// Game update function
function updateGame() {
    moveEnemies();

    // If all enemies are defeated, go to the next level
    if (enemies.length === 0) {
        levelUp();
    }
}

// Start the game when page loads
window.onload = function() {
    startGame();
    setInterval(updateGame, 1000); // Update every second (placeholder)
};






