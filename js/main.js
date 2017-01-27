window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');

    let ship = new Ship(20,20);
    
    Render.render(context, ship);
})
