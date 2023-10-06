// Antipode calculation

// 1. Take the latitude of the place for which you want to find the antipode and convert it to the opposite hemisphere.
    // Memphis as an example. Memphis is located at approximately 35° North latitude. The antipode of Memphis will be at 35° South latitude.
    // convert by inverting the number e.g. 75 -> -75

// 2. Take the longitude of the place for which you want to find the antipode and subtract the longitude from 180. Antipodes are always 180° of longitude away.
    // Memphis is located at approximately 90° West longitude, so we take 180-90=90.
    // This new 90° we convert to degrees East (from the Western Hemisphere to the Eastern Hemisphere, from degrees west of Greenwich to degrees east of Greenwich) and we have our location of Memphis' antipode -35°S 90°E.

// Example 1 - Milton Keynes, Lat = 52.04, Long = -0.76
    // Antipode result = 52.04° South 179.24° West
// Example 2 - Memphis, Lat = 35.105, Long = -89.98
// Antipode result = -35.1046° South, 90.0227 West

// converts degress to radians
function degToRad(degNum) {
    return (degNum * Math.PI) / 180;
}
// convert radians to degress
function radToDeg(radNum) {
    return (radNum * 180) / Math.PI;
}

function antipodeCalculator(longitude, latitude) {
    // convert degress to radians
    const latRad = degToRad(latitude)
    const longRad = degToRad(longitude)

    // Calculate the antipode latitude by inverting it (pos to neg)
    const antipodeLat = -latRad;

    // Calculate the antipode longitude
    let antiPodeLong = longRad + Math.PI;

    // Normalize the longitute to 180deg (longitude can only be between -180 and 180)
    if (antiPodeLong > Math.pi) {
        antiPodeLong -= 2 * Math.pi;
    }

    // Convert the radians back to degrees
    const antiPodeLatDeg = radToDeg(antipodeLat);
    const antiPodeLongDeg = radToDeg(antiPodeLong);

    // debug logger
    console.log(`Latitude antipode = ${antiPodeLatDeg}`)
    console.log(`Longitute antipode = ${antiPodeLongDeg}`)

    return {
        latitude: antiPodeLatDeg,
        longitude: antiPodeLongDeg,
    };
}

console.log(antipodeCalculator(52.04, -0.76));