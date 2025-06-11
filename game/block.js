import GameObject from "./gameobject.js";
//import { player } from "./level_1.js";
//import Player from "./player.js";
export default class Block extends GameObject {
    constructor(x, y, id, width, height) {
      super(x, y);
      this.width = width;
      this.height = height;
      this.img = document.getElementById(id);
    }

    
  
    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /*handleCollision(player) {
      // Обробка колізії з фізичним блоком
      let overlapX = (player.width / 2 + this.width / 2) - Math.abs(player.x - this.x);
      let overlapY = (player.height / 2 + this.height / 2) - Math.abs(player.y - this.y);
      console.log(overlapX, overlapY);
      if (overlapX < overlapY) {
          // Горизонтальна колізія
          if (player.x >= this.x && player.y == this.y) {
              player.x -= 2;
          } 
      } else {
          // Вертикальна колізія
          if (player.y < this.y) {
              player.y = this.y - this.height / 2 - player.height / 2;
              player.velocity = 0;
              player.playerJumped = false;
          }  else if (overlapY == 0) {
              player.y = this.y + this.height / 2 + player.height / 2;
              player.velocity = 0;
          }
      }*/
      
      /*if (player.y + player.height - 1 >= this.y) {
        player.y = this.y - player.height + 1;
        player.onPlatform = true;
        player.velocity = 0;
      } else if (player.x + player.width <= this.x || player.x >= this.x + this.width) {
        if (player.y + player.height > this.y && player.y < this.y + this.height) {
            if (player.x + player.width <= this.x) {
                player.x = this.x - player.width;
            } else {
                player.x = this.x + this.width;
            }
        }
      }
        


    }*/


}
  