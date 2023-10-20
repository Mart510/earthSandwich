// import leaflet.js and extras
import './stylesheets/styles.css'
import 'leaflet/dist/leaflet.css'
import  L from 'leaflet';

// import geoapifiy
import '@geoapify/leaflet-address-search-plugin/dist/L.Control.GeoapifyAddressSearch.min.css'
import '@geoapify/leaflet-address-search-plugin'
import '@geoapify/geocoder-autocomplete';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

//import geoapify css library

// geoapify api key in .env file
const geoApiKEY = import.meta.env.VITE_geokey;
let marker = null;

// debugger // console.log(`API key is ${geoApiKEY}`)

// intialise map and position, [lattitude, longitude], zoomLevel
const leftMap = L.map('originMap').setView([51.854210, -5.124250], 10)

// base layer of left map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // adding geoapify into this
    apiKEY: geoApiKEY
}).addTo(leftMap);

// intialises the right map, it's default view co-ords and zoom level
const rightMap = L.map('antipodeMap').setView([-52.04, 179.24], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(rightMap);

// styles the origin and antipode markers
let originMarker = L.icon({
    iconUrl: 'brebTop.png',
    iconSize: [50, 50]
});
let negaMarker = L.icon({
    iconUrl: 'brebBottom.png',
    iconSize: [50, 50]
});

// sets a default marker on milton keynes
const originPointer = L.marker([52.04, -.76], {icon: originMarker}).addTo(leftMap);
// adding a popup to give user information at the marker
//originPointer.bindPopup("This is your location").openPopup();

// sets a marker on the antipode for milton keynes
const negaPointer = L.marker([-52.04, 179.24], {icon: negaMarker}).addTo(rightMap);
// pop up to give user information
//negaPointer.bindPopup('Earth sandwich location').openPopup();

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
    // save calculated results to 6 decimal places
    let negaLat = negaSpot.latitude.toFixed(6)
    let negaLong = negaSpot.longitude.toFixed(6)
    // save lat and long to 6 decimal places
    const lat2 = lat.toFixed(6);
    const long2 = long.toFixed(6);

    // update the numbers in the antipode box
    latText.textContent = negaLat;
    longText.textContent = negaLong;

    // update the origin and antipode maps
    // origin map
    leftMap.setView[lat2, long2, 3];
    originPointer.setLatLng(new L.LatLng(lat2, long2));

    // antipode map
    rightMap.setView[negaLat, negaLong, 3];
    negaPointer.setLatLng(new L.LatLng(negaLat, negaLong));
  }
};

//
//submitButton.addEventListener('click', handleSubmit);

// check avalible automcomplete options
const autoCompleteInput = new GeocoderAutocomplete(document.getElementById('autocomplete'), geoApiKEY);

// autocomplete behaviour
autoCompleteInput.on('select', (location) => {
  // check selected location here
 // if (originMarker) {
 //   originMarker.remove();
 // }

  if (location) {
    // debug logger
    // console.log(`Location: ${location}`)
    // console.log(`Location type: ${typeof(location)}`)
    // console.log(`Location lat: ${location.properties.lat}`)
    // console.log(`Location long: ${location.properties.lon}`)
    // input storing
    const latInput = location.properties.lat
    const longInput = location.properties.lon
    // debug logger
    // console.log(`Lat input: ${latInput}`)
    // console.log(`Long input: ${longInput}`)
    // update map with users location
    leftMap.setView[latInput, longInput, 3];
    originPointer.setLatLng(new L.LatLng(latInput, longInput));

    // calculate antipode location
    const negaSpot = calculateAntipode(latInput, longInput);
    const negaLat = negaSpot.latitude
    const negaLong = negaSpot.longitude
    // debug logger
    // console.log(`negaLat input: ${negaLat}`)
    // console.log(`negaLong input: ${negaLong}`)
    // update the numbers in the antipode box
    // latText.textContent = negaLat;
    // longText.textContent = negaLong;
    // update second map
    rightMap.setView[negaLat, negaLong, 3];
    // set pointer
    negaPointer.setLatLng(new L.LatLng(negaLat, negaLong));

    //originMarker = L.marker([location.properties.lat, location.properties.lon]).addTo(leftMap);
    //console.log(`Location ${location}, Latitude ${location.properties.lat}, Longitute ${location.properties.long}`)
  }
})

/*
// Geoapify address search control
const addressSearchControl = L.control.addressSearch(apiKEY, {
    position: 'topleft',
    requestCallback: (address) => {
        if (marker) {
            marker.remove();
        }
        if (!address) {
            return;
        }
        marker = L.marker([address.lat, address.lon]).addTo(leftMap);
        if (address.bbox && address.bbox.lat1 !== address.bbox.lat2 && address.bbox.lon1 !== address.bbox.lon2) {
          leftMap.fitBounds([[address.bbox.lat1, address.bbox.lon1], [address.bbox.lat2, address.bbox.lon2]], { padding: [100, 100] })
        } else {
          leftMap.setView([address.lat, address.lon], 15);
        }
      },
      suggestionsCallback: (suggestions) => {
        console.log(suggestions);
    }
})
leftMap.addControl(addressSearchControl);
L.control.zoom({ position: 'bottomright' }).addTo(leftMap);
*/