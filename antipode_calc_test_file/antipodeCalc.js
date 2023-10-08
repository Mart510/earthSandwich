// Antipode calculation

// 1. Take the latitude of the place for which you want to find the antipode and convert it to the opposite hemisphere.
    // Memphis as an example. Memphis is located at approximately 35° North latitude. The antipode of Memphis will be at 35° South latitude.
    // convert by inverting the number e.g. 75 -> -75

// 2. Take the longitude of the place for which you want to find the antipode and subtract the longitude from 180. Antipodes are always 180° of longitude away.
    // Memphis is located at approximately 90° West longitude, so we take 180-90=90.
    // This new 90° we convert to degrees East (from the Western Hemisphere to the Eastern Hemisphere, from degrees west of Greenwich to degrees east of Greenwich) and we have our location of Memphis' antipode -35°S 90°E.

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
  
  //console.log("Antipode latitude:", antipode.latitude);
  //console.log("Antipode longitude:", antipode.longitude);
  