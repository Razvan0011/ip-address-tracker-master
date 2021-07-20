// Map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// var mymap = L.map('mapid').setView([lat, long], 13);
const myToken = "pk.eyJ1Ijoicnp2NTUiLCJhIjoiY2tyY2EwOXVuNHhsZTMxcWhxcDFkd3dubyJ9.ZwvEuZ41MAUKVDYmZusglQ";

// var marker = L.marker([51.5, -0.09]).addTo(mymap);
let mapFunc = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: myToken
    }).addTo(mymap);
}
mapFunc();
// Creating the marker
var greenIcon = L.icon({
    iconUrl: './img/icon-location.svg',
    iconSize: [46, 56], // size of the icon
});

L.marker([51.505, -0.09], {
    icon: greenIcon
}).addTo(mymap);


//End of map --------------------------------------

// Geolocation
let currentIP = document.getElementById("current_IP");
let currentLocation = document.getElementById("current_Location");
let currentTimezone = document.getElementById("current_Timezone");
let currentISP = document.getElementById("current_ISP");
let btn = document.querySelector("#btn");
let bigMap = document.getElementById("mapid");


let ip = document.querySelector("input").value;

let auth = 'at_99jxXjslFYo1OELBoZLsnWPxwcnzF';

let geoApi = `https://geo.ipify.org/api/v1?apiKey=at_99jxXjslFYo1OELBoZLsnWPxwcnzF&ipAddress=${ip}`;

var lat;
var long;

let updateMarker = (update_marker = [-42, 42]) => {
    mymap.setView(update_marker, 13)
    L.marker(update_marker).addTo(mymap);
}

async function geoLoc() {

    const dataFetch = await fetch(geoApi, {
        method: 'GET',
        headers: {

        }
    });
    const data = await dataFetch.json();
    // console.log(data);

    currentIP.innerText = data.ip;
    currentLocation.innerText = data.location.city;
    currentTimezone.innerText = data.location.timezone;
    currentISP.innerText = data.isp;
    lat = data.location.lat;
    long = data.location.lng;
    mymap.off();
    mymap.remove();
    bigMap.classList.remove("leaflet-container");
    bigMap.classList.remove("leaflet-touch");
    bigMap.classList.remove("leaflet-fade-anim");

    mymap = L.map('mapid').setView([lat, long], 13);
    L.marker([lat, long], {
        icon: greenIcon
    }).addTo(mymap);

    mapFunc();


}

btn.addEventListener("click", geoLoc);