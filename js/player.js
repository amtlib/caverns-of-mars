class Player{
    constructor(){
        this.fuel = 100;
        this.score = 0;
        this.lives = 5;
        this.stage = 1;
        this.difficulty = Difficulty.novice;
        this.escape_time = 30
        
    }
    destroy_enemy(){
        this.score += 100;
    }
    destroy_fuel_tank(){
        this.fuel += 10;
        if(this.fuel> 100){
            this.fuel = 100;
        }
    }
    return_step(){
        this.fuel -= 0.1
        this.escape_time -=0.1
        console.log(this.fuel == Math.floor(this.fuel))
        if(this.fuel == Math.floor(this.fuel)){
            Sounds.play_returning_beep()
        }
    }
    destroy_fuel_ship(){
        this.fuel += 20;
        if(this.fuel> 100){
            this.fuel = 100;
        }
    }
    default_step(){
        this.score += 10;
        this.fuel--;
    }
    reset_fuel(){
        this.fuel = 100;
    }
    reset_score(){
        this.score = 0;
    }
    ship_destroyed(){
        if(this.lives == 0){
            this.lives = 5;
            game_status.display_game_over_screen(this.score)
        }
        this.lives--;
    }
}