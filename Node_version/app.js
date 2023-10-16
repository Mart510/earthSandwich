// Leaflet code
import * as L from 'Leaflet'
// intialises the orgin map, it's default view co-ords and zoom level
const leftMap = L.map('originMap').setView([52.04, -.76], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leftMap);

// intialises the right map, it's default view co-ords and zoom level
const rightMap = L.map('antipodeMap').setView([-52.04, 179.24], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(rightMap);

// styles the origin and antipode markers
const originMarker = L.icon({
    iconUrl: 'brebTop.png',
    iconSize: [50, 50]
});
const negaMarker = L.icon({
    iconUrl: 'brebBottom.png',
    iconSize: [50, 50]
});

// sets a default marker on milton keynes
const originPointer = L.marker([52.04, -.76], {icon: originMarker}).addTo(leftMap);
// adding a popup to give user information at the marker
originPointer.bindPopup("This is your location").openPopup();

// sets a marker on the antipode for milton keynes
const negaPointer = L.marker([-52.04, 179.24], {icon: negaMarker}).addTo(rightMap);
// pop up to give user information
negaPointer.bindPopup('This is your earth sandwich location').openPopup();

////////////////// Antipode calculation //////////////////
// Milton Keynes, Lat = 52.04, Long = -0.76
    // Antipode result = 52.04° South 179.24° West
    function calculateAntipode(latitude, longitude) {
        // Convert degrees to radians
        const latRad = (latitude * Math.PI) / 180;
        const longRad = (longitude * Math.PI) / 180;

        // Calculate the antipode latitude by changing the sign (pos to neg or neg to pos)
        const antipodeLat = -latRad;

        // Calculate the antipode longitude by adding 180 degrees (π radians)
        let antipodeLong = longRad + Math.PI;

        // Normalize the longitude to the range -π to π (-180° to 180°)
        if (antipodeLong > Math.PI) {
          antipodeLong -= 2 * Math.PI;
        }

        // Convert radians back to degrees
        const antipodeLatDeg = (antipodeLat * 180) / Math.PI;
        const antipodeLongDeg = (antipodeLong * 180) / Math.PI;

        return {
          latitude: antipodeLatDeg,
          longitude: antipodeLongDeg,
        };
      }

      // test usage:
      const latitude = 52.04; // Milton Keynes
      const longitude = -.76; // Milton Keynes
      const antipode = calculateAntipode(latitude, longitude);
      // Expected return values are lat: -52.04 Long: 179.24

      console.log("MK Antipode latitude:", antipode.latitude);
      console.log("MK Antipode longitude:", antipode.longitude);


// Gets for lat, long and submit
const latInput = document.getElementById('lattitude');
const longInput = document.getElementById('longitude');
const submitButton = document.getElementById('submit');

// text elements
let latText = document.getElementById("antiLat")
let longText = document.getElementById("antiLong")

// call my function
function handleSubmit(event) {
  event.preventDefault();
  console.log("button clicked")

  const lat = parseFloat(latInput.value)
  console.log(`lat input is: ${latInput.value}`)
  const long = parseFloat(longInput.value)
  console.log(`long input is: ${longInput.value}`)


  if(!isNaN(lat) && !isNaN(long)) {// checking that lat and long ar numbers
  console.log(`Passes number checker`)
    let negaSpot = calculateAntipode(lat, long);
    console.log(`Antipode lat: ${negaSpot.latitude}\n Antipode long: ${negaSpot.longitude}`)
    // save calculated results to 2 decimal places
    const negaLat = negaSpot.latitude.toFixed(2)
    const negaLong = negaSpot.longitude.toFixed(2)
    // save lat and long to 2 decimal places
    const lat2 = lat.toFixed(2);
    const long2 = long.toFixed(2);

    // update the numbers in the antipode box
    latText.textContent = negaLat;
    longText.textContent = negaLong;
    // update the origin and antipode maps
    // origin map
    leftMap.setView[lat, long];
    originPointer.setLatLng(new L.LatLng(lat2, long2));

    // antipode map
    rightMap.setView[negaLat, negaLong, 7];
    negaPointer.setLatLng(new L.LatLng(negaLat, negaLong));
  }
};

//
submitButton.addEventListener('click', handleSubmit);