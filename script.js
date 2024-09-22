const gameBoard = document.querySelector("#game-board");
const attempsDisplay = document.querySelector("#attempts");
const messageDisplay = document.querySelector("#message");

let totalAttempts = 6;

let randonNumber = Math.floor(Math.random() * 40) + 1;
console.log(randonNumber);
generatingCricles();

function generatingCricles() {
    for (let i = 1; i <= 40; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.textContent = i;
        circle.addEventListener("click", () => handleGuess(i, circle));
        gameBoard.appendChild(circle);
    }

}

function handleGuess(selectedNumber, circleElement) {
    if (totalAttempts > 0) {
        totalAttempts--;
        attempsDisplay.textContent = `You Have ${totalAttempts} Turns Left`;

        if (selectedNumber === randonNumber) {
            circleElement.classList.add("correct");
            messageDisplay.textContent = "Congrats! You guessed it Correctly.";
            hideAllCircles();
            attempsDisplay.textContent = "";
            playAgainButton()

        }
        else if (selectedNumber < randonNumber) {
            circleElement.classList.add("lower");
            messageDisplay.textContent = "Go Higher ,Your Guess is Low.";
        }
        else {
            circleElement.classList.add("higher");
            messageDisplay.textContent = "Go Lower ,Your Guess is High.";
        }

        if (totalAttempts === 0 && selectedNumber != randonNumber) {
            messageDisplay.textContent = "Game Over! Better luck Next Time";
            hideAllCircles();
            playAgainButton();

        }
    }

}
function hideAllCircles() {
    gameBoard.querySelectorAll(".circle").forEach(circle => {
        if (!circle.classList.contains("correct")) {
            circle.style.display = "none";
        }
    });
}
function playAgainButton() {

    const button = document.createElement("button");
    button.textContent = "Play Again";
    button.classList.add("play-again-btn");
    document.body.appendChild(button);

    button.addEventListener("click", resetGame);
}

function resetGame() {
    totalAttempts = 6;
    randonNumber = Math.floor(Math.random() * 40) + 1;
    console.log(randonNumber);

    gameBoard.innerHTML = "";
    messageDisplay.textContent = "";
    attempsDisplay.textContent = `You Have ${totalAttempts} Turns `;

    generatingCricles();

    const playAgainButton = document.querySelector(".play-again-btn");
    if (playAgainButton) {
        playAgainButton.remove();
    }
}