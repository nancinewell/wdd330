//VERSION 6
import { createElement } from './utilities.js';
import { pullFromStorage, setToStorage } from './ls.js'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	LIST ITEMS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
class ListItem {
	constructor(text, name) {
		this.text = text,
			this.complete = false,
			this.name = name
	}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		COLLECTION
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
class ListItemCollection {
	constructor() {
		//begin with an empty array
		this.itemList = [];
	}

	add(object) {
		//push new item into itemList
		this.itemList.push(object);
		//set to storage
		setToStorage();
		//create new display
		this.display();
	}

	remove(nameid) {
		//Find index of specific object    
		let thisOne = this.findThisOne(nameid);
		//remove object from collection
		this.itemList.splice(thisOne, 1);
		//set to storage
		setToStorage();
		//create new display
		this.display();
	}

	complete(nameid) {
		//Find index of specific object   
		let thisOne = this.findThisOne(nameid);
		//Update object's complete  property.
		this.itemList[thisOne].complete = true;
		//set to storage
		setToStorage();
		//create new display
		this.display();
	}

	uncomplete(nameid) {
		//Find index of specific object  
		let thisOne = this.findThisOne(nameid);
		//Update object's complete  property.
		this.itemList[thisOne].complete = false;
		//set to storage
		setToStorage();
		//create new display
		this.display();
	}

	findThisOne(nameid) {
		//Find index of specific object using findIndex method.    
		let thisOne = this.itemList.findIndex((obj => obj.name == nameid));
		return thisOne;
	}

	filterItems(filterWhat) {
		//clear container
		document.getElementById("item-container").innerHTML = "";
		//filter based on filterWhat (completed status)
		let filteredList = this.itemList.filter(obj => obj.complete == filterWhat);
		//new display based on filtered list
		for (var item of filteredList) {
			this.generateDisplay(item.name);
		}
	}

	generateDisplay(name) {
		//retrieve the container to put the new item in.
		let itemContainer = document.getElementById("item-container");
		let item = this.itemList.filter(obj => obj.name == name);
		let skull = "💀";
		let crossBones = "☠";
		//create div to hold the pieces
		let div = itemContainer.appendChild(createElement("div", "", "lineItem", name));
		//append the pieces to the div
		try {
			//set appropriate class and content based on whether it's completed
			if (!item[0].complete) {
				div.appendChild(createElement("button", skull, "skull", name)).addEventListener("click", markDone);
				div.appendChild(createElement("div", item[0].text, "items", name));
			} else {
				div.appendChild(createElement("button", crossBones, "bones", name)).addEventListener("click", markUndone)
				div.appendChild(createElement("div", item[0].text, "items", name)).classList.add("done");
			}
		} catch (error) {
			console.log("There was no 'complete' property");
			console.log(error.message);
		}
		div.appendChild(createElement("button", "💣", "delete", name)).addEventListener("click", removeItem);
		//if incomplete, prepend div to top of the list
		if (!item[0].complete) {
			itemContainer.prepend(div);
		}
	}

	display() {
		//get most recent list
		pullFromStorage(this)
		//clear the item-container
		document.getElementById("item-container").innerHTML = "";
		//fill the item container
		for (var item of this.itemList) {
			this.generateDisplay(item.name);
		}
		//update remaining items
		this.remainingItems();

		//put focus back on add-item input
		document.getElementById("add-text").focus();
	}

	remainingItems() {
		//filter remaining items
		let remainingItems = this.itemList.filter(item => item.complete == false).length;
		//display remaining items
		let display = document.getElementById("remaining");
		display.innerHTML = `${remainingItems} thing${remainingItems==1 ? '': 's'} to knock out`;
	}
	
}



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		MAIN FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//Instantiate the newList
let newList = new ListItemCollection;
//if there's anything in local storage, pull it and fill the array
pullFromStorage(newList);

function createNewItem() {
	//make unique name with timestamp
	let name = Math.round(new Date().getTime());
	const input = document.getElementById("add-text");
	let content = input.value;

	if (content != "") {
		//if there's text, create a new item
		let newItem = new ListItem(content, name);
		//add to collection
		newList.add(newItem);
		//clear the input
		input.value = "";
	}
}

function enterKeypress(event) {
	if (event.keyCode == 13) {
		createNewItem();
	}
}

function markDone(event) {
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.complete(nameid);
}

function markUndone(event) {
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.uncomplete(nameid);
}

function removeItem(event) {
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.remove(nameid);
}

export { ListItem, ListItemCollection, newList, createNewItem, enterKeypress, markDone, markUndone, removeItem }