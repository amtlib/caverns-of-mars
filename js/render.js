var Render = (function(){
    function render(context, ship){
        var imageShip = new Image();
        imageShip.addEventListener('load',function(){
            context.drawImage(imageShip, ship.positon_x, ship.position_y);
        })
        imageShip.src = ship.graphic_path;

    }

    return{
        render: render,
    }
})()
