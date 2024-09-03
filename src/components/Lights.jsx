import { useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"

function Lights() {
  const lightRef = useRef()

  useFrame((state, delta) => {
    // make the light follow the camera
    lightRef.current.position.z = state.camera.position.z - 4
    lightRef.current.target.position.z = state.camera.position.z - 8
    lightRef.current.target.position.x = state.camera.position.x - 1.6
    lightRef.current.position.x = 10

    if (state.camera.position.z < -63) {
      lightRef.current.target.position.z = state.camera.position.z - 5
      lightRef.current.position.z = state.camera.position.z - 4
      lightRef.current.target.position.x = state.camera.position.x - 2
      lightRef.current.position.x = state.camera.position.x + 4
    }

    lightRef.current.target.updateMatrixWorld()
  })

  // useHelper(lightRef, DirectionalLightHelper, 1, "red")
  return (
    <>
      <directionalLight ref={lightRef} castShadow position={[10, 12, 1]} intensity={2.75} />
      <ambientLight intensity={0.6} />
    </>
  )
}

export default Lights
