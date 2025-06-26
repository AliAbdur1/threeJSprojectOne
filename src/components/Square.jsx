import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = - (event.clientY / sizes.height - 0.5);
  // console.log(`cursor x position is ${cursor.x}, cursor y position is ${cursor.y}`);
});
function Square() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(3, 3.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x20DE56 });
    const cube = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.position.y = 0;
    group.scale.y = 1;
    group.rotation.y = Math.PI / 4;
    scene.add(group);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x98F5F9 }) // applys material to the cube
    )
    cube1.position.x = 0;

    

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xFFECA1 }) // applys material to the cube
    )
    cube2.position.x = -1.5;

    

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xEFC3CA }) // applys material to the cube
    )
    cube3.position.x = 1.5;

    group.add(cube1, cube2, cube3); // adds the cube to the group
    // position properties of the cube. must be before reder call
  
    scene.add(cube);
    cube.position.set(-2, -3, -4); // same as above, lets u set all at once
    cube.scale.set(2, 0.5, .5);

    // be aware of the order of rotation
    // gimbal lock fix: change the order of rotation
    cube.rotation.reorder = "YXZ"; // reorder before changing rotation
    cube.rotation.y = Math.PI / 2;
    cube.rotation.x = Math.PI / 3;
    cube.rotation.z = Math.PI / 1.5;

    //axis helper
    const axesHelper = new THREE.AxesHelper(2); // number perameter is the length of the handles
    scene.add(axesHelper); // axishelper is an object and must be added to the scene

    
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000); // field of veiw recommendation 45 - 75. 1 and 1000 are near and far perameters
    const aspectRatio = sizes.width / sizes.height;
    // const camera = new THREE.OrthographicCamera(
    //   -1 * aspectRatio,
    //    1 * aspectRatio,
    //     1, 
    //     -1, 
    //     0.1, 
    //     100);
    camera.position.set (-1, 1, 6); // same as above, lets u set all camera positions at once
    console.log(cube.position.distanceTo(camera.position),"camera position");
    scene.add(camera);

    const controls = new OrbitControls(camera, canvasRef.current)
    controls.enableDamping = true;
    camera.lookAt(group.position);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    
    // let time = Date.now();
    const clock = new THREE.Clock();

    gsap.to(cube.position, { x: 4, duration: 1, delay: 1})
    gsap.to(cube.position, { x: 0, duration: 1, delay: 3})
    // green sock or gsap has its own tick

    // Controls
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // const currenttime = Date.now();
      // const deltaTime = currenttime - time;
      // time = currenttime;

      // camera.position.x = cursor.x * 5;// ties cursor position to camera movement
      // camera.position.y = cursor.y * 5;// ties cursor position to camera movement

      

      // group.rotation.y = elapsedTime * Math.PI * 2; // deltaTime; // make objects rotate at same speed regardless of frame rate
      // group.rotation.x = elapsedTime * Math.sin(elapsedTime)
      // group.rotation.y = elapsedTime * Math.cos(elapsedTime)
      // camera.position.y = Math.sin(elapsedTime);
      // camera.position.x = Math.cos(elapsedTime);
      
      // camera.lookAt(group.position);
      // let cubeRotation = cube.rotation.x;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
      

      // while (cubeRotation < 1) {
      //   cubeRotation += 0.02;
      // }
      controls.update()
      
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick); // calls the function again
    }

    tick();

  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="squareOnScreen" id="square_canvas"></canvas>
    </div>
  );
}

export default Square;
