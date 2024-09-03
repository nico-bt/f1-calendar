import { Float, useGLTF } from "@react-three/drei"

export default function Trofeo() {
  const model = useGLTF("/trofeo/golden_trophy.glb")
  return (
    <Float position={[0, 4, -546]} floatIntensity={3} speed={4} rotationIntensity={1.6}>
      <primitive object={model.scene} scale={1} rotation={[0.3, 0, 0]} />
    </Float>
  )
}
