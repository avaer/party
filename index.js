import * as THREE from 'three';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, appManager, popovers} from 'app';

const physicsId = physics.addBoxGeometry(new THREE.Vector3(0, -1/2, 0), new THREE.Quaternion(), new THREE.Vector3(1000, 1, 1000), false);

(async () => {
  const w = 4;
  const roomSpecs = [
    {
      name: 'Red',
      color: 0x0000FF,
    },
    {
      name: 'Green',
      color: 0x00FFFF,
    },
    {
      name: 'Blue',
      color: 0x00FFFF,
    },
    {
      name: 'Orange',
      color: 0x00FFFF,
    },
  ];
  const res = await fetch(`https://webaverse.github.io/street/street.scn`);
  const streetScn = await res.json();
  streetScn.extents = [
    [-w/2, 0, -w/2],
    [w/2, w, w/2],
  ];
  await Promise.all([
    world.addObject(URL.createObjectURL(new Blob([JSON.stringify(streetScn)])) + '/street.url', null, new THREE.Vector3(), new THREE.Quaternion())
      .then(portalMesh => {
        portalMesh.material.uniforms.uColor.value.setHex(0xFF0000);
      }),
    world.addObject(URL.createObjectURL(new Blob([JSON.stringify(streetScn)])) + '/street-multiplayer.url', null, new THREE.Vector3(w, 0, 0), new THREE.Quaternion())
      .then(portalMesh => {
        portalMesh.material.uniforms.uColor.value.setHex(0x00FF00);
      }),
  ].concat(roomSpecs.map(async (roomSpec, i) => {
    /* const roomSpec = roomSpecs[i];
    const popoverWidth = 600;
    const popoverHeight = 200;
    const popoverTarget = new THREE.Object3D();
    popoverTarget.position.y = 2;
    const popoverTextMesh = (() => {
      const textMesh = ui.makeTextMesh('Multiplayer', undefined, 0.5, 'center', 'middle');
      textMesh.position.z = 0.1;
      textMesh.scale.x = popoverHeight / popoverWidth;
      textMesh.color = 0xFFFFFF;
      return textMesh;
    })();
    const popoverMesh = popovers.addPopover(popoverTextMesh, {
      width: popoverWidth,
      height: popoverHeight,
      target: popoverTarget,
    });
    popoverMesh.position.x = i;
    popoverMesh.position.z = -2; */
  })));

  {
    const popoverWidth = 600;
    const popoverHeight = 200;
    const popoverTarget = new THREE.Object3D();
    popoverTarget.position.set(0, 2, 0);
    const popoverTextMesh = (() => {
      const textMesh = ui.makeTextMesh('Solo', undefined, 0.5, 'center', 'middle');
      textMesh.position.z = 0.1;
      textMesh.scale.x = popoverHeight / popoverWidth;
      textMesh.color = 0xFFFFFF;
      return textMesh;
    })();
    const popoverMesh = popovers.addPopover(popoverTextMesh, {
      width: popoverWidth,
      height: popoverHeight,
      target: popoverTarget,
    });
  }
  {
    const popoverWidth = 600;
    const popoverHeight = 200;
    const popoverTarget = new THREE.Object3D();
    popoverTarget.position.set(w, 2, 0);
    const popoverTextMesh = (() => {
      const textMesh = ui.makeTextMesh('Multiplayer', undefined, 0.5, 'center', 'middle');
      textMesh.position.z = 0.1;
      textMesh.scale.x = popoverHeight / popoverWidth;
      textMesh.color = 0xFFFFFF;
      return textMesh;
    })();
    const popoverMesh = popovers.addPopover(popoverTextMesh, {
      width: popoverWidth,
      height: popoverHeight,
      target: popoverTarget,
    });
  }
})();