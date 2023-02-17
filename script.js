window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.textAlign = 'start';
    context.textBaseline = 'top';
    resizeCanvas();
    var text1 = ""
    var y = 0;
    pic = new Image(); 
    pic.src='./images/generate.png';

    keywords = ["GENERATE","TERMINATE","QUEUE","DEPART","ADVANCE","SEIZE","RELEASE","ENTER","LEAVE","TRANSFER"]

    //window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
    canvas.width = window.innerWidth/1.5;
    //console.log(window.innerWidth)
    canvas.height = window.innerHeight;
    refill();
    }

    function resizeOnDraw(resize) {
        
        canvas.height = resize;
        }

    function refill(){

        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillText(text1, 20, 20)
        context.fill();

    }

    document.querySelector("#submit").onclick = function(){
        y = 0;
        drawFromText();
      }


    function drawFromText(){

        context.fillRect(0, 0, canvas.width, canvas.height)

        text1 = document.getElementById('textarea').value; 
        //alert(text1);
        refill();
        console.log(text1);
        for(let i =0; i< text1.length; i++){
            if (text1[i]=='\n')
                text1[i]='';

        }
        var splits = text1.split(/\r?\n/);
        console.log(splits);

        var resize = 10
        for(let i =0; i< splits.length; i++){
            elem = new Image(); 
            var words = splits[i].split(" ")
            if (keywords.includes(words[0])){
                elem.src = "./images/"+words[0]+".png"
                resize += elem.height
            }
            else
                resize += 40
            resizeOnDraw(resize)
        }

        for(let i =0; i< splits.length; i++){
            elem = new Image(); 
            var words = splits[i].split(" ")
            //console.log(words)
            if (keywords.includes(words[0])){
                elem.src = "./images/"+words[0]+".png"
                context.drawImage(elem,100,y)
                //console.log(words[0])
                //console.log(y)

                if(words[0] == "GENERATE" && words.length > 1){
                    context.font = "14px Tahoma"
                    context.textAlign = "center";
                    context.fillText(words[1], 164, y + elem.height/1.5)}

                else if(words[0] == "TERMINATE" && words.length > 1){
                    context.font = "14px Tahoma"
                    context.textAlign = "center";
                    context.fillText(words[1], 217, y + elem.height/2 - 6)}

                else if(words[0] == "QUEUE" && words.length > 1){
                    var params = words[1].split(",")
                    context.font = "10px Tahoma"
                    context.textAlign = "start";
                    context.fillText(params[0], 225, y + 36)
                    if (params.length > 1){
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[1], 164, y + elem.height/2)}
                }

                else if(words[0] == "DEPART" && words.length > 1){
                    var params = words[1].split(",")
                    context.font = "10px Tahoma"
                    context.textAlign = "start";
                    context.fillText(params[0], 225, y + 17)
                    if (params.length > 1){
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[1], 164, y + elem.height/2)}
                }
                
                else if(words[0] == "RELEASE" && words.length > 1){
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1], 228, y + 9)}

                else if(words[0] == "SEIZE" && words.length > 1){
                        context.font = "10px Tahoma"
                        context.textAlign = "start";
                        context.fillText(words[1], 228, y + 44)}

                else  if(words[0] == "ADVANCE" && words.length > 1){
                    context.font = "14px Tahoma"
                    context.textAlign = "center";
                    context.fillText(words[1], 164, y + elem.height/2)}

                else if(words[0] == "ENTER" && words.length > 1){
                    var params = words[1].split(",")
                    console.log(params)
                    context.font = "10px Tahoma"
                    context.textAlign = "start";
                    context.fillText(params[0], 225, y + 41)
                    if (params.length > 1){
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[1], 164, y + elem.height/2)}
                }

                else if(words[0] == "LEAVE" && words.length > 1){
                    var params = words[1].split(",")
                    context.font = "10px Tahoma"
                    context.textAlign = "start";
                    context.fillText(params[0], 225, y + 12)
                    if (params.length > 1){
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[1], 164, y + elem.height/2)}
                }

                else if(words[0] == "TRANSFER" && words.length > 1){
                    var params = words[1].split(/[\s,]+/)

                    if (params[2] == undefined){
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[0], 164, y + elem.height/2)
                        context.textAlign = "start";
                        context.fillText(params[1], 225, y + elem.height/2 - 20)}
                       
                    else {
                        context.font = "14px Tahoma"
                        context.textAlign = "center";
                        context.fillText(params[0], 164, y + elem.height/2)
                        context.textAlign = "start";
                        context.fillText(params[2], 225, y + elem.height/2 - 20)
                        context.textAlign = "end";
                        context.fillText(params[1], 155, y + elem.height - 10)}
                        
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
            
        }


    }
    
}