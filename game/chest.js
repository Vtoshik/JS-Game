import GameObject from "./gameobject.js";

export default class Chest extends GameObject {
    constructor(x, y, id, width, height, ImgId) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.img = document.getElementById(id);
        this.frameX = 0;
        this.visible = false;
        this.canOpen = false;
        this.ImgId = ImgId
    }

    move(game){
        /*if (this.canOpen === true) {
            this.visible = false;
        }*/
    }

    draw(context) {
        if (this.canOpen && !this.visible) {
            context.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
        if (this.visible) {
            this.img = document.getElementById("chest_opened");
            context.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}