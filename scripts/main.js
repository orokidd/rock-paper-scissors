const btnRock = document.querySelector(".btn-rock");
const btnPaper = document.querySelector(".btn-paper");
const btnScissors = document.querySelector(".btn-scissors");

let gameState = {
  playerScore: 0,
  computerScore: 0,
  round: 1,
  roundState: {
    playerSign: "",
    computerSign: "",
    roundWinner: ""
  },
};

const signs = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

function init() {
  btnRock.addEventListener("click", () => playRound("rock"));
  btnPaper.addEventListener("click", () => playRound("paper"));
  btnScissors.addEventListener("click", () => playRound("scissors"));
}

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  if (choice === 0) return "rock";
  if (choice === 1) return "paper";
  if (choice === 2) return "scissors";
}

function getWinner(player, computer) {
  if (player === computer) return "tie";

  const winRules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winRules[player] === computer ? "player" : "computer"; // Not winRules.player because it will find a key called "player" instead
}

function playRound(humanChoice) {
  const playerChoice = humanChoice;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice)

  updateRoundState(playerChoice, computerChoice, winner);
  updateRoundDisplay()
  calculateGamePoints();
  updateRoundScore();
  checkIfGameFinished();
}

function updateRoundState(player, computer, winner) {
  gameState.roundState = { playerSign: player, computerSign: computer, roundWinner: winner };
}

function updateRoundDisplay() {
  const playerSignElement = document.querySelector(".player-sign");
  const computerSignElement = document.querySelector(".computer-sign");
  const resultElement = document.querySelector(".round-result");

  const { playerSign, computerSign, roundWinner } = gameState.roundState;

  playerSignElement.textContent = signs[playerSign];
  computerSignElement.textContent = signs[computerSign];

  switch (roundWinner) {
    case "player":
      resultElement.textContent = `You won! 
      ${playerSign} beats ${computerSign}`;
      break;

    case "computer":
      resultElement.textContent = `You lost! 
      ${computerSign} beats ${playerSign}`;
      break;

    case "tie":
      resultElement.textContent = `It's a ${roundWinner}! 
      both choices are ${playerSign}`;
      break;
  }
}

function getRoundWinner() {
  return gameState.roundState.roundWinner;
}

function calculateGamePoints() {
  const roundWinner = getRoundWinner()
  switch (roundWinner) {
    case "player":
      gameState.playerScore++;
      break;

    case "computer":
      gameState.computerScore++;
      break;
  }

  gameState.round++;
}

function updateRoundScore() {
  const playerScoreDom = document.querySelector(".player-score");
  const computerScoreDom = document.querySelector(".computer-score");
  playerScoreDom.textContent = `${gameState.playerScore} `;
  computerScoreDom.textContent = `${gameState.computerScore} `;
}

function checkIfGameFinished() {
  const gameFinished = gameState.playerScore === 5 || gameState.computerScore === 5;
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
  const humanWins = gameState.playerScore > gameState.computerScore;

  if (humanWins) {
    winner.textContent = `You won the game!`;
  } else {
    winner.textContent = `You lost the game!`;
  }
}

init();
