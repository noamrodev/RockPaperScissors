const moves = ["rock", "paper", "scissors"];

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;

  localStorage.setItem("score", JSON.stringify(score));
}

function updateResults(result, myMove, computerMove) {
  if (result === "You win!") {
    score.wins++;
  }
  if (result === "You lose.") {
    score.loses++;
  }
  if (result === "Tie.") {
    score.ties++;
  }
  console.log(result);
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `
    You <img class="result-icon" src="images/${myMove}-emoji.png" />
    <img class="result-icon" src="images/${computerMove}-emoji.png" /> Computer
  `;

  updateScore();
}

function pickComputerMove(myMove) {
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  const outcomes = {
    scissors: { rock: "lose", paper: "win", scissors: "tie" },
    paper: { rock: "win", paper: "tie", scissors: "lose" },
    rock: { rock: "tie", paper: "lose", scissors: "win" },
  };

  const result = outcomes[myMove][computerMove];
  score[result]++;

  updateResults(
    result === "win" ? "You win!" : result === "lose" ? "You lose." : "Tie.",
    myMove,
    computerMove
  );
}

function removeText() {
  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-moves").innerHTML = "";
}

// Call updateScore on initial load
updateScore();
