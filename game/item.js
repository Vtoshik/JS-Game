import GameObject from "./gameobject.js";
export default class Item extends GameObject {
    constructor(x, y, id, width, height, itemId) {
      super(x, y);
      this.width = width;
      this.height = height;
      this.img = document.getElementById(id);
      this.visible = true;
      this.itemId = itemId;
    }

    move(game, deltaTime) {
        
    }
  
    draw(context) {
            if(this.visible == true) {
                context.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
    }

    hide() {
        if (this.visible) {
            this.visible = false;
        }
        else {
            this.visible = true;
        }
    }

}