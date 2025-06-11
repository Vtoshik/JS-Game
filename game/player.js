import GameObject from "./gameobject.js";
import Item from "./item.js";
import { jumpingSound, PlayerAttackSound, EnemyAttackSound, PosionSound } from "./settings.js";
import { Standing, Running, Jumping, Falling, Attacking, Death } from "./playerStates.js";
import { Game_Levelss } from "./game.js";
import Block from "./block.js";
import Enemy from "./enemy.js";
//import { player } from "./game.js";
import Chest from "./chest.js";
export default class Player extends GameObject {
    constructor(x, y, width, height, id) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.img = document.getElementById(id);    
        this.velocity = 0;
        this.weight = 1;
        this.number_of_coins = 0;
        this.playerJumped = false;
        this.health = 200;
        this.MaxHealth = 200;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 8;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;
        this.states = [new Standing(this), new Running(this), new Jumping(this), new Falling(this), new Attacking(this), new Death(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.isDead = false;
        this.bonusAttack = false;
        this.attack = 50;
        this.isattack = false;
        this.lastHealthDecreaseTime = 0;
        this.lastEnemyHealthDecreaseTime = 0;
        this.allEnemyDied_level_1 = false;
        this.allEnemyDied_level_2 = false;
        this.bossDead = false;
        this.Healposion = 2;
        this.qKeyPressed = false;
        this.bonusAttack = false;
        this.bonusHp = false;
        this.bonusHpApplied = false;
    }
  
    move(game, deltaTime) {
      //Movement
      var last_x = this.x;
      var last_y = this.y;
      this.y += this.velocity;
      if (!this.isDead) {
        if (game.keys[65]) this.x -= 6;
        if (game.keys[68]) this.x += 6;
        if (game.keys[83]) this.y += 6;

        if (game.keys[87] && this.onGround()) 
        {
          this.velocity = -21;
          this.y -= 9;
          jumpingSound.currentTime = 0;
          jumpingSound.play();
          this.playerJumped = true;
          if (!game.keys[87]) {
            this.playerJumped = false;
          }
        } 
      }

      if (game.keys[88]){
        PlayerAttackSound.play();
      }


      if (game.keys[81]) {
        if (!this.qKeyPressed && this.Healposion != 0) {
            PosionSound.play();
            PosionSound.currentTime = 0;
            this.Healposion--;
            this.health += 50;
            if (this.health > 200) {
                this.health = 200;
            }
        }
        this.qKeyPressed = true;
        } else {
        this.qKeyPressed = false;
        for (let i = 0; i < game.scene.length; i++) {
          if (game.scene[i] instanceof Item){
            if (this.Healposion == 1 && game.scene[i].itemId == "health2") {
              game.scene[i].visible = false;
            } else if (this.Healposion == 0 && game.scene[i].itemId == "health1") {
              game.scene[i].visible = false;
            }
          }
        }
      }


      if (!this.onGround()) this.velocity += this.weight;
      else this.velocity = 0;

      if (this.x < -28) this.x = last_x;
      if (this.y > 315) this.y = last_y;

      if (game.level_pos == 5) {
        if (this.x > 875) this.x = last_x;
      }

      for (var i = 0; i < game.scene.length; i++) {
        if (game.scene[i] instanceof Item) {
          if (this.checkCollision(game.scene[i])) {
            game.scene[i].hide();
            game.scene[i].x = 0;
            game.scene[i].y = 0;
            this.number_of_coins += 1;
          }
        }
        if (game.scene[i] instanceof Enemy){
          if (game.scene[i].isDead) {
            //game.scene[i].setState(5);
            game.scene[i].inmove = false;
            game.scene[i].frameX = 3;
            game.scene[i].frameY= 2;
          }
          if (this.checkCollisionEnemy_Player(game.scene[i])){
            if (game.scene[i].x - this.x < 0){
              game.scene[i].setState(3);
            }
            else if (game.scene[i].x - this.x > 0){
              game.scene[i].setState(4);
            }
            this.isattack = true;
            if (this.isattack  && game.scene[i].y - this.y < 170 && !game.scene[i].isDead) {
                // Get the current time
                let currentTime = Date.now();
                // Check if at least 3 seconds have passed since the last health decrease
                if (currentTime - this.lastHealthDecreaseTime >= 2500) {
                    this.health -= game.scene[i].damage;
                    // Update the lastHealthDecreaseTime
                    this.lastHealthDecreaseTime = currentTime;
                }
            }
            if (this.isDead) {
                game.scene[i].inmove = true;
            }
          } else {
            game.scene[i].inmove = true;
            this.isattack = false;
          }
          if (this.checkCollisionPlayer_Enemy(game.scene[i])){
            if (game.keys[88]){
              let currentTime = Date.now();
              // Check if at least 3 seconds have passed since the last enemy health decrease
              if (currentTime - this.lastEnemyHealthDecreaseTime >= 1000) {
                game.scene[i].health -= this.attack;
                // Update the lastEnemyHealthDecreaseTime
                this.lastEnemyHealthDecreaseTime = currentTime;
              }
            }
          }
        }
        if (game.scene[i] instanceof Chest) {
          if(this.checkCollisionChest(game.scene[i])){

          }
        }
      }

      if (game.level_pos == 0) {
        for (let i = 0; i < game.scene.length; i++) {
          if (game.scene[i] instanceof Enemy && !game.scene[i].isDead) {
              this.allEnemyDied_level_1 = false;
              break;
          } else {
            this.allEnemyDied_level_1 = true;
          }
        }
      }
      if (game.level_pos == 1) {
        for (let i = 0; i < game.scene.length; i++) {
          if (game.scene[i] instanceof Enemy && !game.scene[i].isDead) {
            this.allEnemyDied_level_1 = false;
            break;
          } else {
            this.allEnemyDied_level_1 = true;
          }
        }
      }
      if (game.level_pos == 1) {
      if (this.allEnemyDied_level_1) {
        for (let i = 0; i < game.scene.length; i++) {
            if (game.scene[i] instanceof Chest && game.scene[i].ImgId == "chest1") {
                game.scene[i].canOpen = true;
                if (game.keys[69] && this.checkCollisionChest(game.scene[i])) {
                  game.scene[i].visible = true;
                  this.bonusAttack = true;
                  if (this.bonusAttack){
                    game.showImage("sword_art", 20000, 850, 380, 70, 50);
                    this.damage += 100;
                  }
                }
            }
        }
      }
      }

      if (game.level_pos == 2) {
        for (let i = 0; i < game.scene.length; i++) {
          if (game.scene[i] instanceof Enemy && !game.scene[i].isDead) {
              this.allEnemyDied_level_2 = false;
              break;
          } else {
            this.allEnemyDied_level_2 = true;
          }
        }
      }
      if (game.level_pos == 3) {
        for (let i = 0; i < game.scene.length; i++) {
          if (game.scene[i] instanceof Enemy && !game.scene[i].isDead) {
            this.allEnemyDied_level_2 = false;
            break;
          } else {
            this.allEnemyDied_level_2 = true;
          }
        }
      }
      if (game.level_pos == 3) {
        if (this.allEnemyDied_level_1) {
          for (let i = 0; i < game.scene.length; i++) {
              if (game.scene[i] instanceof Chest && game.scene[i].ImgId == "chest2") {
                  game.scene[i].canOpen = true;
                  if (game.keys[69] && this.checkCollisionChest(game.scene[i])) {
                    game.scene[i].visible = true;
                    this.bonusHp = true;
                    if (this.bonusHp && !this.bonusHpApplied){
                      this.health = 200;
                      this.Healposion = 2;
                      this.bonusHpApplied = true;
                      for (let i = 0; i < game.scene.length; i++) {
                        if (game.scene[i] instanceof Item && game.scene[i].itemId == "health2" || game.scene[i].itemId == "health1") {
                          game.scene[i].visible = true;
                        }
                      }
                    }
                  }
              }
          }
        }
      }



      if (this.x == 950) {
        game.level_pos +=1;
        game.scene = Game_Levelss[game.level_pos];
        this.x = 50;
      }
      if (this.x == -10 && game.level_pos > 0 ) {
        game.level_pos -=1;
        game.scene = Game_Levelss[game.level_pos];
        this.x = 950;
      }

      //Sprite Animation
      this.currentState.handleInput(game);
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      if (this.health <= 0) {
        this.isDead = true;
        this.health = 0;
        this.y = 345;
        this.setState(5);
        setInterval(() =>{
          this.frameY = 5;
          this.frameX = 7;
        }, 600);
      }

    }
    draw(context) {
      //context.fillStyle = "red";
      //context.fillRect(this.x, this.y, this.width - 100, this.height - 75);
      context.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width - 70, this.height - 70);
      this.drawHealthBar(context);
    }
    onGround(){
      return this.y >= 315;
    }

    checkCollision(other_object) {
      var dx = this.x - other_object.x;
      var dy = (this.y + 80)- other_object.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      //console.log(dx, dy, distance);
      //console.log((this.width - 70) / 2 + other_object.width / 2)
      return distance < (this.width - 130) / 2 + other_object.width / 2;
    }

    checkCollisionPlayer_Enemy(other_object) {
      return other_object.x - this.x < 25;
    }

    checkCollisionEnemy_Player(other_object) {
      return other_object.x - this.x <= 15;
    }

    checkCollisionChest(other_object) {
      return other_object.x - this.x < 75;
    }

    drawHealthBar(context) {
      
      context.beginPath();
      context.rect(770 - 10, 25 - 20, 220, 20);
      context.strokeStyle = 'gray';
      context.stroke();
    
      context.beginPath();
      context.rect(770 - 9, 25 - 18, (this.health / this.MaxHealth) * 216, 16);
      context.fillStyle = 'red';
      context.fill();
    }

    setState(state){
      this.currentState = this.states[state]
      this.currentState.enter();
    }

}