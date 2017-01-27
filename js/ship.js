class Ship {
    constructor(position_x, position_y) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.graphic_path = 'graphics/ship.png';
    }
    render(context) {
        let imageShip = new Image();
        imageShip.addEventListener('load', function(){
            context.drawImage(imageShip, imageShip.ship_position_x, imageShip.ship_position_y);
            console.log(context, imageShip, imageShip.ship_position_x, this.position_y);
        })
        imageShip.src = this.graphic_path;
        imageShip.ship_position_x = this.position_x;
        imageShip.ship_position_y = this.position_y;

    }
}
