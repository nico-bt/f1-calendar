import { Float, useGLTF } from "@react-three/drei"

export default function Trofeo() {
  const model = useGLTF("/trofeo/golden_trophy.glb")
  return (
    <Float position={[0, 12, -590]} floatIntensity={10} speed={2.25} rotationIntensity={1.6}>
      <primitive object={model.scene} scale={4} rotation={[0.3, 0, 0]} />
    </Float>
  )
}
