import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry, DoubleSide } from "three";

export default function CustomObject() {
  const numerVertices = 3;
  const verticesCount = 40 * numerVertices; //10 triangles (10 object for 3 vertices)
  const ref = useRef<BufferGeometry>(null!);

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3); //10 triangles for 3 dimensions
    //Fill array wwith random values
    for (let i = 0; i < verticesCount * numerVertices; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  useEffect(() => {
    ref.current.computeVertexNormals();
  });

  return (
    <mesh>
      <bufferGeometry ref={ref}>
        <bufferAttribute
          attach="attributes-position" // attach the attribute to the geometry
          count={verticesCount} //set how many vertices will have this geometry
          itemSize={3} // how many size, in this case 3 becasue has 3 dimension
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial side={DoubleSide} wireframe />
    </mesh>
  );
}
