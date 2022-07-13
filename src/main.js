import * as THREE from "three";
import { CreateScene } from "./CreateScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ----- 주제: 여러개의 캔버스 사용하기

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

//scene , light, mesh 다없음
//scene 여러개 독립된모듈에서 만들자 (
const scene1 = new CreateScene({
  renderer,
  placeholder: ".canvas-placeholder.a",
  //   cameraPosition: { x: -1, y: 1, z: 2 },
});

const gltfLoader = new GLTFLoader();

//light, mesh
scene1.set(() => {
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  //   scene1.scene.add(light);
  scene1.camera.add(light);

  scene1.controls = new OrbitControls(scene1.camera, scene1.elem);

  const geomtetry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "green",
  });
  const mesh = new THREE.Mesh(geomtetry, material);

  scene1.meshes.push(mesh);
  scene1.meshes.forEach((mesh) => {
    scene1.scene.add(mesh);
  });
});

const scene2 = new CreateScene({
  renderer,
  placeholder: ".canvas-placeholder.b",
});

//light, mesh
scene2.set(() => {
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  //   scene1.scene.add(light);
  scene2.camera.add(light);

  scene2.controls = new OrbitControls(scene2.camera, scene2.elem);

  const geomtetry = new THREE.BoxGeometry(0.4, 1, 0.7);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geomtetry, material);

  scene2.meshes.push(mesh);
  scene2.meshes.forEach((mesh) => {
    scene2.scene.add(mesh);
  });
});

const scene3 = new CreateScene({
  renderer,
  placeholder: ".canvas-placeholder.c",
});

//light, mesh
scene3.set(() => {
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(-1, 2, 3);
  //   scene1.scene.add(light);
  scene3.camera.add(light);

  scene3.controls = new OrbitControls(scene3.camera, scene3.elem);

  gltfLoader.load("./models/ilbuni.glb", (glb) => {
    const mesh = glb.scene.children[0];
    scene3.meshes.push(mesh);
    scene3.scene.add(mesh);
  });

  scene3.meshes.forEach((mesh) => {
    scene3.scene.add(mesh);
  });
});

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  scene1.meshes.forEach((mesh) => {
    mesh.rotation.y += delta;
  });

  scene1.render();

  scene2.meshes.forEach((mesh) => {
    mesh.rotation.y += delta;
  });
  scene2.render();

  scene3.render();

  renderer.setAnimationLoop(draw);
}

//각 모듈에서 실행
function setSize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);

draw();
