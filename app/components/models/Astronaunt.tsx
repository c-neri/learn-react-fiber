/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/Astronaut.glb -o app/components/models/Astronaunt.tsx 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Astronaunt(props: any) {
  const { nodes, materials } = useGLTF("/models/Astronaut.glb") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Astronaut_mesh.geometry}
        material={materials.Astronaut_mat}
      />
    </group>
  );
}

useGLTF.preload("/Astronaut.glb");

//Command: npx gltfjsx public/models/Astronaut.glb -o app/components/models/Astronaunt.tsx