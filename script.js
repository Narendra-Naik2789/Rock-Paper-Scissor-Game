// -------------------------
// CONSTANTS & GLOBAL STATE
// -------------------------
const CHOICES = ["rock", "paper", "scissor"];

const body = document.querySelector("body");
const h2 = document.querySelector("h3");
const user = document.querySelector(".user");
const opponent = document.querySelector(".opponent");
const popup = document.querySelector(".popup");
const choiceButtons = document.querySelectorAll(".popup > div");

let gameStarted = false;
let userChoiceResolve = null;


// -------------------------
// HELPERS
// -------------------------
function setImage(element, choice) {
  element.style.backgroundImage = `url("./Assets/${choice}-rev.png")`;
}

function resetUI() {
  user.style.backgroundImage = "";
  opponent.style.backgroundImage = "";
  user.classList.remove("userCss");
  opponent.classList.remove("userCss");
  opponent.style.width = "100%";
  h2.innerText = "Press any key to start the game";
}


// -------------------------
// GAME START HANDLER
// -------------------------
body.addEventListener("keydown", async () => {
  if (gameStarted) return;

  gameStarted = true;
  resetUI();

  h2.innerText = "Game started! Choose your move.";

  const userChoice = await userTurn();

  opponent.classList.add("userCss");

  setTimeout(() => {
    const opponentChoice = opponentTurn();
    winner(userChoice, opponentChoice);
  }, 1200);
});


// -------------------------
// USER TURN (returns Promise)
// -------------------------
function userTurn() {
  return new Promise((resolve) => {
    userChoiceResolve = resolve;

    user.classList.add("userCss");
    popup.classList.remove("show");
  });
}


// Open popup on user click
user.addEventListener("click", () => {
  if (!gameStarted) return;
  popup.classList.add("show");
});


// Choice button click (runs only once per game)
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!gameStarted) return;

    const choice = btn.dataset.choice;

    popup.classList.remove("show");

    setImage(user, choice);
    user.classList.remove("userCss");

    h2.innerText = `You chose ${choice}. Opponent choosing...`;

    userChoiceResolve(choice);
  });
});


// -------------------------
// OPPONENT TURN
// -------------------------
function opponentTurn() {
  const idx = Math.floor(Math.random() * 3);
  const choice = CHOICES[idx];

  setImage(opponent, choice);
  opponent.style.width = "97%";
  opponent.classList.remove("userCss");

  return choice;
}


// -------------------------
// WINNER LOGIC
// -------------------------
function winner(userChoice, opponentChoice) {
  if (userChoice === opponentChoice) {
    h2.innerText = "Draw! Press any key to restart.";
    return restart();
  }

  const beats = {
    rock: "scissor",
    paper: "rock",
    scissor: "paper",
  };

  if (beats[userChoice] === opponentChoice) {
    h2.innerText = "You win! Press any key to restart.";
  } else {
    h2.innerText = "You lost! Press any key to restart.";
  }

  restart();
}


// -------------------------
// RESTART
// -------------------------
function restart() {
  gameStarted = false;
}
