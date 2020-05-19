//import
import  { ListItemCollection, ListItem, createElement } from './listItemCollection.js';

//Instantiate the List
let newList = new ListItemCollection;


function createNewItem(){
	let name = getName(0);
	const input = document.getElementById("add-text");
	let content = input.value;
	
	if(content != ""){
		//if there's text, create a new item
		let newItem = new ListItem(content, name);
		
		//add to collection
		newList.add(newItem);

		//clear the input
		input.value = "";
		
	}
}

function markDone(event){
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.complete(nameid);
}

function removeItem(event){
	let target = event.target;
	let nameid = target.getAttribute("name");
	newList.remove(nameid);
}

//need incrementor for unique names of items
function getName(incrementor){
	{for(item of newList.itemList){
		if(item.name >= incrementor){
			incrementor = item.name + 1;
			}
		}
	}
	return incrementor;
}

//display on load
newList.display();
