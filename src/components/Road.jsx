import { useGLTF } from "@react-three/drei"

export function Road() {
  const road = useGLTF("/road/scene.gltf")
  // Ocultar Caminitos de costados
  road.scene.children[0].children[0].children[0].children[0].children[1].visible = false
  road.scene.children[0].children[0].children[0].children[0].children[2].visible = false
  return (
    <group position={[-2.2, 0.025, -624]}>
      <primitive object={road.scene} scale={[0.5, 0.1, 1]} />
    </group>
  )
}
