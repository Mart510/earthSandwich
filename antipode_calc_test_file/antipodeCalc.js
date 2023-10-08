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
    latText.textContent = negaSpot.latitude.toFixed(2);
    longText.textContent = negaSpot.longitude.toFixed(2);
  }
};

//
submitButton.addEventListener('click', handleSubmit);
