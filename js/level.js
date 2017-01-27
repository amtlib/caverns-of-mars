class Level{
    constructor(level_id){
        this.graphic_path = `../graphics/level${level_id}.png`
        this.position_y = 0;
    }
    render(context){
        let imageLevel = new Image();
        imageLevel.addEventListener('load', function(){
            context.drawImage(imageLevel, 0, imageLevel.level_position_y);
        })
        imageLevel.src = this.graphic_path;
        imageLevel.level_position_y = this.position_y;
    }
}
