import { RigidBody } from "@react-three/rapier";

export default function Ball({
  position,
  velocity,
}: {
  position: any;
  velocity: any;
}) {
  return (
    <RigidBody
      linearVelocity={velocity}
      colliders="ball"
      position={position}
      restitution={1.1}
    >
      <mesh>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#9868F7" roughness={0.1} />
      </mesh>
    </RigidBody>
  );
}
