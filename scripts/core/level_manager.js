// level_manager.js
export function createTank(scene) {
  BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/tank/", "tank.glb", scene).then(result => {
      const tank = result.meshes[0];
      tank.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1); // 크기 조절
      return tank;
  });
}