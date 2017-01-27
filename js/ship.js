class Ship {
    constructor(position_x, position_y) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.graphic_path = 'graphics/ship.png';
    }
    go(direction){
        switch(direction){
            case Direction.TOP: this.position_y--; break;
            case Direction.RIGHT: this.position_x++; break;
            case Direction.LEFT: this.position_x--; break;
            case Direction.BOTTOM: this.position_y++; break;
        }
    }
    render(context) {
        let imageShip = new Image();
        imageShip.addEventListener('load', function(){
            context.drawImage(imageShip, imageShip.ship_position_x, imageShip.ship_position_y);
            console.log('ship render');
        })
        imageShip.src = this.graphic_path;
        imageShip.ship_position_x = this.position_x;
        imageShip.ship_position_y = this.position_y;

    }
}
