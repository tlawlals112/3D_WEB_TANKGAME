// app.js
// import * as BABYLON from '@babylonjs/core'; // 반드시 제거!!!
import { GridMaterial } from '@babylonjs/materials';
import { createTank } from './scripts/core/level_manager.js';
import { Tank } from './scripts/entities/tank.js';

// 캔버스 엘리먼트 가져오기
const canvas = document.getElementById("renderCanvas");

// Babylon.js 엔진 생성
const engine = new BABYLON.Engine(canvas, true);

// 씬 생성 함수
const createScene = () => {
    // 씬 생성
    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true; // 충돌 활성화

    // 카메라 생성 (ArcRotateCamera)
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // 광원 생성 (HemisphericLight)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 바닥 생성 (선택 사항)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    ground.checkCollisions = true; // 충돌 체크 활성화
    const gridMaterial = new GridMaterial("gridMaterial", scene);
    ground.material = gridMaterial;

    return scene;
};

// 씬 생성
const scene = createScene();
let playerTank;
createTank(scene).then(tankMesh => {
    playerTank = new Tank(scene, tankMesh);
    tankMesh.checkCollisions = true; // 충돌 체크 활성화
});

// 키보드 입력 처리
const inputMap = {};
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

// 렌더링 루프
engine.runRenderLoop(() => {
    if (playerTank) {
        if (inputMap["w"] || inputMap["W"]) {
            playerTank.move(1);
        }
        if (inputMap["s"] || inputMap["S"]) {
            playerTank.move(-1);
        }
        if (inputMap["a"] || inputMap["A"]) {
            playerTank.rotate(-0.02);
        }
        if (inputMap["d"] || inputMap["D"]) {
            playerTank.rotate(0.02);
        }
    }

    scene.render();
});

// 윈도우 리사이즈 이벤트 처리
window.addEventListener("resize", () => {
    engine.resize();
});