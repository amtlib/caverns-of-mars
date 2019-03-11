var Sounds = (function () {

    var theme_audio_object_playing = false

    var intro_audio_object;
    var message_audio_object;
    var message_audio_playing = false;

    var sound_paths = {
        ship_1: 'sounds/ship/1.wav',
        ship_2: 'sounds/ship/2.wav',
        ship_3: 'sounds/ship/3.wav',
        ship_4: 'sounds/ship/4.wav',
        ship_5: 'sounds/ship/5.wav',
        ship_6: 'sounds/ship/6.wav',
        ship_duration: 210,
        theme_sound: 'sounds/funky-town.mp3',
        intro: 'sounds/intro.wav',
        intro_duration: 3147,
        explosion: 'sounds/explosion.wav',
        shoot: 'sounds/shoot.wav',
        ship_destroyed: 'sounds/ship-destroyed.wav',
        message_beep: 'sounds/message-beep.wav'
    }

    var theme_audio_object = new Audio(sound_paths.theme_sound)
    theme_audio_object.loop = true;

    var ship_1_audio_object = new Audio(sound_paths.ship_1)
    var ship_2_audio_object = new Audio(sound_paths.ship_2)
    var ship_3_audio_object = new Audio(sound_paths.ship_3)
    var ship_4_audio_object = new Audio(sound_paths.ship_4)
    var ship_5_audio_object = new Audio(sound_paths.ship_5)
    var ship_6_audio_object = new Audio(sound_paths.ship_6)
    ship_1_audio_object.loop = true;
    ship_2_audio_object.loop = true;
    ship_3_audio_object.loop = true;
    ship_4_audio_object.loop = true;
    ship_5_audio_object.loop = true;
    ship_6_audio_object.loop = true;

    function play_ship_sound(position_y) {


        if (position_y > 0 && position_y < 75) {
            ship_1_audio_object.play()
            ship_2_audio_object.pause()
            ship_3_audio_object.pause()
            ship_4_audio_object.pause()
            ship_5_audio_object.pause()
            ship_6_audio_object.pause()
        } else if (position_y >= 75 && position_y < 130) {
            ship_1_audio_object.pause()
            ship_2_audio_object.play()
            ship_3_audio_object.pause()
            ship_4_audio_object.pause()
            ship_5_audio_object.pause()
            ship_6_audio_object.pause()
        } else if (position_y >= 130 && position_y < 185) {
            ship_1_audio_object.pause()
            ship_2_audio_object.pause()
            ship_3_audio_object.play()
            ship_4_audio_object.pause()
            ship_5_audio_object.pause()
            ship_6_audio_object.pause()
        } else if (position_y >= 185 && position_y < 240) {
            ship_1_audio_object.pause()
            ship_2_audio_object.pause()
            ship_3_audio_object.pause()
            ship_4_audio_object.play()
            ship_5_audio_object.pause()
            ship_6_audio_object.pause()
        } else if (position_y >= 240 && position_y < 295) {
            ship_1_audio_object.pause()
            ship_2_audio_object.pause()
            ship_3_audio_object.pause()
            ship_4_audio_object.pause()
            ship_5_audio_object.play()
            ship_6_audio_object.pause()
        } else if (position_y >= 295 && position_y <= 350) {
            ship_1_audio_object.pause()
            ship_2_audio_object.pause()
            ship_3_audio_object.pause()
            ship_4_audio_object.pause()
            ship_5_audio_object.pause()
            ship_6_audio_object.play()
        }
    }
    function play_theme_sound() {
        try {
            theme_audio_object.pause()
        } catch (e) { }
        theme_audio_object.play();
        theme_audio_object_playing = true;
    }
    function stop_theme_sound() {
        if (theme_audio_object_playing) {
            theme_audio_object.pause();
        }
    }
    function play_intro_sound() {
        if (intro_audio_object != undefined) {
            intro_audio_object.pause()
        }
        intro_audio_object = new Audio(sound_paths.intro);
        intro_audio_object.loop = true;
        intro_audio_object.play()
    }
    function stop_intro_sound() {
        intro_audio_object.pause()
    }
    function play_shoot_sound() {
        new Audio(sound_paths.shoot).play();
    }
    function play_explosion_sound() {
        new Audio(sound_paths.explosion).play();
    }
    function play_ship_destroyed_sound() {
        new Audio(sound_paths.ship_destroyed).play();
    }
    function play_returning_beep(){
         new Audio(sound_paths.message_beep).play();
    }
    function play_message_beep() {
        if (!message_audio_playing) {
            message_audio_playing = true;
            message_audio_object = new Audio(sound_paths.message_beep);
            message_audio_object.loop = true;
            message_audio_object.play();
        }
    }
    function stop_message_beep() {
        if (message_audio_object) {
            message_audio_object.pause();
            message_audio_playing = false;
        }

    }
    return {
        play_ship_sound: play_ship_sound,
        play_theme_sound: play_theme_sound,
        play_intro_sound: play_intro_sound,
        play_shoot_sound: play_shoot_sound,
        play_explosion_sound: play_explosion_sound,
        play_ship_destroyed_sound: play_ship_destroyed_sound,
        theme_audio_object_playing: theme_audio_object_playing,
        stop_theme_sound: stop_theme_sound,
        stop_intro_sound: stop_intro_sound,
        play_message_beep: play_message_beep,
        stop_message_beep: stop_message_beep,
        play_returning_beep: play_returning_beep
    }
})()