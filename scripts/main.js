const btnRock = document.querySelector(".btn-rock");
const btnPaper = document.querySelector(".btn-paper");
const btnScissors = document.querySelector(".btn-scissors");

let playerScore = 0;
let computerScore = 0;
let round = 0;

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
  let winner = "player";

  if (player === computer) winner = "tie";

  if (player === "rock") {
    switch (computer) {
      case "paper":
        winner = "computer";
        break;
    }
  }

  if (player === "paper") {
    switch (computer) {
      case "scissors":
        winner = "computer";
        break;
    }
  }

  if (player === "scissors") {
    switch (computer) {
      case "rock":
        winner = "computer";
        break;
    }
  }

  showRoundWinner(winner, player, computer);
  calculateGamePoints(winner);
}

function showRoundWinner(winner, humanChoice, computerChoice) {
  const roundWinner = document.querySelector(".round-result");
  switch (winner) {
    case "player":
      roundWinner.textContent = `${winner} wins round ${round + 1}! 
      ${humanChoice} beats ${computerChoice}`;
      break;

    case "computer":
      roundWinner.textContent = `${winner} wins round ${round + 1}! 
      ${computerChoice} beats ${humanChoice}`;
      break;

    case "tie":
      roundWinner.textContent = `${winner} round ${round + 1}! 
      both choices are ${humanChoice}`;
      break;
  }
}

function calculateGamePoints(roundWinner) {
  switch (roundWinner) {
    case "player":
      playerScore++;
      break;

    case "computer":
      computerScore++;
      break;
  }

  round++;
  updateRoundScore();
  checkGameWinner();
}

function updateRoundScore() {
  const score = document.querySelector(".score");
  score.textContent = `Score: Human = ${playerScore} Computer = ${computerScore}`;
}

function checkGameWinner() {
  const winner = document.querySelector(".winner");
  const humanWins = playerScore > computerScore;
  const tie = playerScore === computerScore;

  if (round === 5) {
    [btnRock, btnPaper, btnScissors].forEach((button) => {
      button.disabled = true;
    });

    if (humanWins) {
      winner.textContent = `You won the game!`;
    } else if (tie) {
      winner.textContent = `The game ends in a tie!`;
    } else {
      winner.textContent = `You lost the game!`;
    }
  }
}

init();