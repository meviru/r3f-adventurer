import { OrbitControls } from "@react-three/drei";
import { Adventurer } from "./Adventurer";
import { useGLTF } from '@react-three/drei'
import { useControls } from "leva";
import { useEffect, useState } from "react";

export const Experience = () => {
  const { nodes, materials, animations: allAnimations } = useGLTF('models/Adventurer.glb')
  const [animationsList, setAnimationsList] = useState([]);

  useEffect(() => {
    const result = allAnimations.map((animation) => animation.name.split("|").pop());
    setAnimationsList(result);
  }, [])

  const { animation } = useControls({
    animation: {
      value: "Idle",
      options: animationsList
    }
  }, [animationsList])
  return (
    <>
      <OrbitControls />
      <group position-y={-1}>
        <Adventurer animation={animation} nodes={nodes} materials={materials} allAnimations={allAnimations} />
      </group>
      <ambientLight intensity={1} />
    </>
  );
};
