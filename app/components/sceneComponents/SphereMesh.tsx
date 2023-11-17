import { Vector3 } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
export default function SphereMesh({ position }: { position: Vector3 }) {
  const ref = useRef<Mesh>(null!);

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 3, 3]} />
      <meshStandardMaterial color={"lightgrey"} wireframe />
    </mesh>
  );
}
