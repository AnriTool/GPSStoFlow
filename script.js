window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.textAlign = 'start';
    context.textBaseline = 'top';
    resizeCanvas();
    var text1 = ""
    var y = 0;
    var images = []
    function preload() {
        for (var i = 0; i < arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        }
    }
    
    preload(
        "./images/ADVANCE.png",
        "./images/DEPART.png",
        "./images/ENTER.png",
        "./images/GENERATE.png",
        "./images/TERMINATE.png",
        "./images/QUEUE.png",
        "./images/SEIZE.png",
        "./images/RELEASE.png",
        "./images/LEAVE.png",
        "./images/ASSIGN.png",
        "./images/PRIORITY.png",
        "./images/TRANSFER.png",
        "./images/SELECT.png",
        "./images/TEST.png",
        "./images/ASSEMBLE.png",
        "./images/MATCH.png",
        "./images/GATHER.png",
        "./images/SPLIT.png",
        "./images/MARK.png",
        "./images/SAVEVALUE.png"
    )



    keywords = ["GENERATE","TERMINATE","QUEUE","DEPART","ADVANCE","SEIZE","RELEASE","ENTER","LEAVE","TRANSFER","PRIORITY","ASSIGN",
                 "SELECT","TEST","SPLIT","GATHER","ASSEMBLE","MATCH","MARK","SAVEVALUE"]

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
        
        var resize = 10
        size_elem = new Image()
        for(let i =0; i< splits.length; i++){
            var words = splits[i].split(" ")
            if(words[0] == '')
                words[1] = " "
            if (keywords.includes(words[0].toUpperCase())){
                size_elem.src = "./images/"+words[0].toUpperCase()+".png"
                resize += size_elem.height
            }
            else if(keywords.includes(words[1].toUpperCase())){
                context.fillText(words[0], 103, y)
                resize += 40
                size_elem.src = "./images/"+words[1].toUpperCase()+".png"
                resize += size_elem.height 
            }
            else
                
                resize += 40
              
        }
        canvas.height = resize;
        delete(size_elem);
        elem = new Image();
        //Заполнение canvas

        for(let i =0; i< splits.length; i++){
            var words = splits[i].split(" ")
            if(words[0] == '')
                words[1] = " "
            //Заполнение если встетиолось ключевое слово
            if (keywords.includes(words[0].toUpperCase())){
                elem.src = "./images/"+words[0].toUpperCase()+".png"
                context.drawImage(elem,100,y)
                drawParams(words,0,elem)
                y += elem.height 
            }
            //Заполнение если первое слово - Метка, а второе - ключевое
            else if(keywords.includes(words[1].toUpperCase())){

                context.textAlign = "start";
                context.font = "14px Tahoma"
                y += 20
                context.fillText(words[0], 103, y)
                y += 20
                elem.src = "./images/"+words[1].toUpperCase()+".png"
                
                context.drawImage(elem,100,y)
                drawParams(words,1,elem)
                y += elem.height 
            }
            else {
                context.textAlign = "start";
                context.font = "14px Tahoma"
                y += 20
                context.fillText(words[0], 103, y)
                y += 20
            }
            
            
        }
        delete(elem)

    }
    

    function drawParams(words,offset,elem){
                
                switch(words[0+offset].toUpperCase()){
                    case "GENERATE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        if  (words.length > 1)
                            context.fillText(words[1+offset], 164, y + elem.height/1.5);
                        break;

                    
                    case "TERMINATE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        if  (words.length > 1+offset)
                            context.fillText(words[1+offset], 217, y + elem.height/2 - 6)
                        break;

                    case "QUEUE":
                        var params = words[1+offset].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 36)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;

                    case "DEPART":
                        var params = words[1+offset].split(",")
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
                        context.fillText(words[1+offset], 228, y + 9)    
                        break;

                    case "SEIZE":
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1+offset], 228, y + 44)    
                        break;

                    case "ADVANCE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 164, y + elem.height/2)  
                        break;

                    case "ENTER":
                        var params = words[1+offset].split(",")
                        console.log(params)
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 41)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;
                    
                    case "LEAVE":
                        var params = words[1+offset].split(",")
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(params[0], 225, y + 12)
                        if (params.length > 1){
                            context.font = "14px Tahoma"
                            context.textAlign = "center";
                            context.fillText(params[1], 164, y + elem.height/2)}
                        break;
                    
                    case "TRANSFER":
                        var params = words[1+offset].split(/[\s,]+/)
                        if (params[2+offset] == undefined){
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
                        break;

                    case "PRIORITY":
                        context.font = "12px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 162, y + 12)
                        break;

                    case "ASSIGN":
                        context.font = "12px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 162, y + 12)
                        break;
                    
                    case "SELECT":
                        console.log(words)
                        context.font = "12px Tahoma"
                        context.textAlign = "end";
                        context.fillText( words[1+offset], 122, y + 26)
                        var params = words[2+offset].split(",")
                        context.font = "12px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[2+offset], 164, y + elem.height/2)
                        console.log(params)
                        context.textAlign = "start";
                        context.fillText(params[5], 260, y + elem.height/4)
                        break;

                    case "TEST":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText( words[1+offset], 164, y + elem.height/3 - 6)
                        var params = words[2+offset].split(",")
                        context.font = "14px Tahoma"
                        context.textAlign = "end";
                        context.fillText(params[0], 138, y + elem.height/7)
                        context.textAlign = "start";
                        context.fillText(params[1], 192, y + elem.height/7)
                        context.textAlign = "start";
                        context.fillText(params[2], 242, y + elem.height/2 - 20)
                        break;

                    case "MATCH":
                        context.font = "14px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1+offset], 208, y + elem.height/2 - 8)
                        break;

                    case "ASSEMBLE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 162, y + 10)
                        break;

                    case "SPLIT":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 162, y + elem.height/2 + 3 )
                        break;

                    case "GATHER":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(words[1+offset], 162, y + elem.height/2 + 3 )
                        break;
                        
                    case "MARK":
                        context.font = "14px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1+offset], 226, y + elem.height/3  )
                        break;
                        
                    case "SAVEVALUE":
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        if  (words.length > 1)
                            context.fillText(words[1+offset], 164, y + elem.height/2);
                        break;
                    
                }
            }
        

}
