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
// default position
const leftMap = L.map('originMap').setView([51.854210, -5.124250], 2)

// intialises the right map, it's default view co-ords and zoom level
const rightMap = L.map('antipodeMap').setView([51.854210, -5.124250], 2);

// base layer of left map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // adding geoapify into this
    apiKEY: geoApiKEY
  }).addTo(leftMap);


// base layer of right map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(rightMap);

// styles the origin and antipode markers
let originMarker = L.icon({
    iconUrl: 'brebTop.png',
    iconSize: [32, 32]
});
let negaMarker = L.icon({
    iconUrl: 'brebBottom.png',
    iconSize: [32, 32]
});


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

// check avalible automcomplete options
const autoCompleteInput = new GeocoderAutocomplete(document.getElementById('autocomplete'), geoApiKEY);

// autocomplete behaviour
autoCompleteInput.on('select', (location) => {
  // check selected location here
 // if (originMarker) {
 //   originMarker.remove();
 // }

  if (location) {

    // input storing
    const latInput = parseFloat(location.properties.lat)
    const longInput = parseFloat(location.properties.lon)

    // logger
    console.log(`Location selected: ${location.properties.city}`);
    console.log(`Latitude: ${latInput}`);
    console.log(`Longitude: ${longInput}`);

    // calculate antipode location
    const negaSpot = calculateAntipode(latInput, longInput);
    const negaLat = negaSpot.latitude
    const negaLong = negaSpot.longitude

    // Antipode logger
    console.log(`Antipode Latitude: ${negaLat}`);
    console.log(`Antipode Longitude: ${negaLong}`);

    // map update animation options
    const panimate = {
      animate: true, // makes it animate
      duration: 4, // time in seconds
      easeLinearity: .1 // ease factor
    }

    // create pointer at location
    const originPointer = L.marker([latInput, longInput], {icon: originMarker}).addTo(leftMap);

    // set pointer at location
    originPointer.setLatLng(new L.LatLng(latInput, longInput));

  // update map with users location
    // Pan
    leftMap.flyTo([latInput, longInput], 10, panimate);

    // create pointer at antipode location
    const negaPointer = L.marker([negaLat, negaLong], {icon: negaMarker}).addTo(rightMap);

    // set pointer at antipode location
    negaPointer.setLatLng(new L.LatLng(negaLat, negaLong));
    // update second map
    rightMap.flyTo([negaLat, negaLong], 10, panimate);
  }
})