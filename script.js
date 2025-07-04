import * as THREE from 'three'
console.log(THREE)

const scene = new THREE.Scene();
const sphereGeometry = new THREE.SphereGeometry( 1.5, 32, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xDE7320 } );
const sphere = new THREE.Mesh( sphereGeometry, material );
scene.add( sphere );

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add( camera );

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize( sizes.width, sizes.height );
renderer.render( scene, camera );
