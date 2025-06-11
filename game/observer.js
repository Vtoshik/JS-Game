export default class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    notify(player, enemy) {
        let dx = player.x - 45 - enemy.x;
        let dy = player.y - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let shouldMoveTowardsPlayer = distance < 200;
        this.observers.forEach(observer => observer(distance, shouldMoveTowardsPlayer, player));
    }
}