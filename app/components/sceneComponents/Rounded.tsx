import { Box, RoundedBox, Shadow, useTexture } from "@react-three/drei";
import { Euler, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { useControls } from "leva";
import { Ref, useRef, useState } from "react";
import gsap from "gsap";

export default function Roudned({
  args,
  position,
  rotation,
  url,
  onClick,
  onPointerOut,
  onPointerOver,
  onPointerMissed,
  onHit,
}: {
  url: string;
  position: any;
  rotation?: Euler | undefined;
  onClick?: () => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMissed?: (e: MouseEvent) => void;
  onHit?: () => void;
  args:
    | [
        width?: number | undefined,
        height?: number | undefined,
        depth?: number | undefined
      ]
    | undefined;
}) {
  const ref = useRef<any>();
  const [isFlipping, setIsFlipping] = useState(false);
  const texture = useTexture(url);
  // const directionalRef = useRef<any>(null);

  //   const lightControls = useControls({
  //     Visible: true,
  //     Color: "white",
  //     Intensity: 6,
  //     "Position X": 1,
  //     "Position Y": -3,
  //     "Position Z": 30,
  //   });

  const flipCard = () => {
    // Verifica se la card è già in animazione
    if (gsap.isTweening(ref.current.rotation)) {
      return;
    }

    gsap.to(ref.current.rotation, {
      x: "+=10",
      duration: 3,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
      repeat: 1,
    });
    onHit && onHit();
  };

  return (
    <>
      {/* <directionalLight
        ref={directionalRef}
        position={[
          lightControls["Position X"],
          lightControls["Position Y"],
          lightControls["Position Z"],
        ]}
        color={lightControls["Color"]}
        intensity={lightControls["Intensity"]}
        visible={lightControls["Visible"]}
      /> */}
      <group position={position} rotation={rotation}>
        <RigidBody onCollisionEnter={flipCard} type="kinematicPosition">
          <Box
            ref={ref}
            onPointerOut={(e) => onPointerOut && onPointerOut(e)}
            onPointerOver={(e) => onPointerOver && onPointerOver(e)}
            onPointerMissed={(e) => onPointerMissed && onPointerMissed(e)}
            args={args}
            onClick={() => onClick && onClick}
          >
            <meshBasicMaterial map={texture} reflectivity={0.3} />
          </Box>
        </RigidBody>
        <Shadow
          position={[0, -1, 0]}
          color="#9868F7"
          colorStop={0}
          opacity={0.2}
        />
      </group>
    </>
  );
}
