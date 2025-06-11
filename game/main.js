import { toggleScreen } from "./menu.js";
import Game from "./game.js";
import { num } from "./game.js";

let scores = [];
let name;
let currentGame = null;

export function start() {
    toggleScreen('container', false);
    name = prompt("Enter your name:") || "Anonymous";
    startNewGame();
}

export function displayScore() {
    let table = document.getElementById("score-table");
  
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
  
    for (let i = 0; i < scores.length; i++) {
        let row = table.insertRow(-1);
        let nameCell = row.insertCell(0);
        let coinsCell = row.insertCell(1);
        nameCell.innerHTML = scores[i].name;
        coinsCell.innerHTML = scores[i].number_of_coins;
    }
  
    table.style.display = "block";
}

function startNewGame() {
    if (currentGame) {
        currentGame.cleanup();
        document.removeEventListener('keydown', currentGame.boundKeyDown);
        document.removeEventListener('keyup', currentGame.boundKeyUp);
        currentGame = null;
    }
    
    currentGame = new Game();
    
    currentGame.boundKeyDown = currentGame.onkeydown.bind(currentGame);
    currentGame.boundKeyUp = currentGame.onkeyup.bind(currentGame);
    
    document.addEventListener('keydown', currentGame.boundKeyDown);
    document.addEventListener('keyup', currentGame.boundKeyUp);

    toggleScreen('canvas', true);
    currentGame.startGame();
}

document.getElementById('game-over-button1').addEventListener('click', () => {
    toggleScreen('game-over-screen', false);
    startNewGame();
});

export { name, scores };
