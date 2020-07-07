import { scoreBoardList } from './racko_v6.js';

//Local Storage Helpers
function pullListFromStorage(newList) {
	//pull itemList from storage
	let storedList = JSON.parse(localStorage.getItem("list"));
	//set new itemList
	if (storedList != null) {
		newList = storedList;
	}
	return newList;
}

function setListToStorage(scoreBoardList) {
	localStorage.setItem("list", JSON.stringify(scoreBoardList));
}

export { pullListFromStorage, setListToStorage}