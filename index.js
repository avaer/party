import * as THREE from 'three';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, appManager, popovers} from 'app';

const physicsId = physics.addBoxGeometry(new THREE.Vector3(0, -1/2, 0), new THREE.Quaternion(), new THREE.Vector3(1000, 1, 1000), false);

(async () => {
  await world.addObject(`https://webaverse.github.io/street/street.url`, null, new THREE.Vector3(), new THREE.Quaternion());
})();