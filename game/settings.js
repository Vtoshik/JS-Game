import { toggleScreen } from "./menu.js";
let context = new AudioContext();

let music = new Audio('/music/music_1.mp3');
let jumpingSound = new Audio('/sounds/skok.wav');
let PlayerAttackSound = new Audio('/sounds/playerAttack.wav');
let EnemyAttackSound = new Audio('/sounds/enemyAttack.wav');
let PosionSound = new Audio('/sounds/Posion.wav');

// Create gain nodes for music and sound effects
var musicGain = context.createGain();
var soundGain = context.createGain();

// Connect the audio nodes to the gain nodes
let musicSource = context.createMediaElementSource(music);
musicSource.connect(musicGain);
musicGain.connect(context.destination);

let jumpingSource = context.createMediaElementSource(jumpingSound);
let playerAttackSource = context.createMediaElementSource(PlayerAttackSound);
let enemyAttackSource = context.createMediaElementSource(EnemyAttackSound);
let posionSource = context.createMediaElementSource(PosionSound);
playerAttackSource.connect(soundGain);
enemyAttackSource.connect(soundGain);
posionSource.connect(soundGain);
jumpingSource.connect(soundGain);
soundGain.connect(context.destination);

let musicSlider = document.getElementById("music-volume");
musicSlider.addEventListener("input", function() {
    let volume = musicSlider.value / 100;
    musicGain.gain.value = volume;
    if (musicSlider.value == 0) {
        document.getElementById("sound-on-1").style.display = "none";
        document.getElementById("sound-off-1").style.display = "block";
    }
    else {
        document.getElementById("sound-on-1").style.display = "block";
        document.getElementById("sound-off-1").style.display = "none";
    }
});

let soundSlider = document.getElementById("sound-volume");
soundSlider.addEventListener("change", function() {
    let volume_1 = soundSlider.value / 100;
    soundGain.gain.value = volume_1;
    if (soundSlider.value == 0) {
        document.getElementById("sound-on-2").style.display = "none";
        document.getElementById("sound-off-2").style.display = "block";
    }
    else {
        document.getElementById("sound-on-2").style.display = "block";
        document.getElementById("sound-off-2").style.display = "none";
    }
});



music.play();
music.autoplay = true;
music.loop = true;

export { jumpingSound, PlayerAttackSound, EnemyAttackSound, PosionSound }