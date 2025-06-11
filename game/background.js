import GameObject from "./gameobject.js";
export default class Background extends GameObject {
    constructor(id, width, height) {
      super(0, 0);
      this.width = width;
      this.height = height;
      this.img = document.getElementById(id);
    }
    
    draw(context) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}