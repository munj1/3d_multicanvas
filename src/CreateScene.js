import { Scene, PerspectiveCamera, Color } from "three";

export class CreateScene {
  constructor(info) {
    this.renderer = info.renderer;
    this.elem = document.querySelector(info.placeholder);
    const rect = this.elem.getBoundingClientRect();

    //camera configuration
    const bgColor = info.bgColor || "white";
    const fov = info.fov || 75;
    const aspect = rect.width / rect.height; //html요소의 크기에 맞춰서
    const near = info.near || 0.1;
    const far = info.far || 100;
    const cameraPosition = info.cameraPosition || { x: 0, y: 0, z: 3 };

    //scene
    this.scene = new Scene();
    this.scene.background = new Color(bgColor);

    //camera
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.x = cameraPosition.x;
    this.camera.position.y = cameraPosition.y;
    this.camera.position.z = cameraPosition.z;
    this.scene.add(this.camera);

    this.meshes = [];
  }

  //외부에서 들어온함수를 그냥 실행시키는 메소드 (light, mesh 준비)
  set(func) {
    func();
  }

  render() {
    //영역을 지정해서 영역에다 scene을 그리자
    const renderer = this.renderer;
    // 스크롤등 위치변화할때마다 갱신하도록 설정해줘야해 (main.js에서 render메소드 계속 반복할거야)
    // rect를 계속 받아온다 (위치)
    const rect = this.elem.getBoundingClientRect();

    //안보이는건 일단 안그린다
    if (
      rect.top > renderer.domElement.clientHeight ||
      rect.bottom < 0 ||
      rect.left > renderer.domElement.clientWidth ||
      rect.right < 0
    )
      return;
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();

    const canvasBottom = renderer.domElement.clientHeight - rect.bottom;
    renderer.setScissor(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setScissorTest(true);
    renderer.setViewport(rect.left, canvasBottom, rect.width, rect.height);

    renderer.render(this.scene, this.camera);
  }
}
