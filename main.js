status="";
video="";

function preload(){

}

function setup(){
canvas=createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function draw(){
image(video,0,0,480,380);
if(status!=""){
    objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;
        fill("brown");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("brown");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if(objects[i].label==object_name){
             video.stop();
             objectDetector.detect(gotResults);
             document.getElementById("status").innerHTML=object_name+" found";
             synth=window.SpeechSynthesis;
             utterThis=new SpeechSynthesisUtterance(object_name+"found");
             synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML=object_name+" not found";
  
        }
    }
}
}

function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}