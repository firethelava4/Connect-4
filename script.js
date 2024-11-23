// game.js
let health = 5;
let gold = 100;
let level = 1;
let towers = [];
let viruses = [];
let gameInterval;

// Game Constants
const virusSpeed = 1; // Speed of viruses
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const healthDisplay = document.getElementById("health");
const goldDisplay = document.getElementById("gold");
const levelDisplay = document.getElementById("level");

// Tower details
const towersData = {
    basic: { cost: 20, damage: 1 },
    medium: { cost: 50, damage: 3 },
    large: { cost: 100, damage: 10 },
    cyberAttacker: { cost: 500, damage: 50 },
    cyberSecurity: { cost: 1000, damage: 100 }
};

// Initialize the game
function startGame() {
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
}

// Game Update Loop
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update level, health, gold displays
    levelDisplay.textContent = level;
    healthDisplay.textContent = health;
    goldDisplay.textContent = gold;

    // Spawn viruses depending on level
    if (viruses.length < level * 2) {
        spawnVirus();
    }

    // Draw and update viruses
    viruses.forEach(virus => {
        virus.x += virusSpeed;
        ctx.beginPath();
        ctx.arc(virus.x, virus.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = virus.color;
        ctx.fill();
        ctx.closePath();

        // Check if virus reaches end
        if (virus.x > canvas.width) {
            health -= 1;
            viruses.splice(viruses.indexOf(virus), 1);
            if (health <= 0) {
                alert("Game Over! Restarting...");
                resetGame();
            }
        }
    });

    // Update towers
    towers.forEach(tower => {
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = tower.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Spawn a virus based on the level
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
        x: 0,
        y: Math.random() * canvas.height,
        health: virusType.health,
        goldReward: virusType.goldReward,
        color: virusType.color
    };

    viruses.push(virus);
}

// Buy a tower
function buyTower(type) {
    if (gold >= towersData[type].cost) {
        gold -= towersData[type].cost;
        towers.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            type: type,
            color: type === "basic" ? "yellow" : type === "medium" ? "orange" : "purple"
        });
    }
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






