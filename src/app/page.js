"use client"
import Level from "@/components/Level"
import Lights from "@/components/Lights"
import Player from "@/components/Player"
import { Environment, KeyboardControls, Loader, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Suspense, useMemo } from "react"

export default function Home() {
  const map = useMemo(() => {
    return [
      { name: "forward", keys: ["ArrowUp"] },
      { name: "back", keys: ["ArrowDown"] },
    ]
  }, [])

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows camera={{ fov: 45, near: 0.1, far: 700, position: [2.5, 4, 6] }}>
          <Suspense fallback={null}>
            {/* <OrbitControls /> */}
            <Environment background={false} files="/park.hdr" />

            <Physics>
              <Lights />
              <Level />
              <Player />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <Loader />
    </>
  )
}
