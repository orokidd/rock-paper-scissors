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
  updateRoundWinner();
  calculateGamePoints();
  updateRoundScore();
  checkIfGameFinished();
  updateDomSign();
}

function updateRoundState(playerSign, computerSign, roundWinner) {
  gameState.roundState.playerSign = playerSign;
  gameState.roundState.computerSign = computerSign;
  gameState.roundState.roundWinner = roundWinner;
}

function updateDomSign() {
  const domPlayerSign = document.querySelector(".player-sign");
  const domComputerSign = document.querySelector(".computer-sign");
  const playerSign = getPlayerSign();
  const computerSign = getComputerSign();

  domPlayerSign.textContent = changeSignToIcons(playerSign);
  domComputerSign.textContent = changeSignToIcons(computerSign);
}

function changeSignToIcons(selectedSign) {
  switch (selectedSign) {
    case "rock":
      return "✊";

    case "paper":
      return "✋";

    case "scissors":
      return "✌️";
  }
}

function getPlayerSign() {
  return gameState.roundState.playerSign;
}

function getComputerSign() {
  return gameState.roundState.computerSign;
}

function getRoundWinner() {
  return gameState.roundState.roundWinner;
}

function updateRoundWinner() {
  const roundWinner = document.querySelector(".round-result");
  const winner = getRoundWinner()
  const playerChoice = getPlayerSign()
  const computerChoice = getComputerSign()

  switch (winner) {
    case "player":
      roundWinner.textContent = `You won! 
      ${playerChoice} beats ${computerChoice}`;
      break;

    case "computer":
      roundWinner.textContent = `You lost! 
      ${computerChoice} beats ${playerChoice}`;
      break;

    case "tie":
      roundWinner.textContent = `It's a ${winner}! 
      both choices are ${playerChoice}`;
      break;
  }
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
