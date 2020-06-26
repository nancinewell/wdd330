(function () {
    let canvas = document.getElementById("myCanvas");

    //This is an instance of CanvasRenderingContext2D.
    let context = canvas.getContext("2d");

    /*Fill your brush with color using the strokeStyle or fillStyle properties. 
    Both are set on a context object, and both take one of three values: 
    - a string representing a color (#00FFFF, rgba(0, 0, 255, .5), red)
    - a CanvasGradient object
    - a CanvasPattern object.*/
    let blueSquare = () => { 
        context.strokeStyle = "#aa3939";
        context.fillStyle = "rgba(43, 75, 111, 0.5)";

        //Starting Point/Perimeter (left, top, width, height)
        context.fillRect(10, 10, 100, 100);
        context.strokeRect(20, 20, 100, 100);
    }
    blueSquare();

/*Fill Style Options!
- CanvasGradient
- CanvasPattern object
*/

    /*CanvasGradient: call createLinearGradient() or createRadialGradient() then add color stops.
    createLinearGradient()’s x0 and y0 = start of the gradient. 
    x1 and y1 = end of gradient */

    let gradientSquare = () => {
        let gradient = context.createLinearGradient(0, 130, 0, 230);
        gradient.addColorStop(0, "#e5f5c4");//offset of 0 at gradient start
        gradient.addColorStop(1, "#557412");//offset of 1 at gradient end
        context.fillStyle = gradient;
        context.fillRect(10, 130, 110, 110);
        context.strokeRect(10, 130, 110, 110);
    }
    gradientSquare();

    //Let's draw a circle!
    let circle = () => {
        //begin path
        context.beginPath();

        /*arc(x, y, radius, startAngle, endAngle, anticlockwise) .
        Angles are in radians, and a circle is 2π radians
        Anticlockwise is an optional argument.If you wanted the arc to
        be drawn counterclockwise instead of clockwise*/
        context.arc(185, 185, 55, 0, Math.PI * 2, true);

        //end path
        context.closePath();
        context.strokeStyle = "#aa3939";
        context.fillStyle = "#2b4b6f";
        context.lineWidth = 3;
        context.fill();
        context.stroke();
    }
    circle();

    //CanvasPattern
    let bikeRectangle = () => {
        let img = new Image();
        img.src = "images/animation-sprite.png"
        img.onload = () => {
            let bikePattern = context.createPattern(img, "repeat");
            context.fillStyle = bikePattern;
            context.fillRect(130, 10, 260, 110);
            context.strokeRect(130, 10, 260, 110);
            context.lineWidth = 1;
        }
    }
    bikeRectangle();
})()

function saveDrawing() {
    let canvas = document.getElementById("myCanvas");
    let output = document.getElementById("canvas-output");
    output.innerHTML = "I've yet to get a link that actually works. It's an infinite 'loading' page."
    let a = output.appendChild(createElement("a", "Click Here"));
    a.setAttribute("href", canvas.toDataURL("image/png"));
    a.setAttribute("target", "_blank");

}

function createElement(tag, text) {
    const genElement = document.createElement(tag);
    genElement.textContent = text;
    return genElement;
}


//Drawing an existing image onto the canvas.
function drawImageToCanvas() {
    let canvas = document.getElementById("canvas2");
    let context = canvas.getContext("2d");
    let img = document.getElementById("myImageElem");
    context.drawImage(img, 25, 30);
    let imageData = context.getImageData(0, 0, 1, 1);
    let pixelData = imageData.data;
    console.log(pixelData.length);
}

//Let's turn color to B&W
function manipulateImage() {
    let canvas = document.getElementById("canvas3");
    let context = canvas.getContext("2d");
    let img = document.getElementById("myImageElem");
    context.drawImage(img, 25, 30);

    let imageData = context.getImageData(0, 0, 200, 200);

    let i, red, green, blue, grayscale;

    for (i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];
        grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
        imageData.data[i] = grayscale;
        imageData.data[i + 1] = grayscale;
        imageData.data[i + 2] = grayscale;  
    }
    context.putImageData(imageData, 0, 0);
}

function draw(video, context, canvas) {
    if (video.paused || video.ended) return false;

    drawOneFrame(video, context, canvas);
    //essentially... an infinite loop while the video plays.
    setTimeout(function () { draw(video, context, canvas); }, 0); 
}

function drawOneFrame(video, context, canvas) {
    // draw the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixelData = imageData.data;

        // Loop through the red, green and blue pixels,
        // turning them grayscale

        let i, red, green, blue, greyscale;
        for (i = 0; i < pixelData.length; i += 4) {
            red = pixelData[i];
            green = pixelData[i + 1];
            blue = pixelData[i + 2];

            grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

            pixelData[i] = grayscale;
            pixelData[i + 1] = grayscale;
            pixelData[i + 2] = grayscale;
        }

        context.putImageData(imageData, 0, 0);
    } catch (e) {
        //resetting the canvas width will reset the canvas.
        //canvas.width = canvas.width; 
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.backgroundColor = "transparent";
        context.fillStyle = "white";
        context.textAlign = "left"; 
        context.font = "18px LeagueGothic, Tahoma, Geneva, sans-serif";
        context.fillText("There was an error rendering ", 10, 20);
        context.fillText("the video to the canvas.", 10, 40);
        context.fillText("Perhaps you are viewing this page from", 10, 70);
        context.fillText("a file on your computer?", 10, 90);
        context.fillText("Try viewing this page online instead.", 10, 130); 
        //break out of the loop
        return false;
    }
}

function myOwnDrawing() {
    let canvas = document.getElementById("canvas5");
    let context = canvas.getContext("2d");
    
    //begin path
    context.beginPath();
    //left arc
    context.arc(58, 65, 40, 0, Math.PI*.75, true);
    //line from left arc to bottom middle
    context.lineTo(98, 175);
    //line from bottom middle to right arc
    context.lineTo(173, 83);
    //right arc
    context.arc(137, 65, 40, 0.5 * Math.PI, Math.PI, true);
    //end path
    context.closePath();
    context.strokeStyle = "#2b4b6f";
    context.fillStyle = "#2b4b6f";
    //add color
    context.fill();
    context.stroke();
}

function triforce() {
    let canvas = document.getElementById("canvas6");
    let context = canvas.getContext("2d");
    //triforce yellow
    context.strokeStyle = "#fffe4e";
    context.fillStyle = "#fffe4e";
    //Large yellow triangle for background
    //begin path
    context.beginPath();
    //begin path at bottom left corner
    context.moveTo(10, 190);
    //line across left side
    context.lineTo(100, 10);
    //line across right side
    context.lineTo(190, 190);
    //line across bottom
    context.lineTo(10, 190);
    //end path
    context.closePath();
    //add color
    context.fill();
    context.stroke();

    //white
    context.strokeStyle = "#fff";
    context.fillStyle = "#fff";
    //Small white triangle in foreground creating illusion of 3 triangles
    //begin path
    context.beginPath();
    //begin path at middle of left side
    context.moveTo(55, 100);
    //line across the top
    context.lineTo(145, 100);
    //line across right side
    context.lineTo(100, 190);
    //line across left side
    context.lineTo(55, 100);
    //end path
    context.closePath();
    //add color
    context.fill();
    context.stroke();
}

function svgTesting() {
    let container = Raphael(document.getElementById("spinner"), 145, 145);
    let spinner = container.image("images/arrows.svg", 10, 10, 125, 125);
    /*"r720" was too slow...*/
    let attrsToAnimate = { transform: "r1080" };
    spinner.animate(attrsToAnimate, 60000);
}








//wait for the page to load before you try to draw the image to the canvas
window.addEventListener("load", drawImageToCanvas, false);
window.addEventListener("load", manipulateImage, false);
window.addEventListener("load", myOwnDrawing, false);
window.addEventListener("load", triforce, false);
window.addEventListener("load", svgTesting, false);

//Calling the video manipulation functions
let video = document.getElementById("video");
let canvas = document.getElementById("canvas4");
let context = canvas.getContext("2d");

video.addEventListener("play", function () {
    draw(video, context, canvas);
}, false); 

//Draggable Exercise

function makeDraggable() {

    let animals = document.querySelectorAll(".draggable");
    let animal = null;

    for (let i = 0; i < animals.length; i++) {
        animals[i].addEventListener("dragstart", function (event) {
            //keep track of which element this is
            event.dataTransfer.setData("text", event.target.id);
        });
    }


    // things can be dragged over the background
    let containers = document.querySelectorAll(".draggable-container");
    for (let container of containers) {
        container.addEventListener("dragover", function (event) {
            event.preventDefault();
        })
    }
    //Things can be dragged over frog
    let frog = document.getElementById("frog");
    frog.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    let yummyNoises = {
        bug1: 'Yummy!',
        bug2: 'Delicious!',
        bug3: 'Ribbit!'
    };
    let frogHeader = document.getElementById("frog-header");
    //frog can say stuff when he eats
    frog.addEventListener("drop", function (event) {
        console.log(event);
       //get the dataTransfer that kept track of which element this is
        let bugID = event.dataTransfer.getData("text");
        frogHeader.innerHTML = yummyNoises[bugID];
        let buggy = document.getElementById(bugID);
        buggy.parentNode.removeChild(buggy);
    });


}

makeDraggable();

//My Monkey Drop
function sceneDrop() {
    let backgroundParts = document.getElementById("monkey-container").children;
    for (let bg of backgroundParts) {
        bg.addEventListener("drop", function (event) {
            let monkeyID = event.dataTransfer.getData("text");
            let dropzone = event.target;
            dropzone.appendChild(document.getElementById(monkeyID));
        })
    }

}
sceneDrop();