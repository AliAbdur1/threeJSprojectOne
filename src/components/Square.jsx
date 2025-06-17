import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Square() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(3, 3.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0x20DE56 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const sizes = {
      width: 800,
      height: 600
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="squareOnScreen" id="square_canvas"></canvas>
    </div>
  );
}

export default Square;
