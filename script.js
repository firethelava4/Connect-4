let totalPoints = 0;

function updatePoints(points) {
    totalPoints += points;
    document.getElementById('total-points').innerText = totalPoints;
}

// Tower Defense Game
function startTowerDefense() {
    alert("Tower Defense Game coming soon!");
    // Logic for the Tower Defense game using canvas would go here.
    // This includes setting up towers, enemies, levels, and point system.
}

// Quiz Game
function startQuiz() {
    const questions = [
        { q: "What is phishing?", a: "An attempt to steal information via fake emails or websites." },
        { q: "What should a strong password include?", a: "Numbers, letters, symbols, and uppercase letters." },
        // Add 28 more questions
    ];
    document.getElementById('menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    // Randomly pick 5 questions for the quiz
    const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    selectedQuestions.forEach((question, index) => {
        questionContainer.innerHTML += `<p>${question.q}</p>
        <input type="text" id="answer-${index}" placeholder="Your answer">`;
    });
}

function submitQuiz() {
    let score = 0;
    const answers = ["phishing", "strong password"];
    for (let i = 0; i < 5; i++) {
        const answer = document.getElementById(`answer-${i}`).value.toLowerCase();
        if (answers.includes(answer)) {
            score++;
        }
    }
    updatePoints(score);
    alert(`Quiz completed! You earned ${score} points.`);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

// Password Game
function startPasswordGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('password-game').style.display = 'block';
}

function checkPassword() {
    const password = document.getElementById('password-input').value;
    let feedback = "";
    let points = 0;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) {
        feedback = "Strong password!";
        points = 10;
    } else if (password.length >= 6) {
        feedback = "Medium strength password.";
        points = 5;
    } else {
        feedback = "Weak password.";
    }
    document.getElementById('password-feedback').innerText = feedback;
    updatePoints(points);
}






