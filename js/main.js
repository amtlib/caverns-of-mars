window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');
    let background = new Background('#010101')
    let ship = new Ship(canvas.width/2,20);
    let level = new Level('');
    Render.render(context, background, ship, level);
})
