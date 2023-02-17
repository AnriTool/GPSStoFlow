window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.textAlign = 'start';
    context.textBaseline = 'top';
    resizeCanvas();
    var text1 = ""
    var y = 0;

    keywords = ["GENERATE","TERMINATE","QUEUE","DEPART","ADVANCE","SEIZE","RELEASE","ENTER","LEAVE","TRANSFER"]

    let display = document.querySelector('#textarea'); // Инициализировал и присвоил переменной элемент textarea 

    if(display) {
        display.addEventListener('change',drawFromText, false)
    }


    function resizeCanvas() {
    canvas.width = window.innerWidth/1.5;
    //console.log(window.innerWidth)
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

    document.querySelector("#textarea").onchange = function(){
        y = 0;
        drawFromText();
      }


    function drawFromText(){
        text1 = document.getElementById('textarea').value; 
        
        //refil
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fill();
        

        //делю на строки
        var splits = text1.split(/\r?\n/);
        //console.log(splits);
        
        //Создаю canvas нужного размера
        var resize = 10
        size_elem = new Image()
        for(let i =0; i< splits.length; i++){
            var words = splits[i].split(" ")
            if (keywords.includes(words[0])){
                size_elem.src = "./images/"+words[0]+".png"
                resize += size_elem.height
            }
            else
                resize += 40
              
        }
        canvas.height = resize;
        delete(size_elem);
        //Заполнение canvas
        for(let i =0; i< splits.length; i++){
            var elem = new Image(); 
            var words = splits[i].split(" ")
            //console.log(words)
            if (keywords.includes(words[0])){
                elem.src = "./images/"+words[0]+".png"
                context.drawImage(elem,100,y)
                
                switch(words[0]){
                    case "GENERATE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        if  (words.length > 1)
                            context.fillText(words[1], 164, y + elem.height/1.5);
                        break;

                    
                    case "TERMINATE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        if  (words.length > 1)
                            context.fillText(words[1], 217, y + elem.height/2 - 6)
                        break;

                    case "QUEUE":
                        var params = words[1].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 36)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;

                    case "DEPART":
                        var params = words[1].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 17)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;

                    case "RELEASE":
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1], 228, y + 9)    
                        break;

                    case "SEIZE":
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1], 228, y + 44)    
                        break;

                    case "ADVANCE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1], 164, y + elem.height/2)  
                        break;

                    case "ENTER":
                        var params = words[1].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 41)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;
                    
                    case "LEAVE":
                        var params = words[1].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 12)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;
                    
                    case "TRANSFER":
                        var params = words[1].split(/[\s,]+/)
                        if (params[2] == undefined){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[0], 164, y + elem.height/2)
                            context.textAlign = "start";
                            context.fillText(params[1], 225, y + elem.height/2 - 20)
                        }
                        else    {
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[0], 164, y + elem.height/2)
                            context.textAlign = "start";
                            context.fillText(params[2], 225, y + elem.height/2 - 20)
                            context.textAlign = "end";
                            context.fillText(params[1], 155, y + elem.height - 10)
                        }
                    ///
                }
                y += elem.height
            }
            else {
                context.textAlign = "start";
                context.font = "14px Tahoma"
                y += 20
                context.fillText(words[0], 103, y)
                y += 20

            }
            delete(elem)
            
        }

    }
    
}