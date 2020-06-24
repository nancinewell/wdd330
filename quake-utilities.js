// JavaScript source code
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


    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0].correct_answer);
        });
}

const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
getJSON(url);
