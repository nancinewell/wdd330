// JavaScript source code
import { getJSON, getLocation } from './quake-utilities.js';
import { QuakesController } from './quake-controller.js';

let baseurl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

function youAreHere(position) {
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    baseurl += `&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&maxradiuskm=100`;
    console.log(baseurl);
    return baseurl;
}

function getLatitude(position) {
    return position.coords.latitude;
}

function getLongitude(position) {
    return position.coords.longitude;
}

function getPosition(position) {
    return position.coords;
}
//
let parent = document.getElementById("output");
let position = window.navigator.geolocation.getCurrentPosition(getPosition);
let newController = new QuakesController(parent, position);
console.log(newController.position);
newController.init();


export { youAreHere, getLatitude, getLongitude }