// Import leaflet
import * as L from "./leaflet/leaflet-src.js"

// Initialize a Leaflet map
const myMap = L.map('map').setView([51.505, -0.09], 13);

// Add basic tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);