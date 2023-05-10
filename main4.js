function function1()
{
    window.location = "index.html";
}


img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage("chair.jpg");
}



function setup()
{
    canvas = createCanvas(500, 440);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Object ";
}

function modelloaded()
{
    console.log("The model is initialized!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("Status").innerHTML = "Status: Object Detected";
            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}



