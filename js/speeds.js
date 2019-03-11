var Speeds = {
    accual_speed: 2,
    ship_speed: 2.5,
    _level_speed_increased: false,
    _ship_speed_increased: false,
}
function increase_level_speed() {
    if (!Speeds._level_speed_increased) {
        Speeds.accual_speed++;
        Speeds._level_speed_increased = true;
    }
}
function decrease_level_speed() {
    if (Speeds._level_speed_increased) {
        Speeds.accual_speed--;
        Speeds._level_speed_increased = false;
    }
}
function increase_ship_speed() {
    if (!Speeds._ship_speed_increased) {
        Speeds.ship_speed++;
        Speeds._ship_speed_increased = true;
    }
}
function increase_ship_speed() {
    if(Speeds._ship_speed_increased){
        Speeds.ship_speed--;
        Speeds._ship_speed_increased = false;
    }
}