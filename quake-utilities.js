// fetch data
function getJSON(url) {
    let data;
    const options = {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        //headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
        //mode: 'no-cors'
    }

    return fetch(url, options)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json()
            }
        })      
        .catch (function(e) {
            console.log(e);
        });
    }


//getJSON(url);
//.then(data => console.log(data.features[0].properties.mag))

//get geolocation
const getLocation = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

export { getJSON, getLocation }