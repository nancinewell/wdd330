/*
*✔️Nanci class HikeCollection
	✔️hikelist[]
	toba showHikeList()
  const myHikes = new Hikes('hikes');
  window.addEventlistener('load',()=>{myHikes.showHikeList();
  )};
  ✔️Naomi renderHikeList()
  renderOneHike()
  
  ✔️*Nanci something to display details when a hike is clicked
  	event listener when it's generated

MODULE
	*✔️Nanci createElement()
	*✔️good as is   imgBasePath()
	✔️back button from details to main list

*/
import { createElement, imgBasePath } from './hikes-module.js';

//create an array of hikes
const hikeList = [{
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short hike along the Bechler river to Bechler Falls.",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles, then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    name: "Teton Canyon",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions: "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    name: "Denanda Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    difficulty: "Moderate",
    description: "Beautiful hike through Bechler meadows river to Denanda Falls.",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles, then turn left again onto Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];


class HikeCollection {
  constructor() {
  }

  showHikeList() {
	const hikeListElement = document.getElementById("hikes");
  	hikeListElement.innerHTML = "";
  	this.renderHikeList(hikeList, hikeListElement);
  }
  renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      renderOneHike(hike);
    });
  }

	detail(event){
		let target = event.target;
		let name = target.innerHTML;
		let thisHike = hikeList.findIndex((obj => obj.name == name));	
		//add event listener to backbutton to get rid of this div
		const container = document.getElementById("hikes");
		let text = 	`${hikeList[thisHike].description} ${hikeList[thisHike].directions}`;
		let div = container.appendChild(createElement("div", text, "details"));
		div.appendChild(createElement("button", "Close", "back-button")).setAttribute("onclick", "backButton()");
	}																	 
}

let newHikes = new HikeCollection;

function renderOneHike(hike) {
	const container = document.getElementById("hikes");
	let li = container.appendChild(createElement("li"));
	
	li.appendChild(createElement("h2", `${hike.name}`)).addEventListener("click", newHikes.detail);
	li.appendChild(createElement("div", "", "image")).appendChild(createElement("img", "", "", `${imgBasePath}${hike.imgSrc}`, `Image of ${hike.name}`));
	
	let divParent = li.appendChild(createElement("div"));
	divParent;
	let div = divParent.appendChild(createElement("div"))
	div.appendChild(createElement("h3", "Distance"));
	div.appendChild(createElement("p", `${hike.distance}`));
	
	let div2 = divParent.appendChild(createElement("div"));
	
	div2.appendChild(createElement("h3", "Difficulty"));
	div2.appendChild(createElement("p", `${hike.difficulty}`));
}	

function backButton(){
	let div = document.getElementsByClassName("details");
	let container = document.getElementById("hikes");
	container.removeChild(div[0]);
}


export { hikeList, HikeCollection, renderOneHike, backButton, newHikes }

newHikes.showHikeList();