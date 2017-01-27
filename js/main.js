window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');

    let background = new Background('#010101')
    background.render(context)

    let ship = new Ship(canvas.width/2,20);

    let level = new Level('');

    function game_loop(){
        Render.render(context, ship, level);
        requestAnimationFrame(game_loop);
    }
    game_loop();

})
