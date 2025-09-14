import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import ImageSourceBrick1 from '/src/images/brick texture-1.jpg'


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};


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
    const gui = new GUI({
      title: 'Debug UI Settings',
      width: 300,
      closeFolders: true
    });
    gui.close();
    window.addEventListener('keydown', (event) =>
      {
        if (event.key === 'h') {
          gui.show(gui._hidden); // toggles debug ui
        }
      });
    const guidebug = {}
    const imagebrick1 = new Image();
    imagebrick1.src = ImageSourceBrick1; // image import
    const texturebrick1 = new THREE.Texture(imagebrick1);
    texturebrick1.colorSpace = THREE.SRGBColorSpace; // sRBG encoding
    imagebrick1.onload = () => {
      
      texturebrick1.needsUpdate = true;
      // guidebug.texture = texture
    }

    const textureloader = new THREE.TextureLoader();
    const texturebrick2 = textureloader.load('src/images/19895-wall-texture-bricks-light-4k.jpg');
    texturebrick2.colorSpace = THREE.SRGBColorSpace;

// had to move this eventlistener to useEffect so that it would run when the component is mounted
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      console.log('window is resized');
    });
// fullscreen code block. all the webkit shit is for safari and stuff
    window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
    } else if (canvasRef.current.webkitRequestFullscreen) {
      canvasRef.current.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  console.log('double clicked');
});

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(3, 3.5, 2);
    guidebug.color = 0xb79f3f;
    const material = new THREE.MeshBasicMaterial({ color: guidebug.color });
    const cube = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.position.y = 0;
    group.scale.y = 1;
    group.rotation.y = Math.PI / 4;
    scene.add(group);

    // Define vertices of a single triangle

// Create a BufferAttribute and attach it to the geometry

// Create geometry
const geometry1 = new THREE.BufferGeometry();
const tricount = 30;

// Each triangle has 3 vertices, each vertex has 3 coordinates (x,y,z)
const positionsArray = new Float32Array(tricount * 3 * 3);

for (let i = 0; i < positionsArray.length; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4; // Random spread
}

// Attach positions to geometry
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry1.setAttribute('position', positionsAttribute);

// Create a material (DoubleSide so both faces show)
const trimaterial = new THREE.MeshBasicMaterial({
  color: 0xFFEB3B,
  side: THREE.DoubleSide,
  wireframe: true // set true if you want outlines only
});

// Make a mesh out of it
const triangleMesh = new THREE.Mesh(geometry1, trimaterial);

// Add to scene
scene.add(triangleMesh);






    //for (let i = 0; i < 9; i++) {
      //positionsArray[i] = (Math.random() - 0.5) * 4;
    //}

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x98F5F9 , wireframe: true}) // applys material to the cube
    )
    cube1.position.x = 0;

    

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ map: texturebrick1 }) // applys material to the cube
    )
    cube2.position.x = -1.5;

    

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ map: texturebrick2 }) // applys material to the cube
    )
    cube3.position.x = 1.5;

    group.add(cube1, cube2, cube3); // adds the cube to the group
    // position properties of the cube. must be before reder call
    
    scene.add(cube);
    cube.position.set(-2, -3, -4); // same as above, lets u set all at once
    cube.scale.set(2, 0.5, .5);
    
    // be aware of the order of rotation
    // gimbal lock fix: change the order of rotation
    cube.rotation.order = "YXZ"; // reorder before changing rotation
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
      
      const floatyCubeTweaks = gui.addFolder('Floaty Cube Tweaks')
      floatyCubeTweaks
        .add(cube.position, 'y')
        .min(-5).max(5)
        .step(0.01)
        .name('elevation');
      floatyCubeTweaks
        .add(cube, 'visible');
      floatyCubeTweaks
        .add(cube.material, 'wireframe');
      floatyCubeTweaks
        .addColor(guidebug, 'color')
        .onChange((value) => 
        {
          material.color.set(value)
          console.log(material.color.getHexString())
          // threeJS uses some sort of color optimizer thing to get the hex value. color look a bit different than expected
        });

    guidebug.spin = () => {
      gsap.to(cube.rotation, {y: cube.rotation.y + Math.PI * 2})
    }
    floatyCubeTweaks.add(guidebug, 'spin')

    guidebug.subdivision = 2
    floatyCubeTweaks
        .add(guidebug, 'subdivision')
        .min(1)
        .max(20)
        .step(1)
        .onFinishChange(() =>
          {
            cube.geometry.dispose();
            cube.geometry = new THREE.BoxGeometry(
              3, 3, 3,
              guidebug.subdivision, guidebug.subdivision, guidebug.subdivision);
              // changes subdivision amount of object
            console.log('subdivision changed')
          })

    const controls = new OrbitControls(camera, canvasRef.current)
    controls.enableDamping = true;
    camera.lookAt(group.position);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // for device pixel ratio

    
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
