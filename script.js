let totalPoints = 0;
let grid = [];
let gridSize = 6;  // 6x6 grid for Candy Crush

// Show the games section
function showGames() {
    document.getElementById("game-section").style.display = "block";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("discount-section").style.display = "none";
    document.getElementById("password-check-game").style.display = "none";
    document.getElementById("candy-crush-game").style.display = "none";
}

// Show the quiz section
function showQuizzes() {
    document.getElementById("quiz-section").style.display = "block";
    document.getElementById("game-section").style.display = "none";
    document.getElementById("discount-section").style.display = "none";
    document.getElementById("password-check-game").style.display = "none";
    document.getElementById("candy-crush-game").style.display = "none";
    loadQuiz();
}

// Show the discount redemption section
function showDiscounts() {
    document.getElementById("discount-section").style.display = "block";
    document.getElementById("game-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("password-check-game").style.display = "none";
    document.getElementById("candy-crush-game").style.display = "none";
    displayDiscounts();
}

// Start Candy Crush-like game
function startCandyCrushGame() {
    grid = generateGrid();
    renderGrid();
    document.getElementById("candy-crush-game").style.display = "block";
    document.getElementById("game-section").style.display = "none";
}

// Start Password Check game
function startPasswordCheckGame() {
    document.getElementById("password-check-game").style.display = "block";
    document.getElementById("game-section").style.display = "none";
}

// Generate a random grid with 6x6 cells for Candy Crush
function generateGrid() {
    const computers = ['💻', '🖥️', '🖲️', '🖱️'];
    let newGrid = [];
    
    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            const randomComputer = computers[Math.floor(Math.random() * computers.length)];
            row.push(randomComputer);
        }
        newGrid.push(row);
    }
    
    return newGrid;
}

// Render grid of computers (Candy Crush Game)
function renderGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';  // Clear previous grid
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.textContent = grid[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            container.appendChild(cell);
        }
    }
}

// Handle user clicks on the grid (Candy Crush Game)
let firstCell = null;
function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    
    if (firstCell) {
        const secondCell = { row, col };
        swapCells(firstCell, secondCell);
        firstCell = null;
    } else {
        firstCell = { row, col };
    }
}

// Swap cells in Candy Crush game logic
function swapCells(first, second) {
    const firstValue = grid[first.row][first.col];
    const secondValue = grid[second.row][second.col];
    
    grid[first.row][first.col] = secondValue;
    grid[second.row][second.col] = firstValue;
    
    const matches = findMatches();
    if (matches.length > 0) {
        removeMatches(matches);
        totalPoints += 5;  // Award 5 points for a match
        alert('Match Found! +5 Points');
    } else {
        grid[first.row][first.col] = firstValue;
        grid[second.row][second.col] = secondValue;
    }
    
    renderGrid();
    document.getElementById("points").textContent = `Total Points: ${totalPoints}`;
}

// Find matches in the Candy Crush grid
function findMatches() {
    let matches = [];
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize - 2; col++) {
            if (grid[row][col] === grid[row][col+1] && grid[row][col] === grid[row][col+2]) {
                matches.push([[row, col], [row, col+1], [row, col+2]]);
            }
        }
    }
    
    for (let col = 0; col < gridSize; col++) {
        for (let row = 0; row < gridSize - 2; row++) {
            if (grid[row][col] === grid[row+1][col] && grid[row][col] === grid[row+2][col]) {
                matches.push([[row, col], [row+1, col], [row+2, col]]);
            }
        }
    }
    
    return matches;
}

// Remove matched items (Candy Crush Game)
function removeMatches(matches) {
    matches.forEach(match => {
        match.forEach(([row, col]) => {
            grid[row][col] = null;
        });
    });
    
    // Apply gravity
    for (let col = 0; col < gridSize; col++) {
        for (let row = gridSize - 1; row >= 0; row--) {
            if (grid[row][col] === null) {
                for (let r = row - 1; r >= 0; r--) {
                    if (grid[r][col] !== null) {
                        grid[row][col] = grid[r][col];
                        grid[r][col] = null;
                        break;
                    }
                }
            }
        }
    }
}

// Password Check Game Logic
function checkPasswordStrength() {
    const password = document.getElementById("password-input").value;
    let points = 0;

    if (password.length >= 8) points += 3;
    if (/[A-Z]/.test(password)) points += 2;
    if (/[a-z]/.test(password)) points += 2;
    if (/\d/.test(password)) points += 1;
    if (/[^A-Za-z0-9]/.test(password)) points += 2;

    if (points >= 10) {
        document.getElementById("password-feedback").textContent = "Strong password! You earned 10 points.";
    } else {
        document.getElementById("password-feedback").textContent = `Password strength: ${points} points. Try to make it stronger!`;
    }

    totalPoints += points;
    document.getElementById("points").textContent = `Total Points: ${totalPoints}`;
}

// Quiz Game Logic (Placeholder for now)
let quizQuestions = [
    { question: "What is a strong password?", options: ["12345", "Password", "Mix of letters, numbers, symbols"], answer: "Mix of letters, numbers, symbols" },
    { question: "What does phishing mean?", options: ["Stealing data through deceptive emails", "A type of fishing", "A malware attack"], answer: "Stealing data through deceptive emails" },
    // Add more questions as necessary
];

// Load quiz questions
function loadQuiz() {
    let quizContent = '';
    quizQuestions.forEach((question, index) => {
        quizContent += `
        <div>
            <p>${question.question}</p>
            <input type="radio" name="quiz${index}" value="${question.options[0]}"> ${question.options[0]}<br>
            <input type="radio" name="quiz${index}" value="${question.options[1]}"> ${question.options[1]}<br>
            <input type="radio" name="quiz${index}" value="${question.options[2]}"> ${question.options[2]}<br>
        </div>
        `;
    });
    document.getElementById("quiz-questions").innerHTML = quizContent;
}

// Submit quiz answers
function submitQuiz() {
    quizQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="quiz${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.answer) {
            totalPoints += 1;
        }
    });

    document.getElementById("points").textContent = `Total Points: ${totalPoints}`;
    showDiscounts();
}

// Display available discounts (Placeholder)
function displayDiscounts() {
    if (totalPoints >= 10) {
        document.getElementById("available-discounts").innerHTML = "You can redeem your points for a 10% senior discount!";
    } else {
        document.getElementById("available-discounts").innerHTML = "Keep playing games and quizzes to earn discounts!";
    }
}







