const btnRock = document.querySelector(".btn-rock");
const btnPaper = document.querySelector(".btn-paper");
const btnScissors = document.querySelector(".btn-scissors");

let playerScore = 0;
let computerScore = 0;
let round = 1;

let gameState = {
  playerScore: 0,
  computerScore: 0,
  roundState: {
    playerSign: "",
    computerSign: "",
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
  updateRoundScore();
  checkIfGameFinished();

  updateSignState(player, computer);
  updateDomSign();
}

function updateSignState(playerSign, computerSign) {
  gameState.roundState.playerSign = playerSign;
  gameState.roundState.computerSign = computerSign;
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

function updateRoundWinner(winner, humanChoice, computerChoice) {
  const roundWinner = document.querySelector(".round-result");
  const body = document.body;

  // body.style.backgroundColor = "";

  switch (winner) {
    case "Player":
      roundWinner.textContent = `You won! 
      ${humanChoice} beats ${computerChoice}`;
      // body.style.background = "#28a745";
      break;

    case "Computer":
      roundWinner.textContent = `You lost! 
      ${computerChoice} beats ${humanChoice}`;
      // body.style.background = "#dc3545";
      break;

    case "tie":
      roundWinner.textContent = `It's a ${winner}! 
      both choices are ${humanChoice}`;
      // body.style.background = "#6c757d";
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
}

function updateRoundScore() {
  const playerScoreDom = document.querySelector(".player-score");
  const computerScoreDom = document.querySelector(".computer-score");
  playerScoreDom.textContent = `Player: ${playerScore} `;
  computerScoreDom.textContent = `Computer: ${computerScore} `;
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
