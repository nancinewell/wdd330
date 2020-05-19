//TODO V1

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		LIST ITEMS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class ListItem {
	constructor(text, name){
		this.text= text,
		this.complete= false, 
		this.name = name
	}
	
	//add item to html- use name and add it to the elements
	//Add all elements into a div
	addItem(object){		
		//retrieve the container to put the new item in.
		let itemContainer = document.getElementById("item-container");
		let skull = "💀";
		//create div to hold the pieces
		let div = itemContainer.appendChild(createElement("div", "", "lineItem", object.name));
		//append the pieces to the div
		div.appendChild(createElement("button", skull, "skull", object.name)).addEventListener("click", markDone);
		div.appendChild(createElement("div", object.text, "items", object.name));	
		div.appendChild(createElement("button", "💣", "delete", object.name)).addEventListener("click", deleteItem);		
		//prepend div to top of the list
		itemContainer.prepend(div);
	}
	
	//delete item from html
	static deleteItem(target){
		//get and delete parent of target
		target.parentNode.parentNode.removeChild(target.parentNode);
	}
	
	//generate all items that are passed in into html
	/*displayItems(){
		//append to end with event listener
		itemContainer.appendChild(createElement("button", skull, "skull")).addEventListener("click", markDone);
		itemContainer.appendChild(createElement("div", listText, "items"));	
		itemContainer.appendChild(createElement("button", "💣", "delete")).addEventListener("click", delPrevSib);
	}
	*/
	//change complete to true AND alter HTML
	static completeItem(target){
		let div = target.parentNode;
		let inputField = target.nextSibling;
		let crossBones = "☠";
		//change icon and add style
		target.innerHTML = crossBones;
		inputField.classList.add("done");
		target.classList.add("bones");
		target.classList.remove("skull");

		//move to end
		let container = document.getElementById("item-container");
		container.appendChild(div);
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		COLLECTION
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// GLOBALS
var incrementor = 0;
var collection = {
	//collection of objects
	itemList: [],
	//add new item to collection of objects
	add: object => collection.itemList.push(object),
	//remove item from collection of objects
	remove : nameid => {
		//Find index of specific object using findIndex method.    
		let thisOne = collection.itemList.findIndex((obj => obj.name == nameid));
		//remove object from collection
		collection.itemList.splice(thisOne, 1);
	},
	complete: nameid => {
		//Find index of specific object using findIndex method.    
		let thisOne = collection.itemList.findIndex((obj => obj.name == nameid));

		/*//Log object to Console.
		console.log("Before update: ", collection.itemList[objIndex]);*/

		//Update object's name property.
		collection.itemList[thisOne].complete = true;

		/*//Log object to console again.
		console.log("After update: ", collection.itemList[objIndex])*/
	}
};

var list;
/*var pushToLocalStorage
let listString = JSON.stringify(listOfLists);
		localStorage.setItem(list, listString);*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		SUPPORT FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function createElement(tag, text, className, name){
	const genElement = document.createElement(tag);
	genElement.textContent = text;
	genElement.classList.add(className);
	genElement.setAttribute("name", name);
	return genElement;
}

function remainingItems(){
	let qty = collection.itemList.filter(obj => obj.complete==false).length;
	document.getElementById("remaining").innerHTML = `${qty} To Be Killed`
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		FUNCTIONS TO BE CALLED
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function createNewItem(){
	let name = incrementor;
	const input = document.getElementById("add-text");
	let content = input.value;
	
	if(content != ""){
		//if there's text, create a new item
		let newItem = new ListItem(content, name);
		
		//display new item
		newItem.addItem(newItem);
		
		//add new item to collection
		collection.add(newItem);
		
		//increment the incrementor so each item has a unique name
		incrementor++;
		//clear the input
		input.value = "";
		//update remaining items
		remainingItems();
	}
}

function markDone(event){
	let target = event.target;
	//update html, style, move to bottom
	ListItem.completeItem(target);
	//remainingItems();
	//mark item complete
	let name = target.getAttribute("name");
	collection.complete(name);
	//update remaining items
	remainingItems();
}

function deleteItem(event){
	let target = event.target;
	let name = target.getAttribute("name");
	//delete html
	ListItem.deleteItem(target);
	//remove from collection
	collection.remove(name);
	//update remaining items
	remainingItems();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		STILL WORKING ON IT
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function showList(){
	let fromStorage = localStorage.getItem(list)
	listOfLists = JSON.parse(fromStorage);
	console.log(listOfLists);
}
	