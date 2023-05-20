window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.textAlign = 'start';
    context.textBaseline = 'top';
    resizeCanvas();
    var text1 = ""
    var y = 0;
    var images = []
    var keywords =[];

    function preloadOne(src, i) {
            images[i] = new Image();
            images[i].src = src;
        }
    
    for(i = 0; i < BLOCKS.length; i++){
        keywords[i] = BLOCKS[i].name
        preloadOne("./images/"+BLOCKS[i].name+".png",i)
    }

    let display = document.querySelector('#textarea'); // Инициализировал и присвоил переменной элемент textarea 

    if(display) {
        display.addEventListener('change',drawFromText, false)
    }

    function resizeCanvas() {
    canvas.width = window.innerWidth/1.5;
    canvas.height = window.innerHeight;
    refill();
    }

    function refill(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    document.querySelector("#submit").onclick = function(){
        y = 0;
        drawFromText();
      }


    function drawFromText(){
        text1 = document.getElementById('textarea').value; 
        splits = text1.split(/\r?\n/);
        tmp_image = new Image()
        words = []
        height = 10;
        
        //Обрезка строк на слова + измненение размера canvas
        for(i = 0; i < splits.length;i++){
            words[i] = splits[i].split(/[\s\t]+/)
            if(words[i][0] =='' && words[i][1] == undefined)
                continue;
            if(keywords.includes(words[i][0].toUpperCase())){
                tmp_image.src ="./images/"+words[i][0].toUpperCase()+".png"
                height += tmp_image.height
            }
            else if(keywords.includes(words[i][1].toUpperCase())){
                tmp_image.src ="./images/"+words[i][1].toUpperCase()+".png"
                height += tmp_image.height + 40
            }
            else height += 40;
           
        }
        canvas.height = height;

        //Изображение блоков
        for(i = 0; i < words.length;i++){
            if(words[i][0] =='' && words[i][1] == undefined)
                continue;
            if(keywords.includes(words[i][0].toUpperCase())){
                tmp_image.src ="./images/"+words[i][0].toUpperCase()+".png"
                context.drawImage(tmp_image,100,y)
                drawParams(words[i])
                y += tmp_image.height
            }
            else if(keywords.includes(words[i][1].toUpperCase())){
                tmp_image.src ="./images/"+words[i][1].toUpperCase()+".png"
                context.textAlign = "start";
                context.font = "14px Tahoma"
                y += 20
                context.fillText(words[i][0], 103, y)
                y += 20
                context.drawImage(tmp_image,100,y)
                drawParams(words[i].slice(1))
                y += tmp_image.height 
            }
            else {
                context.textAlign = "start";
                context.font = "14px Tahoma"
                y += 20
                context.fillText(words[i][0], 103, y)
                y += 20
            }
        }
    }
    

    function drawParams(words){
        console.log(words)
        BLOCKS.forEach((elem) =>{
            if (elem.name == words[0].toUpperCase())
                if(elem.unique!= true){
                    if (elem.params.length == 1){
                        context.font = elem.params[0].font
                        context.textAlign = elem.params[0].align
                        if(words[1] != undefined) 
                            context.fillText(words[1],elem.params[0].x,y +elem.params[0].y)
                    }
                    else {
                        params = words[1].split(',')
                        for(j = 0; j < elem.params.length; j++){
                        
                            context.font = elem.params[j].font
                            context.textAlign = elem.params[j].align
                            if(params[j] != undefined) 
                                context.fillText(params[j],elem.params[j].x,y +elem.params[j].y)
                        }
                    }
                }
                else{
                    if(elem.name == "TEST"){
                        context.font = elem.params[0].font
                        context.textAlign = elem.params[0].align
                        context.fillText(words[1],elem.params[0].x,y +elem.params[0].y)
                        params = words[2].split(',')
                        for(j = 1; j < elem.params.length; j++){
                            context.font = elem.params[j].font
                            context.textAlign = elem.params[j].align
                            if(params[j-1] != undefined) 
                                context.fillText(params[j-1],elem.params[j].x,y +elem.params[j].y)
                        }
                    }
                    if(elem.name == "SELECT"){
                        context.font = elem.params[0].font
                        context.textAlign = elem.params[0].align
                        context.fillText(words[1],elem.params[0].x,y +elem.params[0].y)
                        context.font = elem.params[1].font
                        context.textAlign = elem.params[1].align
                        context.fillText(words[2],elem.params[1].x,y +elem.params[1].y)
                        params = words[2].split(',')
                        context.font = elem.params[2].font
                        context.textAlign = elem.params[2].align
                        context.fillText(params[5],elem.params[2].x,y +elem.params[2].y)
                    }
                    if(elem.name == "TRANSFER"){
                        params = words[1].split(',')
                        if(params[2] == undefined){
                            context.font = elem.params[0].font
                            context.textAlign = elem.params[0].align
                            context.fillText(params[0],elem.params[0].x,y +elem.params[0].y)

                            context.font = elem.params[1].font
                            context.textAlign = elem.params[1].align
                            context.fillText(params[1],elem.params[1].x,y +elem.params[1].y)
                            context.clearRect(150, y+85, 20, 25);
                            
                        }
                        else{
                            context.font = elem.params[2].font
                            context.textAlign = elem.params[2].align
                            context.fillText(params[0],elem.params[2].x,y +elem.params[2].y)
                            
                            context.font = elem.params[3].font
                            context.textAlign = elem.params[3].align
                            context.fillText(params[1],elem.params[3].x,y +elem.params[3].y)

                            context.font = elem.params[4].font
                            context.textAlign = elem.params[4].align
                            context.fillText(params[2],elem.params[4].x,y +elem.params[4].y)
                        }
                    }
                }
        })
    
    } 
}
