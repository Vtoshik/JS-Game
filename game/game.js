import InputHandler from "./input.js";
import { toggleScreen } from "./menu.js";
import { scores } from "./main.js";
import { name } from "./main.js";
import Player from "./player.js";
import { Game_Levels } from "./level_1.js";
import { player, observ} from "./level_1.js";
import Enemy from "./enemy.js";
import Boss from "./boss.js";
import Item from "./item.js";
import Chest from "./chest.js";
let num = 0;
let lastTime = 0;
const saved_game_levels = Game_Levels;
let Game_Levelss = Game_Levels;
export default class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 530;
        this.level = 1;
        this.level_pos = 0;
        this.keys = [];
        this.scene = Game_Levelss[this.level_pos];
        this.input = new InputHandler;
        this.game_win = false;
        this.animationId = null;
        this.restart = false;
        this.boundKeyDown = null;
        this.boundKeyUp = null;
    }
    onkeydown(event) {
        this.keys[event.keyCode] = true;
    }
    
    onkeyup(event) {
        this.keys[event.keyCode] = false;
    }

    cleanup() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    showImage(imageId, displayTime, x, y, width, height) {
      const imageElement = document.getElementById(imageId);
      this.ctx.drawImage(imageElement, x, y, width, height);
      setTimeout(() => {
        this.ctx.clearRect(x, y, width, height);
      }, displayTime);
    }

    resetGame() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        this.restart = true;
        this.level_pos = 0;
        this.scene = Game_Levelss[this.level_pos];
        
        for (let i = 0; i < this.scene.length; i++) {
            if (this.scene[i] instanceof Player){
                this.scene[i] = new Player(50, 317, 224, 230, "player");
                this.scene[i].Healposion = 2;
                this.scene[i].bonusAttack = false;
                this.scene[i].bonusHp = false;
                this.scene[i].bonusHpApplied = false;
                this.scene[i].allEnemyDied_level_1 = false;
                this.scene[i].allEnemyDied_level_2 = false;
                this.scene[i].bossDead = false;
                this.scene[i].number_of_coins = 0;
            }
        }
        
        this.level_pos = 0;
        this.scene[19] = new Enemy(600, 265, 150, 150, "goblin", 100, 15);

        this.level_pos = 1;
        this.scene = Game_Levelss[this.level_pos];
        this.scene[20] = new Enemy(200, 265, 150, 150, "goblin", 100, 20);

        this.level_pos = 2;
        this.scene = Game_Levelss[this.level_pos];
        this.scene[16] = new Enemy(600, 265, 150, 150, "mushroom", 100, 100);

        this.level_pos = 3;
        this.scene = Game_Levelss[this.level_pos];
        this.scene[17] = new Enemy(400, 265, 150, 150, "mushroom", 100, 10);

        this.level_pos = 4;
        this.scene = Game_Levelss[this.level_pos];
        this.scene[3] = new Enemy(200, 265, 150, 150, "mushroom", 100, 10);
        this.scene[4] = new Enemy(400, 265, 150, 150, "mushroom", 100, 10);

        this.level_pos = 5;
        this.scene = Game_Levelss[this.level_pos];
        this.scene[3] = new Boss(600, 345, 64, 73, "boss", 200, 100);

        for (let i = 0; i < 6; i++) {
            this.scene = Game_Levelss[i];
            for (let j = 0; j < this.scene.length; j++) {
                if (this.scene[j] instanceof Enemy){
                    this.scene[j].isDead = false;
                    this.scene[j].inmove = true;
                    this.scene[j].health = 100;
                    this.scene[j].deathAnimationPlayed = false;
                }
                else if (this.scene[j] instanceof Boss){
                    this.scene[j].isDead = false;
                    this.scene[j].inmove = true;
                    this.scene[j].health = 200;
                    this.scene[j].deathAnimationPlayed = false;
                }
                else if (this.scene[j] instanceof Item){
                    this.scene[j].hide();
                }
                else if (this.scene[j] instanceof Chest){
                    this.scene[j].visible = false;
                    this.scene[j].canOpen = false;
                }
            }
        }

        this.level_pos = 0;
        this.scene = Game_Levelss[this.level_pos];

        this.keys = [];
        this.game_win = false;

        const replacer = (key, value) => {
            if (['currentState', 'ctx', 'canvas'].includes(key)) return undefined;
            return value;
        };

        Game_Levelss = Game_Levels.map(level => 
            level.map(obj => {
                if (obj instanceof Enemy) {
                    return new Enemy(
                        obj.x, obj.y, 
                        obj.width, obj.height, 
                        obj.id, 
                        obj.maxHealth, 
                        obj.damage
                    );
                }
                if (obj instanceof Boss) {
                    return new Boss(
                        obj.x, obj.y, 
                        obj.width, obj.height, 
                        obj.id, 
                        obj.maxHealth, 
                        obj.damage
                    );
                }
                if (obj instanceof Player) {
                    const p = new Player(
                        obj.x, obj.y, 
                        obj.width, obj.height, 
                        obj.id
                    );
                    Object.assign(p, obj);
                    return p;
                }
                return { ...obj };
            })
        );
        
        scores.push({ 
            name: name, 
            number_of_coins: num
        });
        
        this.startGame();
    }

    getSafeScores() {
        const replacer = (key, value) => {
            if (key === 'player' || key === 'states') return undefined;
            return value;
        };
        return JSON.parse(JSON.stringify(scores, replacer));
    }


    checkForGameOver() {
        if (this.keys[75] || this.game_win || player.health <= 0) {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            if (this.keys[75] || player.health <= 0) {
                toggleScreen('canvas', false);
                toggleScreen('game-over-screen', true);
            }
            
            this.resetGame();
        } else {
            observ();
            this.game_win = false;
        }
    }

    gameloop(timeStamp) {
        if (this.restart) {
            lastTime = timeStamp;
            this.restart = false;
        }
        
        const deltaTime = timeStamp - lastTime;
        num = player.number_of_coins;
        lastTime = timeStamp;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (var i = 0; i < this.scene.length; i++) {
            this.scene[i].draw(this.ctx);
            this.scene[i].move(this, deltaTime);
        }
        
        if (!this.game_win && player.health > 0 && !this.keys[75]) {
            this.animationId = requestAnimationFrame(this.gameloop.bind(this));
        }
        
        this.checkForGameOver();
    }

    startGame() {
        lastTime = 0;
        this.restart = true;
        this.animationId = requestAnimationFrame(this.gameloop.bind(this));
    }
}
let game_height = canvas.height;
export { num }
export { game_height }
export { Game_Levelss , player}

  