import { getJSON } from '/utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    
    //  this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
    }
     
  

  async getEarthQuakesByRadius(position, radius) {
    const isThis = this.url + `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
    console.log(isThis); 
    this._quakes = await getJSON(this.url);
    return this._quakes;
  }

  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it
    return this.quakes.features.filter(item => item.id === id)[0];
  }
}
    