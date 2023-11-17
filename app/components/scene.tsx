"use client";
import {
  Box,
  Center,
  Float,
  Html,
  Line,
  PerspectiveCamera,
  Plane,
  Scroll,
  ScrollControls,
  Shadow,
  Text3D,
  useCursor,
  useScroll,
} from "@react-three/drei";
import {
  Canvas,
  Object3DNode,
  ThreeEvent,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Fragment,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Mesh } from "three";
import * as THREE from "three";
import CustomObject from "./sceneComponents/CustomObject";
import { CameraControls, OrbitControls } from "@react-three/drei";
import Rounded from "./sceneComponents/Rounded";
import Ball from "./sceneComponents/Ball";
import SphereMesh from "./sceneComponents/SphereMesh";
import SideBar from "./sceneComponents/SideBar";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Astronaunt } from "./models/Astronaunt";
import { AlienAstronaunt1 } from "./models/AlienAstronaunt1";

export default function SceneExperience() {
  const { camera, gl, pointer, raycaster } = useThree();
  const scroll = useScroll();
  const [hits, setHits] = useState(0);
  const cubeRef = useRef<Mesh>(null!);
  const [meshes, setMeshes] = useState<Mesh[]>([]!);
  const [steps, setSteps] = useState({
    step1: 0,
    step2: 0,
    step3: 0,
  });
  const [balls, setBalls] = useState<any>([]);

  useFrame((state, delta) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.y += delta * 0.1;
    cubeRef.current.rotation.x += delta * 0.1;
    setSteps({
      step1: 1 - scroll.range(0, 1 / 3),
      step2: scroll.curve(1 / 3, 1 / 3),
      step3: scroll.range(2 / 3, 1 / 3),
    });
  });
  // const angle = state.clock.elapsedTime * 0.01;
  // state.camera.position.x = Math.sin(angle) * 8;
  // state.camera.position.z = Math.cos(angle) * 8;
  // state.camera.lookAt(0, 0, 0);

  const generateMesh = () => {
    const theta = Math.random() * 2 * Math.PI;
    const x = 2 * Math.cos(theta);
    const y = 2 * Math.sin(theta);

    const newMesh = <SphereMesh key={Math.random()} position={[x, y, 0]} />;
    setMeshes((prevMeshes: any) => [...prevMeshes, newMesh]);
  };

  const throwBall = (e: MouseEvent | ThreeEvent<PointerEvent>) => {
    if (!steps.step1) return;
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY + window.innerHeight * scroll.offset) / window.innerHeight) *
        2 +
        1
    );

    raycaster.setFromCamera(mouse, camera);

    // Find world 3D point where raycaster interect an imaginary plane in front of camera
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    const launchPosition = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, launchPosition);

    const startPoint = new THREE.Vector3()
      .copy(camera.position) // Start from camera position
      .sub(raycaster.ray.direction.clone().multiplyScalar(2)); // Shift behind along the raycaster

    const direction = launchPosition.clone().sub(startPoint).normalize();
    setBalls([
      ...balls,
      <Ball
        position={startPoint.toArray()}
        velocity={direction.multiplyScalar(30).toArray()}
      />,
    ]);
  };

  const animation = useMemo(() => {
    const n = meshes.length;
    switch (true) {
      case n > 8 && n < 10:
        return "CharacterArmature|Walk";
      case n >= 10 && n < 15:
        return "CharacterArmature|Run_Gun";
      case n >= 15:
        return "CharacterArmature|Death";
      default:
        return "CharacterArmature|Idle";
    }
  }, [meshes.length]);

  useEffect(() => {
    let meshCount = 0;
    const intervalId = setInterval(() => {
      if (meshCount < 8) {
        generateMesh();
        meshCount++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <directionalLight intensity={1.2} />
      <ambientLight intensity={1} />
      {/* <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} /> */}
      <color args={[252, 252, 252]} attach="background" />

      <OrbitControls args={[camera, gl.domElement]} enableZoom={false} />

      <SideBar onGenerate={generateMesh} steps={steps} />

      <Scroll>
        <group onPointerMissed={throwBall} onPointerDown={throwBall}>
          <Center position={[0, 1.4, 0]}>
            <Text3D font="/fonts/valu.json" scale={0.5}>
              {hits} Hits!
              <meshNormalMaterial />
            </Text3D>
          </Center>
          {/* <Float speed={hits * 2.5}>
            </Float> */}
          <Rounded
            onHit={() => setHits((old) => (old += 1))}
            rotation={[0, 0.5, 0]}
            args={[1, 1.5, 0.03]}
            position={[-3, 0, 0]}
            url="/02.jpg"
          />
          <Rounded
            onHit={() => setHits((old) => (old += 1))}
            args={[1, 1.5, 0.03]}
            position={[0.01, 0, -0.5]}
            url="/01.jpg"
          />
          <Rounded
            onHit={() => setHits((old) => (old += 1))}
            rotation={[0, -0.5, 0]}
            args={[1, 1.5, 0.03]}
            position={[3, 0, 0]}
            url="/03.jpg"
          />
        </group>

        {balls.length > 0 &&
          balls.map((ball: any, index: number) => (
            <Fragment key={index}>{ball}</Fragment>
          ))}

        <group position={[0, -4.8, 0]}>
          <spotLight intensity={6} />
          <directionalLight
            intensity={8}
            position={[-4, 0, 0]}
            color={"#E51CD9"}
          />
          <directionalLight
            intensity={8}
            position={[4, 0, 0]}
            color={"#0001C4"}
          />

          <mesh ref={cubeRef} rotation-x={Math.PI * 0.4}>
            <boxGeometry args={[1, 1, 1, 2, 2]} />
            <meshStandardMaterial wireframe />
          </mesh>
          {/* <Astronaunt /> */}
          <AlienAstronaunt1
            scale={0.2}
            position={[0, -0.3, 0]}
            animation={animation}
          />
          {meshes && meshes.length && meshes.map((mesh: any) => mesh)}
        </group>

        <CustomObject />
      </Scroll>
    </>
  );
}

// <EffectComposer>
//   {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
//   <Bloom
//     blendFunction={BlendFunction.ADD}
//     intensity={1.3} // The bloom intensity.
//     width={300} // render width
//     height={300} // render height
//     kernelSize={5} // blur kernel size
//     luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
//     luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
//   />
//   <ChromaticAberration
//     blendFunction={BlendFunction.NORMAL} // blend mode
//     radialModulation={false}
//     modulationOffset={0}
//   />
// </EffectComposer>;
