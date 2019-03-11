class Ship {
    constructor(position_x, position_y, player) {
        this.ignored_colors_for_collision = ['rgb(255, 190, 173)', 'rgb(231, 173, 157)', 'rgb(69, 119, 176)', 'rgb(94, 112, 166)', 'rgb(75, 119, 169)', 'rgb(108, 36, 90)', 'rgb(84, 43, 94)', 'rgb(74, 132, 183)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(19, 19, 19)', 'rgb(87, 129, 183)', 'rgb(231, 185, 174)', 'rgb(67, 14, 60)', 'rgb(255, 204, 191)', 'rgb(98, 140, 191)', 'rgb(255, 197, 183)', 'rgb(236, 196, 191)', 'rgb(69, 144, 232)', 'rgb(69, 120, 171)', 'rgb(83, 116, 155)', 'rgb(105, 38, 89)', 'rgb(69, 121, 169)', 'rgb(70, 123, 174)', 'rgb(83, 42, 94)', 'rgb(106, 37, 88)', 'rgb(105, 38, 91)', 'rgb(95, 43, 95)', 'rgb(70, 120, 171)', 'rgb(18, 18, 18)', 'rgb(230, 172, 156)', 'rgb(230, 184, 173)']
        this.points_to_check = [[24, -1], [15, 2], [7, 5], [-1, 14], [-1, 31], [9, 31], [17, 23], [32, 22], [41, 23], [48, 31], [65, 31], [65, 14], [57, 5], [49, 2], [40, -1]]
        this.position_x = position_x;
        this.position_y = position_y;
        this.control_speed = 1.5;
        this.ship_control = new ShipControl(this);
        this.alive = true;
        this.max_y = 350;
        this.min_y = 10;
        this.current_delta;
        this.player = player;
        this.updates = 0;
        this.step_every = 20;
        this.fire = new Fire(this.max_y + 100, this.player);
        this.image_alive = new Image();
        this.image_alive.src = 'graphics/player/player.png';
        this.image_destroyed = new Image();
        this.image_destroyed.src = 'graphics/player/destroyed.png';
        this._counter = 0;
        this.reached_checkpoint = false;
        this.returning = false;
        this.disabled_checking_collision = false;

    }
    go(direction) {
        switch (direction) {
            case Direction.UP:
                if (this.position_y > this.min_y && !DO_NOT_SCROLL) {
                    this.position_y -= Speeds.ship_speed * player.difficulty.power * this.control_speed * 16.666666666666668 / this.current_delta;
                    //Sounds.play_ship_sound(this.position_y)
                }
                break;
            case Direction.RIGHT:
                this.position_x += Speeds.ship_speed * this.control_speed * player.difficulty.power * 16.666666666666668 / this.current_delta;
                break;
            case Direction.LEFT:
                this.position_x -= Speeds.ship_speed * this.control_speed * player.difficulty.power * 16.666666666666668 / this.current_delta;
                break;
            case Direction.DOWN:
                if (this.position_y < this.max_y) {
                    this.position_y += Speeds.ship_speed * this.control_speed * player.difficulty.power * 16.666666666666668 / this.current_delta;
                    //Sounds.play_ship_sound(this.position_y)
                }
                break;
        }
    }
    update(delta) {
        this.ship_control.update();
        this.current_delta = delta;
        this.updates++;
        if (this.updates % this.step_every == 0) {
            this.updates = 0;
            
            if(this.returning){
                this.player.return_step()
            }else{
                this.player.default_step();
            }
        }
        if (DO_NOT_SCROLL) {
            this.go(Direction.DOWN);
        }
        this.fire.update(delta);
    }
    shoot() {
        if(!this.returning)
            this.fire.fire(this.position_x, this.position_y, 64);
    }
    check_collisions(c) {
        for (let i = 0; i < this.points_to_check.length; i++) {
            let data = c.getImageData(this.position_x + this.points_to_check[i][0], this.position_y + this.points_to_check[i][1], 1, 1).data;
            let getted_color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`
            if (!(this.ignored_colors_for_collision.indexOf(getted_color) > -1)) {

                data[0] = parseInt(data[0])
                data[1] = parseInt(data[1])
                data[2] = parseInt(data[2])
                let found_similar = false;
                for (let j = 0; j < this.ignored_colors_for_collision.length; j++) {
                    let t = this.ignored_colors_for_collision[j].split(', ')
                    t[0] = t[0].substring(4)
                    t[2] = t[2].substring(0, t[2].length - 1)
                    t[0] = parseInt(t[0])
                    t[1] = parseInt(t[1])
                    t[2] = parseInt(t[2])
                    if (is_color_similar(t, data)) {
                        found_similar = true;
                        break;
                    }
                }

                if (found_similar) continue
                if (this.final != undefined && (getted_color == 'rgb(255, 255, 255)' || getted_color == 'rgb(248, 137, 120)') && this.position_y + 64 >= this.final.y) {
                    status_bar.display_text();
                    Sounds.stop_theme_sound();

                    game_stopped = true;
                    this.disabled_checking_collision = true;
                    ship.returning = true;
                    setTimeout(function () {
                        game_stopped = false;
                        
                    }, 11000)
                    var that = this
                    setTimeout(()=>{that.disabled_checking_collision = false}, 11500)
                    break;
                }
                this.alive = false;
                this.render(context)
                this.player.ship_destroyed();
                setTimeout(reset, 1000);
                Sounds.play_ship_destroyed_sound();
                break;
            }
        }
        if (this.player.fuel <= 0) {
            this.alive = false;
            this.render(context)
            this.player.ship_destroyed();
            setTimeout(reset, 1000);
            Sounds.play_ship_destroyed_sound();
        }
    }
    render(c) {
        // c.fillStyle = 'rgb(74, 132, 183)';
        // c.beginPath();

        // c.moveTo(this.position_x, this.position_y + 14);
        // c.lineTo(this.position_x, this.position_y + 30);
        // c.lineTo(this.position_x + 8, this.position_y + 30);
        // c.lineTo(this.position_x + 8, this.position_y + 22);
        // c.lineTo(this.position_x + 16, this.position_y + 22);
        // c.lineTo(this.position_x + 16, this.position_y + 16);
        // c.lineTo(this.position_x + 24, this.position_y + 16);
        // c.lineTo(this.position_x + 24, this.position_y + 20);
        // c.lineTo(this.position_x + 40, this.position_y + 20);
        // c.lineTo(this.position_x + 40, this.position_y + 16);
        // c.lineTo(this.position_x + 48, this.position_y + 16);
        // c.lineTo(this.position_x + 48, this.position_y + 22);
        // c.lineTo(this.position_x + 56, this.position_y + 22);
        // c.lineTo(this.position_x + 56, this.position_y + 30);
        // c.lineTo(this.position_x + 64, this.position_y + 30);
        // c.lineTo(this.position_x + 64, this.position_y + 14);
        // c.lineTo(this.position_x + 56, this.position_y + 14);
        // c.lineTo(this.position_x + 56, this.position_y + 6);
        // c.lineTo(this.position_x + 48, this.position_y + 6);
        // c.lineTo(this.position_x + 48, this.position_y + 2);
        // c.lineTo(this.position_x + 40, this.position_y + 2);
        // c.lineTo(this.position_x + 40, this.position_y);
        // c.lineTo(this.position_x + 24, this.position_y);
        // c.lineTo(this.position_x + 24, this.position_y + 2);
        // c.lineTo(this.position_x + 16, this.position_y + 2);
        // c.lineTo(this.position_x + 16, this.position_y + 6);
        // c.lineTo(this.position_x + 8, this.position_y + 6);
        // c.lineTo(this.position_x + 8, this.position_y + 14);
        // c.lineTo(this.position_x, this.position_y + 14);
        // c.fill();
        // c.clearRect(this.position_x+24, this.position_y+6, 16, 4)
        this._counter++;

        if (this.alive) {
            c.drawImage(this.image_alive, this.position_x, this.position_y);
        } else {
            c.drawImage(this.image_destroyed, this.position_x, this.position_y);
        }

        if (this.alive && this._counter > 5 && !this.disabled_checking_collision) {
            this.check_collisions(c)
        }
        this.fire.render(c);

    }
}
