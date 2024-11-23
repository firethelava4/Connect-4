// game.js
let health = 5;
let gold = 100;
let level = 1;
let towers = [];
let viruses = [];
let path = [
    { x: 0, y: 100 }, // Starting point (top left)
    { x: 200, y: 100 },
    { x: 200, y: 300 },
    { x: 600, y: 300 },
    { x: 600, y: 500 },
    { x: 800, y: 500 } // Ending point (bottom right)
];
let gameInterval;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const healthDisplay = document.getElementById("health");
const goldDisplay = document.getElementById("gold");
const levelDisplay = document.getElementById("level");

const towersData = {
    basic: { cost: 20, damage: 1 },
    medium: { cost: 50, damage: 3 },
    large: { cost: 100, damage: 10 },
    cyberAttacker: { cost: 500, damage: 50 },
    cyberSecurity: { cost: 1000, damage: 100 }
};

// Initialize game
function startGame() {
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
}

// Game update loop
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update UI elements
    levelDisplay.textContent = level;
    healthDisplay.textContent = health;
    goldDisplay.textContent = gold;

    // Update viruses
    updateViruses();

    // Update towers
    towers.forEach(tower => {
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = tower.color;
        ctx.fill();
        ctx.closePath();
    });

    // Check for collisions (viruses vs towers)
    checkCollisions();
}

// Create new virus
function spawnVirus() {
    let virusType;
    if (level < 5) {
        virusType = { health: 5, goldReward: 5, color: "red" };
    } else if (level < 10) {
        virusType = { health: 20, goldReward: 20, color: "blue" };
    } else {
        virusType = { health: 100, goldReward: 100, color: "green" };
    }

    const virus = {
        x: path[0].x,
        y: path[0].y,
        health: virusType.health,
        goldReward: virusType.goldReward,
        color: virusType.color,
        pathIndex: 0
    };

    viruses.push(virus);
}

// Move viruses along the path
function updateViruses() {
    viruses.forEach(virus => {
        let target = path[virus.pathIndex];
        let dx = target.x - virus.x;
        let dy = target.y - virus.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move virus towards target
        if (distance < 5) {
            virus.pathIndex++;
            if (virus.pathIndex >= path.length) {
                health -= 1; // Virus reaches end
                viruses.splice(viruses.indexOf(virus), 1);
                if (health <= 0) {
                    alert("Game Over! Restarting...");
                    resetGame();
                }
            }
        } else {
            virus.x += dx / distance * 2; // Move along path
            virus.y += dy / distance * 2;
        }

        // Draw the virus
        ctx.beginPath();
        ctx.arc(virus.x, virus.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = virus.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Place tower on the canvas
function buyTower(type) {
    if (gold >= towersData[type].cost) {
        gold -= towersData[type].cost;
        towers.push({
            x: Math.random() * (canvas.width - 40) + 20, // Random position for tower
            y: Math.random() * (canvas.height - 40) + 20,
            type: type,
            color: type === "basic" ? "yellow" : type === "medium" ? "orange" : "purple",
            damage: towersData[type].damage
        });
    }
}

// Check collisions between towers and viruses
function checkCollisions() {
    towers.forEach(tower => {
        viruses.forEach(virus => {
            let dx = virus.x - tower.x;
            let dy = virus.y - tower.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // If virus is in range of tower, attack it
            if (distance < 50) {
                virus.health -= tower.damage;
                if (virus.health <= 0) {
                    gold += virus.goldReward; // Reward for defeating virus
                    viruses.splice(viruses.indexOf(virus), 1);
                }
            }
        });
    });
}

// Reset the game
function resetGame() {
    health = 5;
    gold = 100;
    level = 1;
    towers = [];
    viruses = [];
    startGame();
}

// Start the game
startGame();

// Periodically spawn viruses based on level
setInterval(() => {
    if (level >= 1) spawnVirus();
}, 3000); // Spawn a virus every 3 seconds






