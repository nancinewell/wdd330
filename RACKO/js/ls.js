//Local Storage Helpers
function pullListFromStorage(newList) {
	//pull itemList from storage
	let storedList = JSON.parse(localStorage.getItem("list"));
	//set new itemList
	if (storedList != null) {
		newList.itemList = storedList;
	}
}

function setListToStorage() {
	localStorage.setItem("list", JSON.stringify(newList.itemList));
}

export { pullListFromStorage, setListToStorage}