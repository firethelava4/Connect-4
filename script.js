let points = 0;

// Update points display
function updatePoints() {
  document.getElementById("points-display").textContent = points;
}

// Open a game in the modal
function startGame(game) {
  const gameContainer = document.getElementById("game-container");
  if (game === 'phishing-quiz') {
    gameContainer.innerHTML = phishingQuizHTML();
    initializePhishingQuiz();
  } else if (game === 'password-game') {
    gameContainer.innerHTML = passwordGameHTML();
    initializePasswordGame();
  }
  document.getElementById("game-modal").classList.remove('hidden');
}

// Close the game modal
function closeGame() {
  document.getElementById("game-modal").classList.add('hidden');
  document.getElementById("game-container").innerHTML = '';
}

// Phishing Quiz
function phishingQuizHTML() {
  return `
    <h2>Phishing Awareness Quiz</h2>
    <p>Select the correct answer:</p>
    <p>Q: You receive an email asking for your password. What do you do?</p>
    <button onclick="submitQuizAnswer(true)">Ignore and Report</button>
    <button onclick="submitQuizAnswer(false)">Reply with the password</button>
  `;
}

function initializePhishingQuiz() {
  window.submitQuizAnswer = function(isCorrect) {
    if (isCorrect) {
      const earnedPoints = Math.floor(Math.random() * 30) + 10; // Random points between 10-40
      alert(`Correct! You earned ${earnedPoints} points!`);
      points += earnedPoints;
    } else {
      alert('Oops! That was not the right choice.');
    }
    updatePoints();
    closeGame();
  };
}

// Password Strength Tester
function passwordGameHTML() {
  return `
    <h2>Password Strength Tester</h2>
    <p>Type a password to see its strength:</p>
    <input type="text" id="password-input" placeholder="Enter a password">
    <button onclick="checkPassword()">Check Password</button>
    <p id="password-feedback"></p>
  `;
}

function initializePasswordGame() {
  window.checkPassword = function() {
    const password = document.getElementById("password-input").value;
    const feedback = document.getElementById("password-feedback");
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      feedback.textContent = 'Strong Password! You earned 15 points!';
      points += 15;
    } else {
      feedback.textContent = 'Weak Password. Try including uppercase letters, numbers, and at least 8 characters.';
    }
    updatePoints();
  };
}

// Redeem rewards
function redeemReward(rewardName, cost) {
  if (points >= cost) {
    points -= cost;
    updatePoints();
    alert(`You redeemed: ${rewardName}\nRemaining points: ${points}`);
  } else {
    alert(`Not enough points! You need ${cost - points} more points to redeem this reward.`);
  }
}

// Initial points update
updatePoints();




