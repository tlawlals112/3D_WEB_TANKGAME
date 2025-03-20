// tank.js
export class Tank {
  constructor(scene, tankMesh) {
      this.scene = scene;
      this.mesh = tankMesh;
      this.health = 100;
      this.speed = 0.1;
      this.rotationSpeed = 0.02;
  }

  move(direction) {
    const forward = new BABYLON.Vector3(0, 0, 1);
        forward.applyRotationQuaternion(this.mesh.rotationQuaternion);
        forward.scaleInPlace(this.speed * direction);
        this.mesh.moveWithCollisions(forward);
  }

  rotate(angle) {
    this.mesh.rotationQuaternion.multiplyInPlace(BABYLON.Quaternion.RotationAxis(BABYLON.Vector3.Up(), angle));
  }
}