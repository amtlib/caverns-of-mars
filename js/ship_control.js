class ShipControl {
    constructor(ship) {
        this.ship = ship;
        this.ship_up = false;
        this.ship_down = false;
        this.ship_left = false;
        this.ship_right = false;
        let that = this;
        window.addEventListener('keydown', function (e) {
            if(game_status.accual_screen == 'entry'){
                if(e.keyCode == 32){
                    game_status.display_game_screen();
                }else if(e.keyCode == 38){ //up
                    if(player.difficulty.name == 'NOVICE'){
                        player.difficulty = Difficulty.pilot;
                    }else if(player.difficulty.name == 'PILOT'){
                        player.difficulty = Difficulty.warrior;
                    }else if(player.difficulty.name == 'WARRIOR'){
                        player.difficulty = Difficulty.commander;
                    }else if(player.difficulty.name == 'COMMANDER'){
                        player.difficulty = Difficulty.novice;
                    }
                }else if(e.keyCode == 40){ //down
                    if(player.difficulty.name == 'NOVICE'){
                        player.difficulty = Difficulty.commander;
                    }else if(player.difficulty.name == 'PILOT'){
                        player.difficulty = Difficulty.novice;
                    }else if(player.difficulty.name == 'WARRIOR'){
                        player.difficulty = Difficulty.pilot;
                    }else if(player.difficulty.name == 'COMMANDER'){
                        player.difficulty = Difficulty.warrior;
                    }
                }
            }
            else if (game_status.accual_screen == 'game') {
                switch (e.keyCode) {
                    case 38: //arrow up
                        that.ship_up = true;
                        break;
                    case 40: //arrow down
                        that.ship_down = true;
                        break;

                    case 37: //arrow left
                        that.ship_left = true;
                        break;

                    case 39: //arrow right
                        that.ship_right = true;
                        break;
                    case 32: //spacebar - shoot!
                        if (!game_stopped)
                            that.ship.shoot();
                        break;
                    case 72: //H - stop the game
                        if (game_stopped) {
                            game_stopped = false;
                            Sounds.play_theme_sound()
                        } else {
                            game_stopped = true;
                            Sounds.stop_theme_sound()
                        }
                        break;
                    case 27: // ESC - go to the entry screen
                        game_status.display_entry_screen();
                        break;
                }
            }
        })

        window.addEventListener('keyup', function (e) {
            switch (e.keyCode) {
                case 38: //arrow up
                    that.ship_up = false;
                    break;

                case 40: //arrow down
                    that.ship_down = false;
                    break;

                case 37: //arrow left
                    that.ship_left = false;
                    break;

                case 39: //arrow right
                    that.ship_right = false;
                    break;

            }
        })

    }
    update() {
        if (this.ship_up) {
            this.ship.go(Direction.UP);
        }
        if (this.ship_down) {
            this.ship.go(Direction.DOWN);
        }
        if (this.ship_left) {
            this.ship.go(Direction.LEFT);
        }
        if (this.ship_right) {
            this.ship.go(Direction.RIGHT);
        }
    }
}
