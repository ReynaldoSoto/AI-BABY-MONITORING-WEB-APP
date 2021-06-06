song = "";
status = "";
objects = [];

function preload(){
    video = createCapture(VIDEO);
    video.hide();
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

 function modelLoaded(){
     console.log("Model Loaded");
     status = true;
 }

 function gotResult(error, results){
        if(error){
         console.log(error);
        }else{
         console.log(results); 
        }
       objects = results;
 }


function draw(){
    image(video, 0, 0, 380, 380);

     if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
      objectDetector.detect(video, gotResult);
      for(i = 0; i < objects.length; i++)
      {
       document.getElementById("status").innerHTML = "Status: Objects Detected";
       fill(r, g, b);
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
       textSize(15);
       noFill();
       strokeWeight(2);
       textStyle(ITALIC);
       stroke(r, b, g);
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

       if(objects[i] == "person"){
        document.getElementById("number_of_objects").innerHTML = "Baby is found";
       }else{
         document.getElementById("number_of_objects").innerHTML = "Baby is not found";
     }
      }
    }

}