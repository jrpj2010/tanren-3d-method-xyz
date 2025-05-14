"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { type Mesh, Vector3 } from "three"

function Axis({
  position,
  rotation,
  text,
  color,
}: { position: [number, number, number]; rotation: [number, number, number]; text: string; color: string }) {
  const ref = useRef<Mesh>(null)

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ref}>
        <boxGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, 0, 2.5]} fontSize={0.5} color={color} anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

function AnimatedSphere({ position, color }: { position: Vector3; color: string }) {
  const ref = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position.x + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
      ref.current.position.y = position.y + Math.cos(state.clock.getElapsedTime() * 0.5) * 0.3
      ref.current.position.z = position.z + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
    }
  })

  return (
    <mesh
      ref={ref}
      position={[position.x, position.y, position.z]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={hovered ? "#ffffff" : color} />
    </mesh>
  )
}

function Model() {
  return (
    <>
      {/* X軸 */}
      <Axis position={[0, 0, 0]} rotation={[0, 0, 0]} text="X軸" color="#ff6b6b" />

      {/* Y軸 */}
      <Axis position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} text="Y軸" color="#4ecdc4" />

      {/* Z軸 */}
      <Axis position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} text="Z軸" color="#ffd166" />

      {/* 動く球体 - 各軸の交点 */}
      <AnimatedSphere position={new Vector3(1.5, 1.5, 1.5)} color="#ff6b6b" />
      <AnimatedSphere position={new Vector3(-1.5, 1.5, 1.5)} color="#4ecdc4" />
      <AnimatedSphere position={new Vector3(1.5, -1.5, 1.5)} color="#ffd166" />
      <AnimatedSphere position={new Vector3(1.5, 1.5, -1.5)} color="#6c5ce7" />
    </>
  )
}

export default function ThreeDimensionalModel() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}
