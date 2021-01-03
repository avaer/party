import * as THREE from 'three';
import {renderer, camera, runtime, world, universe, physics, ui, rig, app, appManager, popovers} from 'app';

const physicsId = physics.addBoxGeometry(new THREE.Vector3(0, -1/2, 0), new THREE.Quaternion(), new THREE.Vector3(1000, 1, 1000), false);

(async () => {
  const w = 4;
  const roomSpecs = [
    {
      // name: 'Red',
      color: 0x673ab7,
    },
    {
      // name: 'Green',
      color: 0x8bc34a,
    },
    {
      // name: 'Blue',
      color: 0xff5722,
    },
    {
      // name: 'Orange',
      color: 0xec407a,
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
        
        const popoverWidth = 600;
        const popoverHeight = 200;
        const popoverTarget = new THREE.Object3D();
        popoverTarget.position.copy(portalMesh.position).add(new THREE.Vector3(0, 2, 0));
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
      }),
    world.addObject(URL.createObjectURL(new Blob([JSON.stringify(streetScn)])) + '/street-multiplayer.url', null, new THREE.Vector3(w, 0, 0), new THREE.Quaternion())
      .then(portalMesh => {
        portalMesh.material.uniforms.uColor.value.setHex(0x00FF00);
        
        const popoverWidth = 600;
        const popoverHeight = 200;
        const popoverTarget = new THREE.Object3D();
        popoverTarget.position.copy(portalMesh.position).add(new THREE.Vector3(0, 2, 0));
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
      }),
  ].concat(roomSpecs.map(async (roomSpec, i) => {
    return world.addObject(URL.createObjectURL(new Blob([JSON.stringify(streetScn)])) + '/street-room-' + i + '.url', null, new THREE.Vector3(-roomSpecs.length/2 - w/2 + i*w, 0, -w), new THREE.Quaternion())
      .then(portalMesh => {
        portalMesh.material.uniforms.uColor.value.setHex(roomSpec.color);
        
        const popoverWidth = 600;
        const popoverHeight = 200;
        const popoverTarget = new THREE.Object3D();
        popoverTarget.position.copy(portalMesh.position).add(new THREE.Vector3(0, 2, 0));
        const popoverTextMesh = (() => {
          const textMesh = ui.makeTextMesh('Room ' + i, undefined, 0.5, 'center', 'middle');
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
      })
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
})();