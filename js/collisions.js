var Collisons = (function () {
    function ship_collides_with_map(ship, context) {
        var points = [
            { x: ship.position_x + 24, y: ship.position_y },
            { x: ship.position_x + 16, y: ship.position_y + 2 },
            { x: ship.position_x + 8, y: ship.position_y + 6 },
            { x: ship.position_x + 8, y: ship.position_y + 14 },
            { x: ship.position_x, y: ship.position_y + 14 },
            { x: ship.position_x, y: ship.position_y + 30 },
            { x: ship.position_x + 8, y: ship.position_y + 30 },
            { x: ship.position_x + 16, y: ship.position_y + 22 },
            { x: ship.position_x + 24, y: ship.position_y + 20 },
        ]

        for (var i = 0; i < points.length; i++) {
            var col = context.getImageData(points[i].x, points[i].y, 1, 1);
        }
    }

    function collides(object1, object2) {

    }

    return {
        ship_collides_with_map: ship_collides_with_map,
    }
})();