const states = {
    STANDING: 0,
    RUNNINGL: 1,
    RUNNINGR : 2,
    ATTACKINGL: 3,   
    ATTACKINGR: 4,
    DEATH: 5,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Standing extends State {
    constructor(enemy){
        super('STANDING');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 3;
        this.enemy.maxFrame = 3;
    }

    handleInput(input){

    }
}

export class RunningL extends State {
    constructor(enemy){
        super('RUNNINGL');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 4;
        this.enemy.maxFrame = 7;
    }

    handleInput(input){

    }
}

export class RunningR extends State {
    constructor(enemy){
        super('RUNNINGR');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 5;
        this.enemy.maxFrame = 7;
    }

    handleInput(input){

    }
}

export class AttackingL extends State {
    constructor(enemy){
        super('ATTACKINGL');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 1;
        this.enemy.maxFrame = 7;
    }

    handleInput(input){

    }
}

export class AttackingR extends State {
    constructor(enemy){
        super('ATTACKINGR');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 0;
        this.enemy.maxFrame = 7;
    }

    handleInput(input){

    }
}

export class Death extends State {
    constructor(enemy){
        super('DEATH');
        this.enemy = enemy;
    }

    enter(){
        this.enemy.frameX = 3;
        this.enemy.frameY = 2;
        this.enemy.maxFrame = 0;
    }

    handleInput(input){

    }
}

