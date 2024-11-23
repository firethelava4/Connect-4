let points = 0;

// Update points display
function updatePoints() {
  document.getElementById("points-display").textContent = points;
}

// Simulate a game or quiz
function playGame(game) {
  let earnedPoints = Math.floor(Math.random() * 30) + 10; // Random points between 10-40
  alert(`You played: ${game}\nYou earned ${earnedPoints} points!`);
  points += earnedPoints;
  updatePoints();
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



