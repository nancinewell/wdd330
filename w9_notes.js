//WINDOW.CONFIRM
function confirmDelete() {
    window.confirm("Are you sure?");
    window.alert("Fictitious data deleted.");
}

//POPUP, SETTIMEOUT, CLOSE
function selfDestruct() {
    const popup = window.open("w9_notes.html", "Week 9 Notes", "width=800,height=400,resizable=yes");
    setTimeout(popup.close, 2000);
}

//COOKIES
function cookieTest() {
    let input1 = document.getElementById("input1").value;
    let input2 = document.getElementById("input2").value;
    const expiration = new Date();
    const oneHour = expiration.getTime() + 1000 * 60 * 60;
    expiration.setTime(oneHour);

    document.cookie = `favorite_dessert=${input1}; expires=${expiration.toUTCString()}; secure`;
    document.cookie = `favorite_icecream=${input2}; expires=${expiration.toUTCString()}; secure`;
    input1.value = "";
    input2.value = "";
    logCookies();
}

function logCookies() {
    let cookieOutput = document.getElementById("cookie-output")
    if (document.cookie) {
        const cookies = document.cookie.split("; ");
        for (cookieCrumb of cookies) {
            const [key, value] = cookieCrumb.split("=");
            cookieOutput.innerHTML += `The value of ${key} is ${value}.<br>`
        }
    }
}

//JS ANIMATION
function circularPath() {
    let ball = document.getElementById("ball");
    let ballContainer = document.getElementById("ball-container");
    let flower = document.getElementById("ball").firstChild;

    ball.style.transform = "rotate(0deg)"
    ballContainer.style.transform = "rotate(0deg)"
    flower.style.transform = "rotate(-90deg)"
    ball.style.transform = "rotate(-360deg)"
    ballContainer.style.transform = "rotate(360deg)"
}
window.requestAnimationFrame(circularPath);

//GEOLOCATION
function youAreHere(position) {
    let output = document.getElementById("position");
    output.innerHTML = `Latitude: ${position.coords.latitude}<br> Longitude: ${position.coords.longitude}<br>Timestamp: ${position.timestamp}`;
}
navigator.geolocation.getCurrentPosition(youAreHere);

//NOTIFICATIONS
if (window.Notification) {
    Notification.requestPermission();
}

if (window.Notification) {
    Notification.requestPermission()
        .then((permission) => {
            if (Notification.permission === 'granted') {
                new Notification('Thank you for granting permission!');
            }
        });
}

const notification = new Notification('JavaScript: Novice to Ninja', {
    body: 'The new book from SitePoint',
    icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.95fvYRMi8Uw73GoCqHB_hgHaHa%26pid%3DApi&f=1'
});

const notification2 = new Notification("The floor is lava!", {
    body: "Quick! Get off the floor!",
    icon: "data:image/jpeg;base64,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"
})