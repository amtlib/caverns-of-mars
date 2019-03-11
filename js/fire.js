class Fire {
    constructor(max_y, player) {
        this.bullet_left = {
            alive: false
        }
        this.bullet_right = JSON.parse(JSON.stringify(this.bullet_left));
        this.ready = true;
        this.speed = 3;
        this.size = 8;
        this.y_offset = 16
        this.max_y = max_y;
        this.player = player;
        this.ignore = ['rgb(118, 42, 102)', 'rgb(74, 132, 183)', 'rgb(19, 19, 19)', 'rgb(84, 43, 94)', 'rgb(74, 132, 183)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(19, 19, 19)', 'rgb(87, 129, 183)', 'rgb(231, 185, 174)', 'rgb(67, 14, 60)', 'rgb(255, 204, 191)', 'rgb(98, 140, 191)', 'rgb(255, 197, 183)', 'rgb(236, 196, 191)', 'rgb(74, 132, 183)', 'rgb(74, 132, 183)', 'rgb(18, 18, 18)']

    }
    fire(x, y, distance) {
        this.ready = !this.bullet_left.alive && !this.bullet_right.alive;
        if (this.ready) {
            this.ready = false;
            Sounds.play_shoot_sound();
            this.bullet_left.x = x;
            this.bullet_left.y = y + this.y_offset;
            this.bullet_right.x = x + distance - this.size;
            this.bullet_right.y = y + this.y_offset;

            this.bullet_left.alive = true;
            this.bullet_right.alive = true;
        }
    }
    update(delta) {

        //this.ready = !this.bullet_left.alive && !this.bullet_right.alive;           

        if (this.bullet_left.alive) {
            this._step(this.bullet_left, delta);
        }
        if (this.bullet_right.alive) {
            this._step(this.bullet_right, delta);
        }

    }
    render(c) {
        c.fillStyle = '#542b5e'
        if (this.bullet_left.alive) {
            c.fillRect(this.bullet_left.x, this.bullet_left.y, this.size, this.size)
            this._check_collision(this.bullet_left, c)
        }
        if (this.bullet_right.alive) {
            c.fillRect(this.bullet_right.x, this.bullet_right.y, this.size, this.size)
            this._check_collision(this.bullet_right, c)
        }
    }
    _check_collision(bullet, c) {
        let point_left_coords = [bullet.x, bullet.y + this.size + 1]
        let point_right_coords = [bullet.x + this.size, bullet.y + this.size + 1]
        let point_left = c.getImageData(point_left_coords[0], point_left_coords[1], 1, 1).data;
        let point_right = c.getImageData(point_right_coords[0], point_right_coords[1], 1, 1).data;

        point_left = `rgb(${point_left[0]}, ${point_left[1]}, ${point_left[2]})`;
        point_right = `rgb(${point_right[0]}, ${point_right[1]}, ${point_right[2]})`;

        if (!(this.ignore.indexOf(point_left) > -1) || !(this.ignore.indexOf(point_right) > -1)) {
            let t1 = point_left.split(', ')
            t1[0] = t1[0].substring(4)
            t1[2] = t1[2].substring(0, t1[2].length - 1)
            t1[0] = parseInt(t1[0])
            t1[1] = parseInt(t1[1])
            t1[2] = parseInt(t1[2])

            let t2 = point_right.split(', ')
            t2[0] = t2[0].substring(4)
            t2[2] = t2[2].substring(0, t2[2].length - 1)
            t2[0] = parseInt(t2[0])
            t2[1] = parseInt(t2[1])
            t2[2] = parseInt(t2[2])


            let point_left_similar_color = false;
            let point_right_similar_color = false;
            for (let j = 0; j < this.ignore.length; j++) {
                let ign = this.ignore[j].split(', ')
                ign[0] =ign[0].substring(4)
                ign[2] = ign[2].substring(0, ign[2].length - 1)
                ign[0] = parseInt(ign[0])
                ign[1] = parseInt(ign[1])
                ign[2] = parseInt(ign[2])

                if (is_color_similar(ign, t1)){
                    point_left_similar_color = true
                }

                if (is_color_similar(ign, t2)){
                    point_right_similar_color = true
                }
            }

            if(point_left_similar_color && point_right_similar_color){
                return
            }
            bullet.alive = false;
            for (let i = 0; i < Elements.level.length; i++) {
                if (Elements.level[i].y >= 0 && Elements.level[i].y <= 650) { //CANVAS HEIGHT
                    if ((point_left_coords[1] >= Elements.level[i].y &&
                        point_left_coords[1] <= Elements.level[i].y + Elements.level[i].height &&
                        point_left_coords[0] >= Elements.level[i].x &&
                        point_left_coords[0] <= Elements.level[i].x + Elements.level[i].width &&
                        Elements.level[i].alive) || (point_right_coords[1] >= Elements.level[i].y &&
                            point_right_coords[1] <= Elements.level[i].y + Elements.level[i].height &&
                            point_right_coords[0] >= Elements.level[i].x &&
                            point_right_coords[0] <= Elements.level[i].x + Elements.level[i].width
                            && Elements.level[i].alive)) {
                        Elements.level[i].alive = false;
                        if (Elements.level[i].name == 'fuel') {
                            this.player.destroy_fuel_tank()
                        } else if (Elements.level[i].name == 'fuel-ship') {
                            this.player.destroy_fuel_ship();
                        } else if (Elements.level[i].name == 'enemy-ship-stand' || Elements.level[i].name == 'mushroom') {
                            this.player.destroy_enemy();
                        }
                        else if (Elements.level[i].name == 'death-star') {
                            Elements.level[i].alive = true;
                        }
                        Sounds.play_explosion_sound();
                    }
                }
            }
        }

    }
    _step(bullet, delta) {
        bullet.y += Speeds.accual_speed *this.speed* 16.666666666666668 / delta;
        if (bullet.y > this.max_y) {
            bullet.alive = false;
        }
    }
}