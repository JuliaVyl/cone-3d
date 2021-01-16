import React, { Component } from 'react';

import * as THREE from 'three';
import { ConeGenerator } from './ConeGenerator';

class ConeArea extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();

    let spotLight = new THREE.SpotLight(0xeeeece);
    spotLight.position.set(1000, 1000, 1000);
    this.scene.add(spotLight);
    let spotLight2 = new THREE.SpotLight(0xddddce);
    spotLight2.position.set(-300, -300, -300);
    this.scene.add(spotLight2);

    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(5, 2, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.addModels();

    this.renderScene();
    //start animation
    this.start();

    const mousemoveHandler = (e) => {
      this.cone.rotation.y += e.movementX / 100;
      this.cone.rotation.z += e.movementY / 100;
    };

    window.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', mousemoveHandler);
    });

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mousemoveHandler);
    });
  }
  addModels = () => {
    const geometry = new ConeGenerator(5, 2, 20).getGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
    this.cone = new THREE.Mesh(geometry, material);
    this.scene.add(this.cone);
  };
  componentWillUnmount() {
    this.stop();
    document.body.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.renderScene();
    requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      ></div>
    );
  }
}
export default ConeArea;
