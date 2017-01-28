class Background{
    constructor(){
        this.graphic_path = 'graphics/background.png'
    }
    render(context){

        let imageBackground = new Image();
        imageBackground.addEventListener('load', function(){
            context.drawImage(imageBackground, 0, 0);
            console.log('ship render');
        });
        imageBackground.src = this.graphic_path;

    }
}
