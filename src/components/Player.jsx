import { useGLTF, useKeyboardControls, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

function Player() {
  const { rapier, world } = useRapier()
  const [suscribeKeys, getKeys] = useKeyboardControls()
  const car = useGLTF("/williams/scene.gltf")
  // const car = useGLTF("/williams/car_centered_wheels.glb")
  const playerRef = useRef(new THREE.Vector3())

  // For lerping
  const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [smoothedCameraTarget] = useState(new THREE.Vector3())

  // Rotar las ruedas
  let group = car.scene.children[0].children[0]
  // group.children[26].visible = false
  // group.children[25].visible = false
  // group.children[24].rotation.x = t * 2
  // group.children[0].rotation.x = t * 2
  // group.children[1].rotation.x = t * 2
  // group.children[2].rotation.x = t * 2
  // group.children[3].rotation.x = t * 2
  // group.children[4].rotation.x = t * 2
  // console.log(car.scene.children[0].chi

  useFrame((state, delta) => {
    // Arrow moves - controls
    //   -------------------------
    const keys = getKeys()
    const impulse = { x: 0, y: 0, z: 0 }
    let t = state.clock.getElapsedTime()

    // Rotar las ruedas
    let group = car.scene.children[0].children[0]
    // car.scene.children[0].rotation.x = t * 0.5
    // group.children[25].rotation.x = t * 2
    // group.children[24].rotation.x = t * 2
    // group.children[0].rotation.x = t * 2
    // group.children[1].rotation.x = t * 2
    // group.children[2].rotation.x = t * 2
    // group.children[3].rotation.x = t * 2
    // group.children[4].rotation.x = t * 2
    // console.log(car.scene.children[0].children[0].children[0].children[0])

    if (keys.forward) {
      impulse.z = -15 * delta
    }
    if (keys.back) {
      impulse.z = 15 * delta
    }

    // @ts-ignore
    const playerPosition = playerRef.current.translation()

    playerRef.current?.applyImpulse(impulse, true)

    // Camera
    // --------------------
    // console.log(playerPosition)
    // console.log(state.camera.position)

    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(playerPosition)
    cameraPosition.z += 4
    cameraPosition.y += 2.25

    // Adonde apunta la camara
    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(playerPosition)
    cameraTarget.y += 1.5

    // Mirando auto al principio
    if (playerPosition.z > -1.2) {
      cameraPosition.z -= 8.25
      // cameraPosition.x += 0
      cameraPosition.y -= 1
      cameraTarget.y -= 0.15
    }

    // Mirando cartel calendario gral
    if (playerPosition.z < -58 && playerPosition.z > -95) {
      cameraPosition.x += 2
      cameraPosition.z -= 1.25
      cameraTarget.x += 4.3
      cameraTarget.z -= 1.15
      cameraTarget.y += 0.6
    }

    // Mirando listado carteles circuitos individuales
    if (playerPosition.z < -117) {
      cameraTarget.y += 0.6
    }

    // lerp
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

    // update camera
    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)
  })

  return (
    <RigidBody
      ref={playerRef}
      restitution={0.2}
      friction={0.8}
      linearDamping={0.4}
      angularDamping={0.5}
      type="dynamic"
      colliders={false}
    >
      <CuboidCollider args={[0.5, 0.25, 1]} position={[0, 0.5, 0]} />
      <primitive object={car.scene} scale={0.6} rotation={[0, 3.14, 0]} position={[0, 0.26, 0]} />
    </RigidBody>
  )
}

export default Player
