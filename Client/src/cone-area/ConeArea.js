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

    window.addEventListener('mousedown', this.addEventHandler);

    window.addEventListener('mouseup', this.removeEventHandler);
  }
  addEventHandler = () => {
    window.addEventListener('mousemove', this.mousemoveHandler);
  };
  removeEventHandler = () => {
    window.removeEventListener('mousemove', this.mousemoveHandler);
  };
  mousemoveHandler = (e) => {
    this.cone.rotation.y += e.movementX / 100;
    this.cone.rotation.z += e.movementY / 100;
  };
  addModels = () => {
    const { height, radius, segments } = this.props.parameters;
    const { bottomTriangles, edges } = this.props.vertices;

    const geometry = new ConeGenerator(height, radius, segments).getGeometry(
      bottomTriangles,
      edges
    );
    const material = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
    this.cone = new THREE.Mesh(geometry, material);
    this.scene.add(this.cone);
  };
  componentWillUnmount() {
    this.stop();
    window.removeEventListener('mousedown', this.addEventHandler);

    window.removeEventListener('mouseup', this.removeEventHandler);
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
