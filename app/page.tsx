"use client";
import { Canvas } from "@react-three/fiber";
import SceneExperience from "./components/scene";
import { Suspense } from "react";
import { ScrollControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

export default function BasicScene() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 2090,
        }}
      >
        <Suspense>
          <Physics>
            <ScrollControls pages={3} damping={0.25}>
              <SceneExperience />
            </ScrollControls>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
