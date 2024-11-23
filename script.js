let points = 0;
let gold = 0;

// Update points and gold displays
function updatePointsAndGold() {
  document.getElementById("points-display").textContent = points;
  document.getElementById("gold-display").textContent = gold;
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
  } else if (game === 'tower-defense') {
    gameContainer.innerHTML = towerDefenseHTML();
    initializeTowerDefense();
  }
  document.getElementById("game-modal").classList.remove('hidden');
}

// Close the game modal
function closeGame() {
  document.getElementById("game-modal").classList.add('hidden');
  document.getElementById("game-container").innerHTML = '';
}

// Phishing Quiz with Randomized Questions
const questionBank = [
  { question: "What should you do if you receive an email asking for sensitive information?", options: ["Ignore and Report", "Reply with Information"], answer: 0 },
  { question: "You get a link in an email. What should you do?", options: ["Click it immediately", "Verify the source"], answer: 1 },
  { question: "What is a common sign of a phishing email?", options: ["Grammatical Errors", "Professional Language"], answer: 0 },
  // Add up to 30 questions here
];

function phishingQuizHTML() {
  return `
    <h2>Phishing Awareness Quiz</h2>
    <div id="quiz-container"></div>
    <button onclick="submitQuiz()">Submit Quiz</button>
  `;
}

function initializePhishingQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  const questions = shuffleArray(questionBank).slice(0, 5); // Pick 5 random questions
  quizContainer.innerHTML = questions.map((q, i) => `
    <p>${q.question}</p>
    ${q.options.map((opt, j) => `
      <label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>
    `).join('')}
  `).join('');

  window.submitQuiz = function() {
    let score = 0;
    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) {
        score++;
      }
    });
    alert(`You scored ${score} points!`);
    points += score;
    updatePointsAndGold();
    closeGame();
  };
}

// Tower Defense Game
function towerDefenseHTML() {
  return `
    <h2>Cyber Defense Tower Game</h2>
    <p id="game-status">Level 1</p>
    <button onclick="startLevel()">Start Level</button>
    <div id="boss-question"></div>
  `;
}

let level = 1;

function initializeTowerDefense() {
  const status = document.getElementById("game-status");
  const bossQuestionDiv = document.getElementById("boss-question");

  window.startLevel = function() {
    const bossQuestion = shuffleArray(questionBank)[0]; // Pick random question
    bossQuestionDiv.innerHTML = `
      <p>${bossQuestion.question}</p>
      ${bossQuestion.options.map((opt, i) => `
        <button onclick="answerBoss(${i === bossQuestion.answer})">${opt}</button>
      `).join('')}
    `;
  };

  window.answerBoss = function(isCorrect) {
    if (isCorrect) {
      gold += 5;
      level++;
      alert(`You defeated Level ${level - 1} Boss! Moving to Level ${level}`);
      document.getElementById("game-status").textContent = `Level ${level}`;
      updatePointsAndGold();
    } else {
      alert("You lost! Restarting from Level 1.");
      level = 1;
      document.getElementById("game-status").textContent = `Level ${level}`;
    }
  };
}

// Helper Functions
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Redeem rewards
function redeemReward(rewardName, cost) {
  if (points >= cost) {
    points -= cost;
    updatePointsAndGold();
    alert(`You redeemed: ${rewardName}\nRemaining points: ${points}`);
  } else {
    alert(`Not enough points! You need ${cost - points} more points to redeem this reward.`);
  }
}

// Initial update
updatePointsAndGold();





