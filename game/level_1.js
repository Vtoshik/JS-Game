import Background from "./background.js"
import Block from "./block.js"
import Item from "./item.js"
import Player from "./player.js"
import Enemy from "./enemy.js"
import Observer from "./observer.js"
import Chest from "./chest.js"
import Boss from "./boss.js"


let observer = new Observer();
let player = new Player(50, 317, 224, 230, "player");
let health_1 = new Item(10, 4, "health", 35, 30, "health1");
let health_2 = new Item(45, 4, "health", 35, 30, "health2");
let goblin1 = new Enemy(600, 265, 150, 150, "goblin", 100, 15);
let goblin2 = new Enemy(200, 265, 150, 150, "goblin", 100, 20);
let mushroom1 = new Enemy(600, 265, 150, 150, "mushroom", 100, 100);
let mushroom2 = new Enemy(400, 265, 150, 150, "mushroom", 100, 10);
let boss = new Boss(600, 345, 64, 73, "boss", 300, 50);
let mushroom3 = new Enemy(250, 265, 150, 150, "mushroom", 100, 10);
let mushroom4 = new Enemy(500, 265, 150, 150, "mushroom", 100, 10);

function level_1(player, goblin1, health_1, health_2 ) {
    return [
        new Background("level-1-background", 1000, 530),
        new Block(-19, 439, "level-1-block-3", 120, 120),
        new Block(75, 438, "level-1-block-2",120, 120),
        new Block(164, 438, "level-1-block-1",120, 120),
        new Block(258, 438, "level-1-block-2",120, 120),
        new Block(347, 438, "level-1-block-1",120, 120),
        new Block(438, 438, "level-1-block-1",120, 120),
        new Block(532, 439, "level-1-block-4",120, 120),
        new Block(611, 439, "level-1-block-3",120, 120),
        new Block(705, 438, "level-1-block-2",123, 120),
        new Block(796, 438, "level-1-block-1",123, 120),
        new Block(892, 438, "level-1-block-2",123, 120),
        new Item(380, 410, "coin", 60, 50, "coin"),
        new Item(450, 410, "coin", 60, 50, "coin"),
        new Item(540, 255, "coin", 60, 50, "coin"),
        new Item(620, 255, "coin", 60, 50, "coin"),
        new Item(700, 410, "coin", 60, 50, "coin"),
        new Item(770, 410, "coin", 60, 50, "coin"),
        new Item(850, 310, "coin", 60, 50, "coin"),
        goblin1,
        player,
        health_1,
        health_2

    ]
}

function level_1_continue(player, goblin2, health_1, health_2) {
    return [
        new Background("level-1-background", 1000, 530),
        new Block(-19, 439, "level-1-block-3", 120, 120),
        new Block(75, 438, "level-1-block-2",120, 120),
        new Block(164, 438, "level-1-block-1",120, 120),
        new Block(258, 438, "level-1-block-2",120, 120),
        new Block(347, 438, "level-1-block-1",120, 120),
        new Block(438, 438, "level-1-block-1",120, 120),
        new Block(532, 439, "level-1-block-4",120, 120),
        new Block(611, 439, "level-1-block-3",120, 120),
        new Block(705, 438, "level-1-block-2",123, 120),
        new Block(796, 438, "level-1-block-1",123, 120),
        new Block(892, 438, "level-1-block-2",123, 120),
        new Item(100, 150, "coin", 60, 50, "coin"),
        new Item(200, 150, "coin", 60, 50, "coin"),
        new Item(400, 150, "coin", 60, 50, "coin"),
        new Item(470, 150, "coin", 60, 50, "coin"),
        new Item(540, 150, "coin", 60, 50, "coin"),
        new Item(680, 410, "coin", 60, 50, "coin"),
        new Item(750, 410, "coin", 60, 50, "coin"),
        new Item(850, 150, "coin", 60, 50, "coin"),
        goblin2,
        health_1,
        health_2,
        new Chest(850, 420, "chest", 70, 50, "chest1"),
        player
    ]
}

function level_2(player, health_1, health_2, mushroom1) {
    return [
        new Background("level-2-background", 1000, 530),
        new Block(-19, 455, "level-2-block-1", 100, 100),
        new Block(77, 455, "level-2-block-2", 100, 100),
        new Block(169, 455, "level-2-block-1", 100, 100),
        new Block(265, 455, "level-2-block-2", 100, 100),
        new Block(353, 455, "level-2-block-1", 100, 100),
        new Block(450, 455, "level-2-block-2", 100, 100),
        new Block(537, 455, "level-2-block-1", 100, 100),
        new Block(634, 455, "level-2-block-2", 100, 100),
        new Block(726, 455, "level-2-block-1", 100, 100),
        new Block(823, 455, "level-2-block-2", 100, 100),
        new Block(910, 455, "level-2-block-1", 100, 100),
        new Item(100, 150, "coin", 60, 50, "coin"),
        new Item(300, 150, "coin", 60, 50, "coin"),
        new Item(500, 150, "coin", 60, 50, "coin"),
        new Item(850, 150, "coin", 60, 50, "coin"),
        mushroom1,
        player,
        health_1,
        health_2
    ]
}

function level_2_continue(player, mushroom2, health_1, health_2) {
    return [
        new Background("level-2-background", 1000, 530),
        new Background("level-2-background", 1000, 530),
        new Block(-19, 455, "level-2-block-1", 100, 100),
        new Block(77, 455, "level-2-block-2", 100, 100),
        new Block(169, 455, "level-2-block-1", 100, 100),
        new Block(265, 455, "level-2-block-2", 100, 100),
        new Block(353, 455, "level-2-block-1", 100, 100),
        new Block(450, 455, "level-2-block-2", 100, 100),
        new Block(537, 455, "level-2-block-1", 100, 100),
        new Block(634, 455, "level-2-block-2", 100, 100),
        new Block(726, 455, "level-2-block-1", 100, 100),
        new Block(823, 455, "level-2-block-2", 100, 100),
        new Block(910, 455, "level-2-block-1", 100, 100),
        new Chest(850, 420, "chest", 70, 50, "chest2"),
        new Item(100, 150, "coin", 60, 50, "coin"),
        new Item(400, 150, "coin", 60, 50, "coin"),
        new Item(700, 150, "coin", 60, 50, "coin"),
        mushroom2,
        health_1,
        health_2,
        player
    ]
}

function level_3(player, health_1, health_2, mushroom3, mushroom4) {
    return [
        new Background("level-3-background", 1000, 530),
        new Item(400, 410, "coin", 60, 50, "coin"),
        new Item(700, 410, "coin", 60, 50, "coin"),
        mushroom3,
        mushroom4,
        health_1,
        health_2,
        player
    ]
}

function level_3_continue(player, health_1, health_2, boss) {
    return [
        new Background("level-3-background", 1000, 530),
        health_1,
        health_2,
        boss,
        player
    ]
}


export let Game_Levels = [ 
    level_1( player, goblin1, health_1, health_2),
    level_1_continue(player, goblin2, health_1, health_2),
    level_2(player, health_1, health_2, mushroom1),
    level_2_continue(player, mushroom2, health_1, health_2),
    level_3(player, health_1, health_2, mushroom3, mushroom4),
    level_3_continue(player, health_1, health_2, boss)
];

observer.subscribe(goblin1.update.bind(goblin1));
observer.subscribe(mushroom1.update.bind(mushroom1));
observer.subscribe(goblin2.update.bind(goblin2));
observer.subscribe(mushroom2.update.bind(mushroom2));
observer.subscribe(boss.update.bind(boss));
observer.subscribe(mushroom3.update.bind(mushroom3));
observer.subscribe(mushroom4.update.bind(mushroom4));

export function observ(){
    observer.notify(player, goblin1);
    observer.notify(player, mushroom1);
    observer.notify(player, goblin2);
    observer.notify(player, mushroom2);
    observer.notify(player, boss);
    observer.notify(player, mushroom3);
    observer.notify(player, mushroom4);
}


export { player, health_1, health_2}
