//Local Storage Helpers
function pullFromStorage(newList) {
	//pull itemList from storage
	let storedList = JSON.parse(localStorage.getItem("list"));
	//set new itemList
	if (storedList != null) {
		newList.itemList = storedList;
	}
}

function setToStorage() {
	localStorage.setItem("list", JSON.stringify(newList.itemList));
}

export { pullFromStorage, setToStorage}