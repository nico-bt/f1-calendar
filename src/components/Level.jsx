import { Image, Text } from "@react-three/drei"
import { CuboidCollider } from "@react-three/rapier"
import * as THREE from "three"
import { Road } from "./Road"
THREE.ColorManagement.legacyMode = false
import { timelineData } from "@/utils/data"
import { useState } from "react"
import { MusicPlayer } from "./MusicPlayer"
import { Calendar } from "./CalendarioGeneral"
import Trofeo from "./Trofeo"

function InitialText({ position = [2.75, 1.26, 2], text = "⬆️⬇️ para mover" }) {
  return (
    <group position={position}>
      <Text
        fontWeight={800}
        letterSpacing={0.03}
        scale={0.8}
        position={[-2.9, 1.7, 3]}
        maxWidth={0.25}
        lineHeight={1.1}
        rotation={[-0.16, 3.14, 0]}
      >
        {text}
        <meshBasicMaterial toneMapped={false} />
        <Text fontWeight={200} scale={1.25} position={[0, -2.24, 0]}>
          <meshBasicMaterial toneMapped={false} />
          ⌨️
        </Text>
      </Text>
    </group>
  )
}

function BlockText({ position = [0, 0, 0], text = "Lorem ipsum", scale = 0.8 }) {
  return (
    <group position={position}>
      <Text
        fontWeight={800}
        letterSpacing={0.03}
        scale={scale}
        position={[0, 1.75, 1.5]}
        maxWidth={8}
        lineHeight={1.1}
        castShadow
        rotation={[0, 0, 0]}
        textAlign="left"
      >
        {text}
        <meshBasicMaterial toneMapped={false} />
      </Text>
    </group>
  )
}

function TimeLineItem({ position = [0, 0, 0], circuit = "placeholder", img, img_x, img_y }) {
  return (
    <group position={position}>
      {/* Date and Circuit */}
      <Text
        fontWeight={800}
        letterSpacing={0.03}
        scale={0.85}
        position={[0, 3.46, 0]}
        lineHeight={0.9}
      >
        {circuit}
        <meshBasicMaterial toneMapped={false} />
      </Text>
      {/* Circuit Img */}
      <group scale={5.5} position={[0, 1, 0]}>
        <Image url={img} toneMapped={false} scale={[img_x, img_y]} />
      </group>
    </group>
  )
}

function FloorColider() {
  return (
    <>
      <CuboidCollider args={[1, 0.05, 280]} position={[0, -0.05, -278]}>
        {/* <mesh position={[0, -0.05, 0]}> */}
        {/* <boxGeometry args={[2.6, 0.2, 280 * 2, 6, 0, 250]} /> */}
        {/* <meshStandardMaterial wireframe color={"darkblue"} /> */}
        {/* </mesh> */}
      </CuboidCollider>
      <CuboidCollider args={[0.4, 1, 280]} position={[-0.9, 1, -278]} />
      <CuboidCollider args={[0.4, 1, 280]} position={[0.9, 1, -278]} />
      <CuboidCollider args={[1.5, 1.5, 0.5]} position={[0, 0.5, 2.5]} />

      {/* Final wall */}
      <CuboidCollider args={[1.5, 1.5, 0.5]} position={[0, 0.5, -540]}>
        <Image
          url="/access-denied.jpg"
          toneMapped={false}
          scale={[6, 3]}
          position={[0, 0.5, 0]}
          transparent
        />
      </CuboidCollider>
    </>
  )
}

function ColiderActivationVisibility({ setVisible }) {
  return (
    <CuboidCollider
      sensor
      args={[1.5, 1.5, 0.5]}
      position={[0, 0.5, -48]}
      onIntersectionEnter={() => setVisible(true)}
    />
  )
}

function Level() {
  return (
    <>
      <MusicPlayer />
      <InitialText />
      <BlockText position={[0, 3.5, -36]} text="Calendario F1" scale={3} />
      <FloorColider />
      <Road />

      <Calendar />

      {timelineData.map((item) => (
        <TimeLineItem
          key={item.id}
          circuit={item.date_circuit}
          img={item.img}
          img_x={item.x}
          img_y={item.y}
          position={[0, 1.35, -115 - item.id * 45]}
        />
      ))}
      <Trofeo />
    </>
  )
}

export default Level
