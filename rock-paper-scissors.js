const moves = ["rock", "paper", "scissors"]; // Array containing possible moves
let isAutoPlay = false; // Flag to indicate if auto-play mode is active

// Score object to track wins, losses, and ties, retrieved from local storage or initialized to zero
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

// Function to update the score displayed on the webpage and store it in local storage
function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;

  localStorage.setItem("score", JSON.stringify(score));
}

// Function to update the result displayed on the webpage
function updateResults(result, myMove, computerMove) {
  // Update score based on the result
  if (result === "You win!") {
    score.wins++;
  }
  if (result === "You lose.") {
    score.loses++;
  }
  if (result === "Tie.") {
    score.ties++;
  }

  // Display result on the webpage
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `
    You <img class="result-icon" src="images/${myMove}-emoji.png" />
    <img class="result-icon" src="images/${computerMove}-emoji.png" /> Computer
  `;

  // Update the score display
  updateScore();
}

// Function to simulate the computer's move and determine the result
function pickComputerMove(myMove) {
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  // Define outcomes for each move combination
  const outcomes = {
    scissors: { rock: "lose", paper: "win", scissors: "tie" },
    paper: { rock: "win", paper: "tie", scissors: "lose" },
    rock: { rock: "tie", paper: "lose", scissors: "win" },
  };

  // Determine the result based on the moves
  const result = outcomes[myMove][computerMove];
  score[result]++;

  // Update the displayed results
  updateResults(
    result === "win" ? "You win!" : result === "lose" ? "You lose." : "Tie.",
    myMove,
    computerMove
  );
}

// Function to remove the displayed text on the webpage
function removeText() {
  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-moves").innerHTML = "";
}

// Function to toggle auto-play mode
function autoPlay() {
  isAutoPlay = !isAutoPlay;

  // Select the auto-play button element
  const autoButton = document.querySelector(".auto-button");

  // Select all manual move buttons
  const moveButtons = document.querySelectorAll(".move-button");

  if (isAutoPlay) {
    // Start auto-play interval
    autoPlayInterval = setInterval(function () {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      pickComputerMove(randomMove);
    }, 1000);

    // Change auto-play button text to "Stop Auto Play"
    autoButton.textContent = "Stop Auto Play";

    // Disable manual move buttons and reduce opacity
    moveButtons.forEach((button) => (button.disabled = true));
    moveButtons.forEach((button) => (button.style.opacity = 0.2));
  } else {
    // Stop auto-play interval
    clearInterval(autoPlayInterval);

    // Change auto-play button text to "Auto Play"
    autoButton.textContent = "Auto Play";

    // Enable manual move buttons and restore opacity
    moveButtons.forEach((button) => (button.disabled = false));
    moveButtons.forEach((button) => (button.style.opacity = 1));
  }
}

// Call updateScore to display the initial score on page load
updateScore();
