class Background{
    constructor(color){
        this.color = color;
    }
    render(context){
        context.fillStyle = this.color;
        let canvas = document.getElementById('paper');
        context.fillRect(0,0,canvas.width, canvas.height);
    }
}
