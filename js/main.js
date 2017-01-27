window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');

    var ship = new Ship(10, 10);
    Render.render(context, ship);
})
