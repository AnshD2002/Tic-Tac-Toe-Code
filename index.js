// Function to change player 1's name
function changePlayer1Name() {
    let player1 = prompt("Enter Player 1's Name:");
    if (player1) {
        document.querySelector(".change-name1").textContent = player1;
    }
}

// Function to change player 2's name
function changePlayer2Name() {
    let player2 = prompt("Enter Player 2's Name:");
    if (player2) {
        document.querySelector(".change-name2").textContent = player2;
    }
}

// Add event listeners to name change buttons
document.querySelector(".change-name1").addEventListener("click", changePlayer1Name);
document.querySelector(".change-name2").addEventListener("click", changePlayer2Name);

let boxes = document.querySelectorAll(".row");
let nextBtn = document.querySelector(".next");
let resultShow = document.querySelector(".show-result");
let result = document.querySelector(".results");
let turnO = true; // true for 'O', false for 'X'

// Initialize scores
let score1 = 0;
let score2 = 0;
let score_1 = document.querySelector(".score-btn1");
let score_2 = document.querySelector(".score-btn2");
score_1.innerText = score1;
score_2.innerText = score2;

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check the winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            result.innerHTML = `<h2>Congratulations!</h2><h3>${pos1} has won!</h3>`;
            resultShow.style.display = "flex"; // Show the popup message
            updateScore(pos1);
            return true;
        }
    }

    // Check for a tie
    if ([...boxes].every(box => box.innerText !== "")) {
        result.innerHTML = `<h2>It's a tie!</h2>`;
        resultShow.style.display = "flex"; // Show the popup message
        return true;
    }

    return false;
};

// Function to update the score
const updateScore = (winner) => {
    if (winner === "O") {
        score1++;
        score_1.innerText = score1;
    } else if (winner === "X") {
        score2++;
        score_2.innerText = score2;
    }
};

// Function to handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            checkWinner();
        }
    });
});

// Function to reset the game for a new round
nextBtn.addEventListener("click", () => {
    boxes.forEach(box => box.innerText = "");
    resultShow.style.display = "none"; // Hide the popup message
    turnO = true;
});


// Add event listeners to score buttons
document.querySelector(".score-btn1").addEventListener("click", () => handleScoreButtonClick("player1"));
document.querySelector(".score-btn2").addEventListener("click", () => handleScoreButtonClick("player2"));

// Close result popup
resultShow.querySelector("button").addEventListener("click", () => {
    resultShow.style.display = "none"; // Hide the popup message
});
