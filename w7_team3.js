
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
back button from details to main list
*/

//create an array of hikes
const hikeList = [{
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short hike along the Bechler river to Bechler Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
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
    description: "Beautiful hike through Bechler meadows river to Denanda Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
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

    detail(event) {
        let target = event.target;
        let name = target.innerHTML;
        let thisHike = hikeList.findIndex((obj => obj.name == name));


        //add event listener to backbutton to get rid of this div
        const container = document.getElementById("hikes");
        let text = `${hikeList[thisHike].description}. ${hikeList[thisHike].directions}`;
        let div = container.appendChild(createElement("div", text, "details"));
        div.appendChild(createElement("button", "Go Back", "back-button")).setAttribute("onclick", "hikes.backButton()");

        let div2 = div.appendChild(createElement("div"));

        let input = div2.appendChild(createElement("textarea", "", ""));
        input.setAttribute("id", "add-text");
        input.setAttribute("name", name);
        input.setAttribute("placeholder", "Share your comments here!");

        div2.appendChild(createElement("button", "Submit", "submit")).setAttribute("onclick", "createNewComment()");

        let commentDiv = div.appendChild(createElement("div", "", "comments"));
        commentDiv.setAttribute("id", "filtered-comments")
        newList.filterItems(hikeList[thisHike].name, commentDiv);

    }

    backButton() {
        let div = document.getElementsByClassName("details");
        let container = document.getElementById("hikes");
        container.removeChild(div[0]);
    }
}


function createElement(tag, text, className, src, alt) {
    const genElement = document.createElement(tag);
    genElement.textContent = text;
    if (className) { genElement.classList.add(className); }
    if (src) { genElement.setAttribute("src", src); }
    if (alt) { genElement.setAttribute("alt", alt); }
    return genElement;
}
let hikes = new HikeCollection;

function renderOneHike(hike) {
    const container = document.getElementById("hikes");
    let li = container.appendChild(createElement("li"));

    li.id = `${hike.name}`;

    li.appendChild(createElement("h2", `${hike.name}`)).addEventListener("click", hikes.detail);
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


//Move to module
const imgBasePath = "https://byui-cit.github.io/cit261/examples/";

hikes.showHikeList();



// * * * * * * * * NEW CONTENT FROM NANCI * * * * * * * 
class newComment {
    constructor(name, content, id, date) {
        this.name = name,
        this.date = date,
        this.content = content,
        this.type = "hike",
        this.id = id
    }
}

class CommentCollection {
    constructor() {
        this.commentList = []
    }
    pullFromStorage() {
        //pull itemList from storage
        let storedList = JSON.parse(localStorage.getItem("list"));
        //set new itemList
        if (storedList != null) {
            this.commentList = storedList;
        }
    }
    setToStorage() {
        localStorage.setItem("list", JSON.stringify(this.commentList));
    }
    add(object) {
        //push new item into itemList
        this.commentList.push(object);
        //set to storage
        this.setToStorage();
        //create new display
        this.display();

    }

    remove(nameid) {
        //Find index of specific object    
        let thisOne = this.findThisOne(nameid);
        //remove object from collection
        this.commentList.splice(thisOne, 1);
        //set to storage
        this.setToStorage();
        //create new display
        this.display();
    }

    findThisOne(nameid) {
        //Find index of specific object using findIndex method.    
        let thisOne = this.commentList.findIndex((obj => obj.id == nameid));
        return thisOne;
    }


    generateDisplay(name, content, date, type, id, location) {

        let testDate = date;
        //make date readable
        //let dateString = date.toString();
        //let newDate = dateString.substring(0, 10);
        //Generate comments
        let itemContainer = location;

        let div = itemContainer.appendChild(createElement("div", "", "comment-div"));
        div.setAttribute("type", type);
        div.setAttribute("id", id);
        //hike name
        div.appendChild(createElement("div", name));
        //date
        div.appendChild(createElement("div", date));
        //delete button
        let button = div.appendChild(createElement("button", "X", "delete-button"));
        button.addEventListener("click", removeItem);
        //content from input
        div.appendChild(createElement("div", content, "comment-content"));

    }
    display() {
        //get most recent list
        this.pullFromStorage();
        //clear the item-container
        let commentArea = document.getElementById("comments");
        commentArea.innerHTML = "";
        //fill the item container
        for (var item of this.commentList) {
            this.generateDisplay(item.name, item.content, item.date, item.type, item.id, commentArea);
        }
    }

    filterItems(filterWhat, location) {
        //clear container
        location.innerHTML = "";
        //filter based on filterWhat (completed status)
        let filteredList = this.commentList.filter(obj => obj.name == filterWhat);
        //new display based on filtered list
        for (var item of filteredList) {
            this.generateDisplay(item.name, item.content, item.date, item.type, item.id, location);
        }
    }

}

//Instantiate the newList
let newList = new CommentCollection;
//if there's anything in local storage, pull it and fill the array
newList.pullFromStorage(newList);

function createNewComment() {
    //make unique name with timestamp
    let today = new Date();
    let dateString= today.toString();
    let date = dateString.substring(0, 10);
    let id = Math.round(new Date().getTime());
    const input = document.getElementById("add-text");
    let content = input.value;
    let name = input.getAttribute("name");
    if (content != "") {
        //if there's text, create a new item
        let newItem = new newComment(name, content, id, date);
        //add to collection
        newList.add(newItem);

        let location = document.getElementById("filtered-comments");
        //create new display in details
        newList.filterItems(name, location)
        //clear the input
        input.value = "";
    }
}

function enterKeypress(event) {
    if (event.keyCode == 13) {
        createNewComment();
    }
}

function removeItem(event) {
    let target = event.target;
    let nameid = target.parentElement.getAttribute("id");
    newList.remove(nameid);
}

(function () {
    let container = document.getElementById("comments");
    newList.display(container);
})()



//on load grab the array and insert it into the page
const myHikes = new HikeCollection('hikes');
