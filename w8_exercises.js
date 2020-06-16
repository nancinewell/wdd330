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
    let frog = document.getElementById("frog2");
    frog.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    let yummyNoises = {
        bug4: 'Yummy!',
        bug5: 'Delicious!',
        bug6: 'Ribbit!'
    };
    let frogHeader = document.getElementById("frog2-header");
    //frog can say stuff when he eats
    frog.addEventListener("drop", function (event) {
        //get the dataTransfer that kept track of which element this is
        let bugID = event.dataTransfer.getData("text");
        frogHeader.innerHTML = yummyNoises[bugID];
        let buggy = document.getElementById(bugID);
        buggy.parentNode.removeChild(buggy);
    });


}

makeDraggable();
/*
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
sceneDrop();*/