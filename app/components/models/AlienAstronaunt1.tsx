/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/AlienAstronaunt1.glb -o app/components/models/AlienAstronaunt1.glb.tsx 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GroupProps, useFrame, useGraph, useThree } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export function AlienAstronaunt1({
  animation = "CharacterArmature|Idle",
  ...props
}: GroupProps & { animation?: string }) {
  const { camera } = useThree();

  const group = useRef<any>(null!);
  const { scene, materials, animations } = useGLTF(
    "/models/AlienAstronaunt1.glb"
  ) as any;
  const { actions } = useAnimations(animations, group);
  // const [animation, setAnimation] = useState("CharacterArmature|Idle");

  //If you create more AlienAstronaunt1,skinnedMesh will be reused, so do avoid glitches, we have to clone the nodes
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as any;

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.lookAt(camera.position);
  });

  useEffect(() => {
    const currentAction = actions[animation]?.reset().fadeIn(1).play();
    // If CharacterArmature|Death, execute it only once
    if (animation === "CharacterArmature|Death") {
      if (currentAction) {
        currentAction.setLoop(THREE.LoopOnce, 1);
        currentAction.clampWhenFinished = true; // Mfeep final animation state
      }
    }
    return () => {
      actions[animation]?.fadeOut(1);
    };
  }, [animation, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="BarbaraTheBee"
            geometry={nodes.BarbaraTheBee.geometry}
            material={materials.Atlas}
            skeleton={nodes.BarbaraTheBee.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/AlienAstronaunt1.glb");
