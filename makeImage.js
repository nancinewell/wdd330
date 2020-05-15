// JavaScript Document

function makeImage(imgName, appendTo){
			let genLLeg = document.createElement("img");
			genLLeg.setAttribute("src", "images/" + imgName + "-lleg.png");
			genLLeg.setAttribute("alt", imgName + " left leg");
			genLLeg.setAttribute("class", "dino-img");
			genLLeg.setAttribute("id", "lleg");
			appendTo.appendChild(genLLeg);

			let genRLeg = document.createElement("img");
			genRLeg.setAttribute("src", "images/" + imgName + "-rleg.png");
			genRLeg.setAttribute("alt", imgName + " right leg");
			genRLeg.setAttribute("class", "dino-img");
			genRLeg.setAttribute("id", "rleg");
			appendTo.appendChild(genRLeg);
			
			let genbody = document.createElement("img");
			genbody.setAttribute("src", "images/" + imgName + "-body.png");
			genbody.setAttribute("alt", imgName + " body");
			genbody.setAttribute("class", "dino-img");
			genbody.setAttribute("id", "dbody");
			appendTo.appendChild(genbody);
		}

export {makeImage};