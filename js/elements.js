var Elements = {
    level: undefined,
    render: render,
    update: update
}

var frames_update = 5; //change graphics every X frames;
var frames = 0;

function render(context) {
    for (var i = 0; i < Elements.level.length; i++) {
        if (Elements.level[i].y + Elements.level[i].height > 0 && Elements.level[i].y < 500) {
            if (frames % frames_update == 0) {
                Elements.level[i].accual_frame++;
                Elements.level[i].accual_frame %= (Elements.level[i].frames + 1);
                if (Elements.level[i].accual_frame == 0) {
                    Elements.level[i].accual_frame = 1;
                }
            }
            var img = new Image();
            if (!Elements.level[i].alive){
                img.src = 'graphics/destroyedd' + '/' + Elements.level[i].accual_frame + '.png'
            }     
            else
            {
                img.src = Elements.level[i].path + '/' + Elements.level[i].accual_frame + '.png';
            }
            if(ship.returning){
                if(Elements.level[i].alive && Elements.level[i].name != 'fuel'){
                    context.drawImage(img, Elements.level[i].x, Elements.level[i].y);
                }
            }else{
                context.drawImage(img, Elements.level[i].x, Elements.level[i].y);
            }
            
        }

    }
    if (frames % frames_update == 0) {
        frames = 0;
    }
    frames++;
}
function update(delta) {
    for (var i = 0; i < Elements.level.length; i++) {
        Elements.level[i].y = parseInt(Elements.level[i].y)
        if(Elements.level[i].name == 'death-star'){
            ship.final = Elements.level[i]
        }
        if(Elements.level[i].base_y == undefined){
            Elements.level[i].base_y = Elements.level[i].y
        }
        if(!DO_NOT_SCROLL){
            if(ship.returning){
                Elements.level[i].y += Math.ceil(16.666666666666668 / delta)*Speeds.accual_speed * player.difficulty.power;
            }else{
                Elements.level[i].y -= Math.ceil(16.666666666666668 / delta)*Speeds.accual_speed * player.difficulty.power;
            }
        }
            

    }
}
