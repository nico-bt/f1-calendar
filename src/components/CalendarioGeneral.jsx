const { Image } = require("@react-three/drei")

export function Calendar() {
  return (
    <group scale={14} position={[13.2, 3.2, -100]} rotation={[0, -0.6, 0]}>
      <Image url="/calendario_general.png" toneMapped={false} scale={[1.3, 1]} />
    </group>
  )
}
