class StatusBar {
    constructor() {
        this.start_y = 450;
        this.height = 200;
        this.width = 670;
        this.player;
        this.lives_image = new Image();
        this.lives_image.src = 'graphics/lives_image.png';

        this.enemy_destroyed_message = '                           ...ENEMY DESTROYED......BOMB TIMER SET......ESCAPE TIME'
        this.should_display_message = false;
        this.enemy_destroyed_position_x = 240;
        this.message_max_x = -1700
        this.should_display_time = false;
    }
    display_text() {
        if (!this.should_display_message) {
            this.should_display_message = true;
            let that = this
            setTimeout(function () {
                that.should_display_time = true;
                player.fuel = player.escape_time
            }, 11000)
        }

    }
    display_text_now() {
        this.should_display_time = true;
        player.fuel = player.escape_time;
        this.should_display_message = true;
        this.enemy_destroyed_position_x = this.message_max_x
    }
    do_not_display_text() {
        this.should_display_message = false;
        this.enemy_destroyed_position_x = 240;
        this.should_display_time = false;
    }
    update() {
        if (this.should_display_message && this.enemy_destroyed_position_x >= this.message_max_x) {
            this.enemy_destroyed_position_x -= 3;
            Sounds.play_message_beep();
        } else {
            Sounds.stop_message_beep();
        }
    }
    render(c) {
        c.fillStyle = '#000000';
        c.lineWidth = 10;
        c.beginPath();
        c.moveTo(0, this.start_y);
        c.lineTo(this.width, this.start_y);

        c.stroke();
        c.fillStyle = '#ffffff'
        c.fillRect(0, this.start_y, this.width, this.height);
        c.font = "25px PressStart2P";
        c.fillStyle = '#000000';

        c.fillText('SCORE', 130, this.start_y + 30);
        c.fillText(this.player.score.toString(), this.width - 200, this.start_y + 30);

        for (let i = 1; i <= 5; i++) {
            if (i <= this.player.stage) {
                c.fillStyle = '#000000';
            } else {
                c.fillStyle = '#5781b7';
            }
            c.fillText(i.toString(), 160 + (25 * i), this.start_y + 65);
        }
        c.fillText('BASE', 160 + (25 * 7), this.start_y + 65);

        for (let i = 1; i <= this.player.lives; i++) {
            c.drawImage(this.lives_image, ((i - 1) * 40) + 40, this.start_y + 85, 32, 15);
        }
        c.fillStyle = '#000000';
        c.fillText('FUEL', 280, this.start_y + 105);
        c.fillText(Math.floor(this.player.fuel), 400, this.start_y + 105);

        if (this.should_display_message) {
            c.fillStyle = '#721d65';
            c.fillText(this.player.difficulty.name, this.enemy_destroyed_position_x, this.start_y + 145);
            c.fillStyle = '#000000';
            c.fillText(this.enemy_destroyed_message, this.enemy_destroyed_position_x, this.start_y + 145);
            if (this.should_display_time) {
                c.fillText(Math.floor(this.player.escape_time), 370, this.start_y + 145);
            }
        } else {
            c.fillStyle = '#721d65';
            c.fillText(this.player.difficulty.name, 240, this.start_y + 145);
        }

    }
}