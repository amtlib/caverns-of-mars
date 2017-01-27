var Render = (function(){
    function render(context, ...items){
        for(let i =0;i<items.length;i++){
            items[i].render(context);
        }

    }

    return{
        render: render,
    }
})()
