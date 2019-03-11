class Level {
    constructor() {
        this.accual_level;
        this.frame_1 = new Image()
        this.frame_1.src = 'graphics/level.png'
        this.frame_2 = new Image()
        this.frame_2.src = 'graphics/level_orange.png'
        this.position_y = 0;
        this.frames = 0;
        this.accual_frame = 0;
    }
    render(context) {
        this.frames++;
        if (this.frames % 10 == 0) {
            this.accual_frame++;
            this.accual_frame %= 2;
            this.frames = 0;
        }
        if (this.accual_frame == 0) {
            context.drawImage(this.frame_1, 0, this.position_y);
        } else {
            context.drawImage(this.frame_2, 0, this.position_y);
        }
    }
    update(delta) {
        if (this.position_y >= MAX_Y) {
            if (ship.returning) {
                if (this.position_y < 0) {
                    this.position_y += Math.ceil(16.666666666666668 / delta) * Speeds.accual_speed * player.difficulty.power;
                    if (ship.returning && this.position_y + 1 > 0) {
                        game_stopped = true;
                        game_status.display_level_ended_screen(player.stage + 1);
                    }
                }
                if (this.position_y == level.accual_level.decrease_speed_point || this.position_y - 1 == level.accual_level.decrease_speed_point) {
                    let old = this.position_y
                    this.position_y = level.accual_level.increase_speed_point;
                    let diff = Math.abs(old - this.position_y)
                    for (let i = 0; i < Elements.level.length; i++) {
                        Elements.level[i].y += diff
                    }
                }
            } else {
                this.position_y -= Math.ceil(16.666666666666668 / delta) * Speeds.accual_speed * player.difficulty.power;
            }
        }

        else
            DO_NOT_SCROLL = true;
        if (this.position_y < level.accual_level.decrease_speed_point) {
            decrease_level_speed()
        }
        else if (this.position_y < level.accual_level.increase_speed_point) {
            increase_level_speed();
            ship.reached_checkpoint = true;
        }

    }
}
