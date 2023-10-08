// Antipode calculation
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
      

// Leaflet scripts
var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);