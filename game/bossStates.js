const states = {
    RUNNINGL: 0,
    RUNNINGR : 1,
    ATTACKINGL: 2,   
    ATTACKINGR: 3,
    DEATH: 4,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class RunningL extends State {
    constructor(player){
        super('RUNNINGL');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 6;
    }

    handleInput(input){

    }
}

export class RunningR extends State {
    constructor(player){
        super('RUNNINGR');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 4;
        this.player.maxFrame = 6;
    }

    handleInput(input){

    }
}

export class AttackingL extends State {
    constructor(player){
        super('ATTACKINGL');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 6;
    }

    handleInput(input){

    }
}

export class AttackingR extends State {
    constructor(player){
        super('ATTACKINGR');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 6;
    }

    handleInput(input){

    }
}

export class Death extends State {
    constructor(player){
        super('DEATH');
        this.player = player;
    }

    enter(){
        this.player.frameX = 3;
        this.player.frameY = 2;
        this.player.maxFrame = 5;
    }

    handleInput(input){

    }
}

