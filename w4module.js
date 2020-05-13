// JavaScript Module



function createDino(){
	let dinoChoice = document.getElementById("dino-select").value;
	let dinoSpace = document.getElementById("dino-display");
	dinoSpace.innerHTML = "";
	makeImage(dinoChoice, dinoSpace);
	
}

function makeImage(imgName, appendTo){
	let genbody = document.createElement("img");
	genbody.setAttribute("src", "images/" + imgName + "-body.png");
	genbody.setAttribute("alt", imgName + " body");
	appendTo.appendChild(genbody);
	
	let genRLeg = document.createElement("img");
	genRLeg.setAttribute("src", "images/" + imgName + "-rleg.png");
	genRLeg.setAttribute("alt", imgName + " right leg");
	appendTo.appendChild(genRLeg);
	
	let genLLeg = document.createElement("img");
	genLLeg.setAttribute("src", "images/" + imgName + "-lleg.png");
	genLLeg.setAttribute("alt", imgName + " left leg");
	appendTo.appendChild(genLLeg);
}



export {
	createDino, 
	makeImage
}// JavaScript Document