window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');

    let ship = new Ship(canvas.width / 2, 20);
    let ship_control = new ShipControl(ship);
    let background = new Background();

    let level = new Level('');
    context.fillStyle = '#ffffff';

    function game_loop() {
        //context.fillRect(0, 0, canvas.width, canvas.height);
        Render.render(context, background, level, ship);
        requestAnimationFrame(game_loop);
    }
    game_loop();

})
