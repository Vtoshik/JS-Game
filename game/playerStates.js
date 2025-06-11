const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,   
    ATTACKING: 4,
    DEATH: 5,
}

class State {
    constructor(state){
        this.state = state;
    }
}

let attackanimfinish = false;

//standing
export class Standing extends State {
    constructor(player){
        super('STANDING');
        this.player = player;
        //this.attackanimfinish = false;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 5;
    }

    handleInput(input){
        if((input.keys[68] || input.keys[65])) {
            this.player.setState(states.RUNNING);
        } else if (input.keys[87]) {
            this.player.setState(states.JUMPING);
        } else if (input.keys[88]){
            attackanimfinish = true;
            this.player.setState(states.ATTACKING);
        }
    }
}

//running
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 7;
    }

    handleInput(input){
        if((!input.keys[68] && !input.keys[65])) {
            this.player.setState(states.STANDING);
        } else if (input.keys[87]) {
            this.player.setState(states.JUMPING);
        }
        else if (input.keys[88]){
            attackanimfinish = true;
            this.player.setState(states.ATTACKING);
        }
    }
}

//jumping
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        //if (this.player.onGround()) this.player.velocity -= 30;
        this.player.frameY = 3;
        this.player.maxFrame = 7;
    }

    handleInput(input){
        if(this.player.velocity > this.player.weight) {
            this.player.setState(states.FALLING);
        }
    }
}

//falling
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 4;
        this.player.maxFrame = 7;
    }

    handleInput(input){
        if(this.player.onGround()) {
            this.player.setState(states.STANDING);
        }
    }
}

//attacking
export class Attacking extends State {
    constructor(player){
        super('ATTACKING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 5;
    }

    handleInput(input){
        setTimeout(() => {
            attackanimfinish = true;
        }, 1000);
        if (!input.keys[88]){
            setTimeout(() => {
                this.player.setState(states.STANDING);
            }, 400);
        }
    }
}

//
export class Death extends State {
    constructor(player){
        super('DEATH');
        this.player = player;
    }

    enter(){
        this.player.frameY = 5;
    }

    handleInput(input){
        
    }
}