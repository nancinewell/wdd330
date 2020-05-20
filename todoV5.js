//VERSION4
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
		//if there's anything in local storage, pull it and fill the array
		this.pullFromStorage()
	}

	add(object) {
		//push new item into itemList
		this.itemList.push(object);
		//set to storage
		this.setToStorage();
		//create new display
		this.display();
	}

	remove(nameid) {
		//Find index of specific object    
		let thisOne = this.findThisOne(nameid);
		//remove object from collection
		this.itemList.splice(thisOne, 1);
		//set to storage
		this.setToStorage();
		//create new display
		this.display();
	}

	complete(nameid) {
		//Find index of specific object   
		let thisOne = this.findThisOne(nameid);
		//Update object's complete  property.
		this.itemList[thisOne].complete = true;
		//set to storage
		this.setToStorage();
		//create new display
		this.display();
	}

	uncomplete(nameid) {
		//Find index of specific object  
		let thisOne = this.findThisOne(nameid);
		//Update object's complete  property.
		this.itemList[thisOne].complete = false;
		//set to storage
		this.setToStorage();
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

	pullFromStorage() {
		//pull itemList from storage
		let storedList = JSON.parse(localStorage.getItem("list"));
		//set new itemList
		if (storedList != null) {
		this.itemList = storedList;
		}
	}

	setToStorage() {
		localStorage.setItem("list", JSON.stringify(this.itemList));
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
		this.pullFromStorage()
		//clear the item-container
		document.getElementById("item-container").innerHTML = "";
		//fill the item container
		for (var item of this.itemList) {
			this.generateDisplay(item.name);
		}
		//update remaining items
		this.remainingItems();
	}

	remainingItems() {
		//filter remaining items
		let remainingItems = this.itemList.filter(item => item.complete == false).length;
		//display remaining items
		let display = document.getElementById("remaining");
		display.innerHTML = `${remainingItems} things to knock out`;
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		SUPPORT FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//function to create elements to display list
function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	genElement.textContent = text;
	genElement.classList.add(className);
	genElement.setAttribute("name", name);
	return genElement;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		MAIN FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//Instantiate the newList
let newList = new ListItemCollection;

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

//display on load
newList.display();