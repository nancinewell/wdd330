(function () {
    let protocol = document.getElementById("protocol");
    let host = document.getElementById("host");
    let hostname = document.getElementById("hostname");
    let pathname = document.getElementById("pathname");
    let address = document.getElementById("address");
    let dimensions = document.getElementById("dimensions");

    let height = window.screen.height;
    let width = window.screen.width;
    let color = window.screen.colorDepth;

    protocol.innerHTML = "window.location.protocol: " + window.location.protocol;
    host.innerHTML = "window.location.host: " + window.location.host;
    hostname.innerHTML = "window.location.hostname: " + window.location.hostname;
    pathname.innerHTML = "window.location.pathname: " + window.location.pathname;
    address.innerHTML = "window.location.toString(): " + window.location.toString();
    dimensions.innerHTML = `You are using a ${height} x ${width} screen with a color dept of ${color}.`;

    logCookies()
})()

// WORKERS
const form = document.forms[0];
form.addEventListener('submit', factorize, false);
function factorize(event) {
    // prevent the form from being submitted
    event.preventDefault();
    document.getElementById('output').innerHTML = '<p>This might take a moment or two...</p>';
    const number = Number(form.number.value);
    if (window.Worker) {
        const worker = new Worker('w9_factors.js');
        worker.postMessage(number);
        worker.addEventListener('message', (event) => {
            document.getElementById('output').innerHTML = event.data;
        }, false);
    }
}



const btn = document.getElementById('rainbow');
const rainbow = ['#d56a6a', '#d59a6a', '#d5d56a', '#55aa55', '#408080', '#54ca84', '#764b8e'];
function change() {
    document.getElementById("color-change").style.background = rainbow[Math.floor(7 * Math.random())];
}
btn.addEventListener('click', change);


//WEBSOCKET
const URL = "wss://echo.websocket.org/";
const outputDiv = document.getElementById("websocket-output");
const form2 = document.getElementById("websocket-form");
const connection = new WebSocket(URL);

//log connection to websocket
connection.addEventListener('open', () => {
    output('CONNECTED');
}, false);

//log response from websocket
connection.addEventListener('message', (event) => {
    output(`RESPONSE: ${event.data}`);
    received()
}, false);

//log disconnection from websocket
connection.addEventListener('close', () => {
    output('DISCONNECTED');
}, false);

//log error in connection to websocket
connection.addEventListener('error', (event) => {
    output(`<span style='color: red;'>ERROR: ${event.data}</span>`);
}, false);

function output(message) {
    const para = document.createElement('p');
    para.innerHTML = message;
    outputDiv.appendChild(para);
}

function received() {
    outputDiv.lastChild.classList.add("received");
}

function sent() {
    outputDiv.lastChild.classList.add("sent");
}

function message(event) {
    event.preventDefault();
    const text = form2.message.value;
    output(`SENT: ${text}`);
    connection.send(text);
    sent();
}

form2.addEventListener('submit', message, false);

// AUDIO/VIDEO
const audio = document.getElementsByTagName('audio')[0];
audio.addEventListener('pause', console.log('The audio has been paused'));

const video = document.getElementsByTagName('video')[0];
audio.addEventListener('pause', console.log('The video has been paused'));
video.addEventListener('loadedmetadata', () => { console.log(video.duration); });

let play = () => { video.play(); video.loop = true;}
let pause = () => video.pause();
let volumeUp = () => video.volume += .1;
let volumeDown = () => video.volume -= .1;