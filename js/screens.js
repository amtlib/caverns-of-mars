class Screens {
    constructor() {
        this.updates = 0
        this.screens = [
            {
                name: 'entry',
                frames: 2,
                path: 'graphics/screens/entry',
                accual_frame: 0,
                update_every: 5
            },
            {
                name: 'game-over',
                frames: 1
            },
            {
                name: 'level-ended',
                frames: 2,
                path: 'graphics/screens/level-ended',
                accual_frame: 0,
                update_every: 5,
            }
        ]
        this.accual_screen = this.screens[0].name;
        this.next_level;
        Sounds.play_intro_sound();
        this.score;
    }
    display_entry_screen() {
        if (this.accual_screen == 'game') {
            Sounds.stop_theme_sound();
        }
        this.accual_screen = 'entry';
        Sounds.play_intro_sound();
        reset(true); // exit game screen
        player.lives = 5;
        ship.returning = false;
        ship.reached_checkpoint = false;
        player.score = 0;
    }
    display_game_screen() {
        if (this.accual_screen == 'entry') {
            Sounds.stop_intro_sound();
        }
        this.accual_screen = 'game'
    }
    display_game_over_screen(score) {
        if (this.accual_screen == 'game') {
            Sounds.stop_theme_sound();
        }
        this.accual_screen = 'game-over';
        let that = this;
        setTimeout(function () {
            that.display_entry_screen();
        }, 5000)
        this.score = score;
        if (max_score < this.score)
            max_score = this.score
    }
    display_level_ended_screen(next_level) {
        this.next_level = next_level
        if (this.accual_screen == 'game') {
            Sounds.stop_theme_sound();
        }
        this.accual_screen = 'level-ended';
        status_bar.do_not_display_text()
        ship.returning = false;
        ship.reached_checkpoint = false;
        player.stage++;

        Speeds.accual_speed += 2;
        Speeds.ship_speed++;
        reset()
        var that = this
        setTimeout(function () {
            game_stopped = false;
            if (player.stage == 2) {
                level.accual_level = level2
                Elements.level = level2.elements_drew
            }
            that.display_game_screen();
        }, 10000)
    }
    update(delta) {
        this.updates++;
        if (this.updates % this.screens[0].update_every == 0 && this.accual_screen == 'entry') {
            this.screens[0].accual_frame++
            this.screens[0].accual_frame %= this.screens[0].frames;
            this.updates = 0;
        }
        if (this.updates % this.screens[2].update_every == 0 && this.accual_screen == 'level-ended') {
            this.screens[2].accual_frame++
            this.screens[2].accual_frame %= this.screens[2].frames;
            this.updates = 0;
        }

    }
    render() {
        if (this.accual_screen == 'entry') {
            let t = this.screens[0];
            let t_img = new Image();
            t_img.src = t.path + '/' + t.accual_frame + '.png';
            context.drawImage(t_img, 0, 0)
            context.font = "17px PressStart2P";
            context.fillStyle = '#101010'
            context.fillText(player.difficulty.name, 290, 405);
        }
        if (this.accual_screen == 'game-over') {
            context.fillStyle = '#101010';
            context.fillRect(0, 0, 670, 650);
            context.fillStyle = '#ffffff'
            context.fillText('GAME OVER', 220, 100);
            context.fillText('YOUR SCORE', 80, 150);
            context.fillText(this.score, 450, 150);

            context.fillText('HIGH SCORE', 80, 200);
            context.fillText(max_score, 450, 200);
        }
        if (this.accual_screen == 'level-ended') {
            let t = this.screens[2];
            let t_img = new Image();
            t_img.src = t.path + '/' + t.accual_frame + '.png';
            context.drawImage(t_img, 0, 0)
            context.font = "25px PressStart2P";
            context.fillStyle = '#db9417'
            context.fillText(this.next_level, 390, 205);
        }
    }
}