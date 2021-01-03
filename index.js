import * as THREE from 'three';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, appManager, popovers} from 'app';

const physicsId = physics.addBoxGeometry(new THREE.Vector3(0, -1/2, 0), new THREE.Quaternion(), new THREE.Vector3(1000, 1, 1000), false);

const w = 4;
const portalSpec = {
  objects: [
    {
      position: [-3, 0, -10],
      contentId: 'https://avaer.github.io/shield/index.js',
    },
  ],
  extents: [
    [-w/2, 0, -w/2],
    [w/2, w, w/2],
  ],
};
const s = JSON.stringify(portalSpec);
const b = new Blob([s], {
  type: 'application/json',
});
const u = URL.createObjectURL(b) + '/portal.url';
world.addObject(u, null, new THREE.Vector3(), new THREE.Quaternion());

console.log('add portal', portalSpec);