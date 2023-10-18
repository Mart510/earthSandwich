import * as THREE from 'three';
import ThreeGlobe from 'three-globe';

// create a new THREE scene
const myScene = new THREE.Scene();
// set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// point data
const N = 300;
const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() / 3,
  color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
}));


// intialise the globe object '/globe.jpeg'
const myGlobe = new ThreeGlobe()
    .globeImageUrl('/globe.jpeg')
    .pointsData(gData);

// add the globe to the scene
myScene.add(myGlobe);

// moving the camera from the center
camera.position.z = 30

renderer.render( myScene, camera );