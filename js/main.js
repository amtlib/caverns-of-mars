var canvas;
var context;
var player;
var ship;
var background;

var game_stopped = false

var max_score = 0;

var level;
var status_bar;

var game_status = new Screens();


function generate_ignored_colors() {
    let cnv = document.getElementById('doctor');
    let doctor_ctx = cnv.getContext('2d');


    let ignored = []
    let images = [
        {
            filename: 'graphics/destroyedd/1.png',
            coords: [14, 1]
        },
        {
            filename: 'graphics/destroyedd/1.png',
            coords: [7, 6]
        },
        {
            filename: 'graphics/destroyedd/4.png',
            coords: [10, 7]
        },
        {
            filename: 'graphics/player/destroyed.PNG',
            coords: [15, 2]
        },
        {
            filename: 'graphics/player/player.png',
            coords: [37, 4]
        },
        {
            filename: 'graphics/background.png',
            coords: [1, 1]
        }
    ]

    for (let i = 0; i < images.length; i++) {
        let temp_img = new Image();
        temp_img.src = images[i].filename
        temp_img.onload = function () {
            doctor_ctx.drawImage(temp_img, 0, 0);
            let color = doctor_ctx.getImageData(images[i].coords[0], images[i].coords[1], 1, 1).data;
            color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            ignored.push(color)
        }
    }
    ignored.push('rgb(0, 0, 0)', 'rgb(255, 255, 255)')
    cnv.parentNode.removeChild(cnv)
    return ignored;

}

window.addEventListener("DOMContentLoaded", function () {

    function update(delta) {
        if (ship.alive && !game_stopped && game_status.accual_screen == 'game') {
            if (!Sounds.theme_audio_object_playing) {
                Sounds.play_theme_sound();
            }
            Update.update(ship, level, Elements,status_bar, delta);
        } else {
            Update.update(game_status, status_bar, delta)
        }
    }
    canvas = document.getElementById('paper');
    context = canvas.getContext('2d');
    player = new Player();
    ship = new Ship(canvas.width / 2, 20, player);
    background = new Background();

    let ignored = generate_ignored_colors()
    ship.ignored_colors_for_collision = ignored;
    ship.fire.ignore = ignored;
    level = new Level();
    level.accual_level = level1
    Elements.level = level1.elements_drew;

    status_bar = new StatusBar();
    status_bar.player = player;


    MainLoop.setUpdate(update).setDraw(function () {
        if (game_status.accual_screen == 'game') {
            Render.render(context, background, level, Elements, ship, status_bar);
        } else {
            Render.render(context, game_status)
        }

    }).start();


    // function game_loop() {
    //     //context.fillRect(0, 0, canvas.width, canvas.height);

    //     //context.fillRect(ship.position_x + ship.graphic_width/2-5, ship.position_y+ship.graphic_height/2-5, 10, 10);

    //     //Collisons.ship_collides_with_map(ship, context);
    //     requestAnimationFrame(game_loop);
    // }
    // game_loop();
})
