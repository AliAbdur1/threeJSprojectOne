import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function Square() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(3, 3.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x20DE56 });
    const cube = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.position.y = 1;
    group.scale.y = 2;
    group.rotation.y = Math.PI / 4;
    scene.add(group);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x98F5F9 }) // applys material to the cube
    )
    cube1.position.x = 1;

    

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xFFECA1 }) // applys material to the cube
    )
    cube2.position.x = -2;

    

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xEFC3CA }) // applys material to the cube
    )
    cube2.position.x = 2.5;

    group.add(cube1, cube2, cube3); // adds the cube to the group
    // position properties of the cube. must be before reder call
    // cube.position.x = -4;
    // cube.position.y = -3;
    // cube.position.z = -2;
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

    
    const sizes = {
      width: 800,
      height: 600
    };
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set (-1, -1, 5); // same as above, lets u set all camera positions at once
    console.log(cube.position.distanceTo(camera.position),"camera position");
    scene.add(camera);

    camera.lookAt(group.position);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    
    // let time = Date.now();
    const clock = new THREE.Clock();

    gsap.to(cube.position, { x: 4, duration: 1, delay: 1})
    gsap.to(cube.position, { x: 0, duration: 1, delay: 3})
    // green sock or gsap has its own tick
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // const currenttime = Date.now();
      // const deltaTime = currenttime - time;
      // time = currenttime;
      
      // update objects

      // group.rotation.y = elapsedTime * Math.PI * 2; // deltaTime; // make objects rotate at same speed regardless of frame rate
      // group.position.x = elapsedTime * Math.sin(elapsedTime) / 3
      // group.position.y = elapsedTime * Math.cos(elapsedTime) / 3
      camera.position.y = Math.sin(elapsedTime);
      camera.position.x = Math.cos(elapsedTime);
      camera.lookAt(group.position);
      // let cubeRotation = cube.rotation.x;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
      

      // while (cubeRotation < 1) {
      //   cubeRotation += 0.02;
      // }
      
      
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
