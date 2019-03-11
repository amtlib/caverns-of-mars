function reset(complete_reset, level_reset) {
    if (player.lives >= 0) {
        if (complete_reset) {
            ship.returning = false;
            ship.reached_checkpoint = false;
            player.stage = 1;
            Speeds.accual_speed = 2;
            Speeds.ship_speed = 2.5;
            player.escape_time = 30;
            level.accual_level = level1;
            Elements.level = level1.elements_drew;
        }
        ship.disabled_checking_collision = false;
        DO_NOT_SCROLL = false;
        ship.position_x = canvas.width / 2
        ship.position_y = 20;
        ship.alive = true;
        ship.fire.bullet_left.alive = false;
        ship.fire.bullet_right.alive = false;
        player.reset_fuel();
        status_bar.do_not_display_text()
        decrease_level_speed();
        ship._counter = 0;
        ship.render(context)
        for (let i = 0; i < Elements.level.length; i++) {
            if (!ship.returning)
                Elements.level[i].alive = true;
            if (ship.reached_checkpoint) {
                Elements.level[i].y = Elements.level[i].base_y + level.accual_level.increase_speed_point;
            } else {
                Elements.level[i].y = Elements.level[i].base_y
            }

        }
        if (ship.reached_checkpoint) {
            level.position_y = level.accual_level.increase_speed_point;
        } else {
            level.position_y = 0;
        }
        if(ship.returning){
            player.reset_fuel()
            player.escape_time = 30;
            status_bar.display_text_now();
        }
    } else {

    }
}

function is_color_similar(t, data) {

    if ((t[0] - 1 == data[0] ||
        t[0] == data[0] ||
        t[0] - 2 == data[0] ||
        t[0] - 3 == data[0] ||
        t[0] - 4 == data[0] ||
        t[0] - 5 == data[0] ||
        t[0] - 6 == data[0] ||
        t[0] - 7 == data[0] ||
        t[0] - 8 == data[0] ||
        t[0] - 9 == data[0] ||
        t[0] - 10 == data[0] ||
        t[0] - 11 == data[0] ||
        t[0] - 12 == data[0] ||
        t[0] + 1 == data[0] ||
        t[0] + 3 == data[0] ||
        t[0] + 4 == data[0] ||
        t[0] + 5 == data[0] ||
        t[0] + 6 == data[0] ||
        t[0] + 7 == data[0] ||
        t[0] + 8 == data[0] ||
        t[0] + 9 == data[0] ||
        t[0] + 10 == data[0] ||
        t[0] + 11 == data[0] ||
        t[0] + 12 == data[0] ||
        t[0] + 2 == data[0]) &&
        (t[1] - 1 == data[1] ||
            t[1] - 3 == data[1] ||
            t[1] - 4 == data[1] ||
            t[1] - 5 == data[1] ||
            t[1] - 6 == data[1] ||
            t[1] - 7 == data[1] ||
            t[1] - 8 == data[1] ||
            t[1] - 9 == data[1] ||
            t[1] - 10 == data[1] ||
            t[1] - 11 == data[1] ||
            t[1] - 12 == data[1] ||
            t[1] == data[1] ||
            t[1] - 2 == data[1] ||
            t[1] + 1 == data[1] ||
            t[1] + 3 == data[1] ||
            t[1] + 4 == data[1] ||
            t[1] + 5 == data[1] ||
            t[1] + 6 == data[1] ||
            t[1] + 7 == data[1] ||
            t[1] + 8 == data[1] ||
            t[1] + 9 == data[1] ||
            t[1] + 10 == data[1] ||
            t[1] + 11 == data[1] ||
            t[1] + 12 == data[1] ||
            t[1] + 2 == data[1]) &&
        (t[2] - 1 == data[2] ||
            t[2] - 2 == data[2] ||
            t[2] - 3 == data[2] ||
            t[2] - 4 == data[2] ||
            t[2] - 5 == data[2] ||
            t[2] - 6 == data[2] ||
            t[2] - 7 == data[2] ||
            t[2] - 8 == data[2] ||
            t[2] - 9 == data[2] ||
            t[2] - 10 == data[2] ||
            t[2] - 11 == data[2] ||
            t[2] - 12 == data[2] ||
            t[2] + 1 == data[2] ||
            t[2] + 2 == data[2] ||
            t[2] + 3 == data[2] ||
            t[2] + 4 == data[2] ||
            t[2] + 5 == data[2] ||
            t[2] + 6 == data[2] ||
            t[2] + 7 == data[2] ||
            t[2] + 8 == data[2] ||
            t[2] + 9 == data[2] ||
            t[2] + 10 == data[2] ||
            t[2] + 11 == data[2] ||
            t[2] + 12 == data[2] ||
            t[2] == data[2])) {
        return true;

    }

    return false
}