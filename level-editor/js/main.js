document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('paper');
    var context = canvas.getContext('2d');

    document.getElementById('code_preview').style.display = 'none'

    var mouse_down = false;
    var selected_element = undefined;
    var output_code = {
        map_height:11243,
        map_width:670,
        map_path: 'level.png',
        increase_speed_point: -4800,
        decrease_speed_point: -8000,
        level_id: document.getElementById('level_id').value,
        elements_drew: [],
        alive: true

    };
    //var elements_drew = [];
    var level_path = 'level.png';
    var level_obj = new Image();
    level_obj.src = level_path;
    canvas.width = 670;
    canvas.height = 11243;
    var elements = [
        {
            name: 'fuel',
            path: 'graphics/fuel',
            width: 48,
            height: 32,
            frames: 2,
            accual_frame:1
        },
        {
            name: 'mushroom',
            path: 'graphics/mushroom',
            width: 34,
            height: 30,
            frames: 4,
            accual_frame:1
        },
        {
            name: 'enemy-ship-stand',
            path: 'graphics/enemy-ship-stand',
            width: 30,
            height: 28,
            frames: 2,
            accual_frame:1
        },
        {
            name: 'death-star',
            path: 'graphics/death-star',
            width:69,
            height:66,
            frames: 2,
            accual_frame:1
        },
        {
            name: 'fuel-ship',
            path: 'graphics/fuel-ship',
            width:56,
            height:30,
            frames: 2,
            accual_frame:1
        }
    ]
    var elements_div = document.getElementById('elements');
    for (var i = 0; i < elements.length; i++) {
        var img = document.createElement('img');
        img.setAttribute('src', elements[i].path+'/1.png');
        img.setAttribute('data-index', i)
        img.addEventListener('click', function () {
            selected_element = elements[parseInt(this.getAttribute('data-index'))];
            console.log(selected_element)
        })
        elements_div.appendChild(img);
    }


    canvas.addEventListener('mousemove', function (e) {
        if (selected_element) {
            var mouse_x = e.pageX;
            var mouse_y = e.pageY;
            mouse_x -=10;
            mouse_y -=10;

            selected_element.x = mouse_x;
            selected_element.y = mouse_y;

            console.log(mouse_x, mouse_y);
            
        }

    })
    canvas.addEventListener('mousedown', function(e){
            output_code.elements_drew.push(JSON.parse(JSON.stringify(selected_element)));
            selected_element = undefined;
            console.log(JSON.stringify(output_code.elements_drew));
        
    })
    document.getElementById('code').addEventListener('click', function(){
        var preview = document.getElementById('code_preview');
        if(preview.style.display == 'none'){
            preview.style.display = 'block';
            output_code.level_id = document.getElementById('level_id').value;
            output_code.speed = document.getElementById('speed').value;
            output_code.increased_speed = document.getElementById('increased_speed').value;

            document.querySelector('#code_preview textarea').value = JSON.stringify(output_code, null, 4);
        }else{
            preview.style.display = 'none';
        }
    })

    function game_loop() {
        context.clearRect(0,0,canvas.width, canvas.height);
        if(level_obj){
            context.drawImage(level_obj, 0, 0)
        }
        if(selected_element){
            var img = new Image();
            img.src = selected_element.path+'/1.png';
            context.drawImage(img, selected_element.x, selected_element.y);
        }
        for(var i =0;i<output_code.elements_drew.length;i++){

            var img = new Image();
            img.src = output_code.elements_drew[i].path+'/1.png';
            context.drawImage(img, output_code.elements_drew[i].x, output_code.elements_drew[i].y);
        }
        requestAnimationFrame(game_loop);
    }
    game_loop();

})