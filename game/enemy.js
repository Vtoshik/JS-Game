import GameObject from "./gameobject.js";
import { Standing, RunningL, RunningR, AttackingL, AttackingR, Death } from "./enemyStates.js";
import Player from "./player.js";

export default class Enemy extends GameObject {
    constructor(x, y, width, height, id, health, damage){
        super(x, y);
        this.width = width;
        this.height = height;
        this.img = document.getElementById(id); 
        this.health = health;
        this.maxHealth = health;
        this.frameX = 0;
        this.frameY = 3;
        this.maxFrame;
        this.fps = 15;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;
        this.states = [
            this.createState(Standing),
            this.createState(RunningL),
            this.createState(RunningR),
            this.createState(AttackingL),
            this.createState(AttackingR),
            this.createState(Death)
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.isDead = false;
        this.startX = x;
        this.direction = "right";
        this.inmove = true;
        this.damage = damage;
        this.deathAnimationPlayed = false;
        this.deathAnimationFrame = 0;
    }

    createState(StateClass) {
        const state = new StateClass(this);
        delete state.player;
        return state;
    }

    move(game, deltaTime){
        if (!this.isDead){
            if (this.inmove){
                if (this.direction === "left") {
                    this.x -= 1;
                    if (this.x <= this.startX - 100) {
                    this.direction = "right";
                    this.setState(2);
                    }
                } else {
                    this.x += 1;
                if (this.x >= this.startX + 100) {
                    this.direction = "left";
                    this.setState(1);
                }
                }
            }
        }

        if (this.isDead && !this.deathAnimationPlayed) {
            this.deathAnimationPlayed = true;
            //this.setState(5);
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
            // update frameX and frameY to play the death animation
            /*this.frameTimer += 1;
            if (this.frameTimer > this.fpsInterval) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                    if (this.frameX == 3) {
                        this.deathAnimationPlayed = true;
                    }
                }
                this.frameTimer = 0;
            }*/
            this.frameX = 3;
            this.frameY = 2;
        }

        if (this.health <= 0) {
            this.isDead = true;
            this.health = 0;
            //this.setState(5);
            /*setInterval(() =>{
                this.frameY = 2;
                this.frameX = 0;
            }, 600);*/
        }
    }

    moveTowardsPlayer(player) {
        if (!this.isDead){
            let dx = player.x - 45 - this.x;
            let dy = player.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                this.x += dx / distance;
            }
        }
    }

    draw(context) {
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
        let healthBarWidth = (this.health / this.maxHealth) * this.width;
        // Set the position and dimensions of the health bar
        let x = this.x + 70;
        let y = this.y + 80; // Draw the health bar 20 pixels above the enemy
        let width = healthBarWidth;
        let height = 10; // Set the height of the health bar to 10 pixels
        // Set the fill style and draw the health bar
        context.fillStyle = "red";
        context.fillRect(x, y, width, height);
  
    }
  
      setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
        if (this.health == 0 && this.isDead){
            this.currentState = this.states[5];
            this.currentState.enter();
            this.deathAnimationPlayed
        }
      }
}