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
		this.itemList = [];
		//if storage isn't empty, pull the list from storage
		try {
			if (this.pullFromStorage() != null) {
				this.pullFromStorage()
			}
		} catch (error) {
			console.log("itemList is currently empty");
		}
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
		//Find index of specific object using findIndex method.    
		let thisOne = this.itemList.findIndex((obj => obj.name == nameid));
		//remove object from collection
		this.itemList.splice(thisOne, 1);
		//set to storage
		this.setToStorage();
		//create new display
		this.display();
	}

	complete(nameid) {

		//Find index of specific object using findIndex method.    
		let thisOne = this.itemList.findIndex((obj => obj.name == nameid));
		//Update object's complete  property.
		this.itemList[thisOne].complete = true;
		//set to storage
		this.setToStorage();
		//create new display
		this.display();
	}

	filterItems(filterWhat) {
		//clear container
		document.getElementById("item-container").innerHTML = "";
		//filter per input
		let filteredList = this.itemList.filter(obj => obj.complete == filterWhat);
		//filteredList.forEach(this.generateDisplay());
		for (var item of filteredList) {
			this.generateDisplay(item.name);
		}
	}

	pullFromStorage() {
		//pull itemList from storage
		let storedList = JSON.parse(localStorage.getItem("list"));
		//set new itemList
		this.itemList = storedList;
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
			//if complete, appropriate class and content
			if (!item[0].complete) {
				div.appendChild(createElement("button", skull, "skull", name)).addEventListener("click", markDone);
				div.appendChild(createElement("div", item[0].text, "items", name));
			} else {
				div.appendChild(createElement("button", crossBones, "bones", name))
				div.appendChild(createElement("div", item[0].text, "items", name)).classList.add("done");
			}
		} catch (error) {
			console.log("There was no 'complete' property");
			console.log(typeof item[0]);
			console.log(error.message);
		}

		div.appendChild(createElement("button", "💣", "delete", name)).addEventListener("click", removeItem);
		//prepend div to top of the list
		itemContainer.prepend(div);

		if (item[0].complete) {
			itemContainer.appendChild(div);
		}
	}

	display() {
		this.pullFromStorage()
		document.getElementById("item-container").innerHTML = "";
		for (var item of this.itemList) {
			this.generateDisplay(item.name);
		}
		this.remainingItems();
	}

	remainingItems() {
		let remainingItems = this.itemList.filter(item => item.complete == false).length;
		let display = document.getElementById("remaining");
		display.innerHTML = `${remainingItems} to be killed`;
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



//need incrementor for unique names of items
function getName(incrementor) {
	{
		for (item of newList.itemList) {
			if (item.name >= incrementor) {
				incrementor = item.name + 1;
			}
		}
	}
	return incrementor;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		MAIN FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//Instantiate the List
let newList = new ListItemCollection;

function createNewItem() {
	let name = getName(0);
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

function removeItem(event) {
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.remove(nameid);
}

//display on load
newList.display();