class ShipControl {
    constructor(ship) {
        window.addEventListener('keydown', function(e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 56: //numpad 8 - up
                    ship.go(Direction.UP);
                    break;

                case 50: //numpad 2 - down
                    ship.go(Direction.DOWN);
                    break;

                case 52: //numpad 4 - left
                    ship.go(Direction.LEFT);
                    break;

                case 54: //numpad 6 - right
                    ship.go(Direction.RIGHT)
                    break;

            }
        })
    }
}
