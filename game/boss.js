import GameObject from "./gameobject.js";
import { RunningL, RunningR, AttackingL, AttackingR, Death } from "./bossStates.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
import { toggleScreen } from "./menu.js";

export default class Boss extends Enemy {
    constructor(x, y, width, height, id, health, damage){
        super(x, y);
        this.width = width;
        this.height = height;
        this.img = document.getElementById(id); 
        this.health = health;
        this.maxHealth = health;
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrame;
        this.fps = 15;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;
        this.states = [new RunningL(this), new RunningR(this), new AttackingL(this), new AttackingR(this), new Death(this)];
        this.currentState = this.states[1];
        this.currentState.enter();
        this.isDead = false;
        this.startX = x;
        this.direction = "right";
        this.inmove = true;
        this.damage = damage;
        this.deathAnimationPlayed = false;
        this.deathAnimationFrame = 0;
    }

    move(game, deltaTime){
        if (!this.isDead){
            if (this.inmove){
                if (this.direction === "left") {
                    this.y = 350;
                    this.x -= 1;
                    if (this.x <= this.startX - 100) {
                    this.direction = "right";
                    this.setState(1);
                    }
                } else {
                    this.y = 345;
                    this.x += 1;
                if (this.x >= this.startX + 100) {
                    this.direction = "left";
                    this.setState(0);
                }
                }
            }
        }

        if (this.isDead && !this.deathAnimationPlayed) {
            this.deathAnimationPlayed = true;
        }


        this.currentState.handleInput(game);
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        } 


        if (this.currentState instanceof Death) {
            this.frameX = 3;
            this.frameY = 2;
        }

        if (this.health <= 0) {
            this.isDead = true;
            this.health = 0;
        }

        if (this.health == 0) {
            toggleScreen("canvas", false);
            toggleScreen("game-win-screen", true);
            this.health = 1;
            game.game_win = true;
        }
    }

    moveTowardsPlayer(player) {
        if (!this.isDead){
            let dx = player.x - 45 - this.x;
            let dy = player.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                this.x += dx / distance;
            }
        }
    }

    draw(context) {
        //context.fillStyle = "red";
        //context.fillRect(this.x, this.y, this.width - 100, this.height - 75);
        context.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 2, this.height * 2);
        this.drawHealthBar(context);
    }

    update(distanceToPlayer, shouldMoveTowardsPlayer, player) {
        if (shouldMoveTowardsPlayer) {
            this.inmove = false;
            // Move towards the player
            this.moveTowardsPlayer(player);
        } else {
            this.inmove = true;
            // Move left or right
        }
    }


    drawHealthBar(context) {
        let healthBarWidth = (this.health / this.maxHealth) * this.width * 3;
        // Set the position and dimensions of the health bar
        let x = this.x - 55;
        let y = this.y - 15; // Draw the health bar 20 pixels above the enemy
        let width = healthBarWidth;
        let height = 10; // Set the height of the health bar to 10 pixels
        // Set the fill style and draw the health bar
        context.fillStyle = "red";
        context.fillRect(x, y, width, height + 3);
  
    }
  
      setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
        if (this.health == 0 && this.isDead){
            this.currentState = this.states[4];
            this.currentState.enter();
            this.deathAnimationPlayed
        }
      }
}