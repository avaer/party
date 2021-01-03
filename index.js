import * as THREE from 'three';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, appManager, popovers} from 'app';

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