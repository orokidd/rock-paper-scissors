const btnRock = document.querySelector(".btn-rock");
const btnPaper = document.querySelector(".btn-paper");
const btnScissors = document.querySelector(".btn-scissors");

let playerScore = 0;
let computerScore = 0;
let round = 1;

function init() {
  btnRock.addEventListener("click", () =>
    playRound("rock", getComputerChoice())
  );
  btnPaper.addEventListener("click", () =>
    playRound("paper", getComputerChoice())
  );
  btnScissors.addEventListener("click", () =>
    playRound("scissors", getComputerChoice())
  );
}

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  if (choice === 0) return "rock";
  if (choice === 1) return "paper";
  if (choice === 2) return "scissors";
}

function playRound(humanChoice, computerChoice) {
  const player = humanChoice;
  const computer = computerChoice;
  let winner = "Player";

  if (player === computer) winner = "tie";

  if (player === "rock") {
    switch (computer) {
      case "paper":
        winner = "Computer";
        break;
    }
  }

  if (player === "paper") {
    switch (computer) {
      case "scissors":
        winner = "Computer";
        break;
    }
  }

  if (player === "scissors") {
    switch (computer) {
      case "rock":
        winner = "Computer";
        break;
    }
  }

  updateRoundWinner(winner, player, computer);
  calculateGamePoints(winner);
}

function updateRoundWinner(winner, humanChoice, computerChoice) {
  const roundWinner = document.querySelector(".round-result");
  const body = document.body;

  // body.style.backgroundColor = "";

  switch (winner) {
    case "Player":
      roundWinner.textContent = `${winner} wins round ${round}! 
      ${humanChoice} beats ${computerChoice}`;
      body.style.background = "#28a745";
      break;

    case "Computer":
      roundWinner.textContent = `${winner} wins round ${round}! 
      ${computerChoice} beats ${humanChoice}`;
      body.style.background = "#dc3545";
      break;

    case "tie":
      roundWinner.textContent = `Round ${round} is a ${winner}! 
      both choices are ${humanChoice}`;
      body.style.background = "#6c757d";
      break;
  }
}

function calculateGamePoints(roundWinner) {
  switch (roundWinner) {
    case "Player":
      playerScore++;
      break;

    case "Computer":
      computerScore++;
      break;
  }

  round++;
  updateRoundScore();
  checkIfGameFinished();
}

function updateRoundScore() {
  const score = document.querySelector(".score");
  score.textContent = `Score: Human = ${playerScore} Computer = ${computerScore}`;
}

function checkIfGameFinished() {
  const gameFinished = playerScore === 5 || computerScore === 5;
  if (gameFinished) {
    disableGameButton();
    updateGameWinner();
  }
}

function disableGameButton() {
  [btnRock, btnPaper, btnScissors].forEach((button) => {
    button.disabled = true;
  });
}

function updateGameWinner() {
  const winner = document.querySelector(".winner");
  const humanWins = playerScore > computerScore;

  if (humanWins) {
    winner.textContent = `You won the game!`;
  } else {
    winner.textContent = `You lost the game!`;
  }
}

init();