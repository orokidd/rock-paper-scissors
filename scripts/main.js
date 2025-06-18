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

function playRound(humanChoice) {
  const player = humanChoice;
  const computer = getComputerChoice();
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

  updateRoundState(player, computer, winner);
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

function updateRoundWinner() {
  const roundWinner = document.querySelector(".round-result");
  const winner = gameState.roundState.roundWinner
  const humanChoice = gameState.roundState.playerSign
  const computerChoice = gameState.roundState.computerSign

  switch (winner) {
    case "player":
      roundWinner.textContent = `You won! 
      ${humanChoice} beats ${computerChoice}`;
      break;

    case "computer":
      roundWinner.textContent = `You lost! 
      ${computerChoice} beats ${humanChoice}`;
      break;

    case "tie":
      roundWinner.textContent = `It's a ${winner}! 
      both choices are ${humanChoice}`;
      break;
  }
}

function calculateGamePoints() {
  const roundWinner = gameState.roundState.roundWinner
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
  playerScoreDom.textContent = `Player: ${gameState.playerScore} `;
  computerScoreDom.textContent = `Computer: ${gameState.computerScore} `;
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
