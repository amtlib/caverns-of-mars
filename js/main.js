window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');
    context.fillStyle = '#101010'
    context.fillRect(0,0,canvas.width, canvas.height);
    var imageLvl = new Image();
    imageLvl.addEventListener('load', function(){
        context.drawImage(imageLvl, 0, 0);
    })
    imageLvl.src = "../graphics/level.png";




})
