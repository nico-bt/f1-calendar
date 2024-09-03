import { Text, useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const model = useGLTF("/music_player/music_player.glb")

  const { actions } = useAnimations(model.animations, model.scene)

  const music = useRef(new Audio("/music.mp3"))
  useEffect(() => {
    music.current.loop = true
  }, [])

  function handleClick() {
    const action = actions["DiscPlate_low|DiscPlate_lowAction"]

    if (isPlaying) {
      setIsPlaying(false)
      action.paused = true
      music.current.pause()
    } else {
      setIsPlaying(true)
      action.paused = false
      action.play()
      music.current.play()
    }
  }

  return (
    <group position={[2.25, 0.12, -20]} rotation={[0, -2, -0.15]} onClick={handleClick}>
      <primitive object={model.scene} scale={5} />
      <Text fontWeight={500} scale={0.2} position={[-0.85, 1, 0]} rotation={[0, 1.6, 0]} ba>
        Click to {isPlaying ? "stop" : "play"}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[8, 6, 1]} />
          <meshBasicMaterial color={"black"} />
        </mesh>
      </Text>
    </group>
  )
}
