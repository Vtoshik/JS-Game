import { start } from "./main.js";
import { displayScore } from "./main.js";
export function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display;
}

let StartButton = document.getElementById("start-button");
StartButton.addEventListener("click", function() {
    start();
});
let ScoreButton = document.getElementById("score-button");
ScoreButton.addEventListener("click", function(){
    toggleScreen('container', false);
    toggleScreen('score', true);
    displayScore();
});
let HelpButton = document.getElementById("help-button");
HelpButton.addEventListener("click", function(){
    toggleScreen('container', false);
    toggleScreen('help', true);
});
let SettingsButton = document.getElementById("settings-button");
SettingsButton.addEventListener("click", function(){
    toggleScreen('container', false);  
    toggleScreen('settings', true);
});
let BackButton_1 = document.getElementById("back-button");
BackButton_1.addEventListener("click", function(){
    toggleScreen('help', false);
    toggleScreen('container', true);
});

let BackButton_2 = document.getElementById("back-button_1");
BackButton_2.addEventListener("click", function(){
    toggleScreen('settings', false);
    toggleScreen('container', true);
});

let BackButton_3 = document.getElementById("back-button_2");
BackButton_3.addEventListener("click", function(){
    toggleScreen('score', false);
    toggleScreen('container', true);
});

let Restart_Button = document.getElementById("game-over-button1");
Restart_Button.addEventListener("click", function(){
    toggleScreen('game-over-screen', false);
    toggleScreen('canvas', true);
    start();
});

let Back_Menu = document.getElementById("game-over-button2");
Back_Menu.addEventListener("click", function(){
    toggleScreen('game-over-screen', false);
    toggleScreen('container', true);
});

let Back_toMenu_from_WinScreen = document.getElementById("game-over-button3");
Back_toMenu_from_WinScreen.addEventListener("click", function(){
    toggleScreen('game-win-screen', false);
    toggleScreen('container', true);
});

