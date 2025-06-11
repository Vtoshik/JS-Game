export default class GameObject {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.physical = true;
    }
  
    move(game) {}

    checkCollision(scene) {
        for (var i in scene) {
            var obj = scene[i];
            if (obj == this || !obj.physical) continue;
            var test =
            this.x >= obj.x + obj.size ||
            this.x + this.size <= obj.x ||
            this.y >= obj.y + obj.size ||
            this.y + this.size <= obj.y;
  
            if (!test) {
                return obj;
            }
        }
        return false;
    }
}