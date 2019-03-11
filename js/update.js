var Update = (function(){
    function update(...items){
        for(var i =0;i<items.length-1;i++){
            items[i].update(items[items.length-1]);
        }
    }
    return {
        update: update
    }
})()
