import React, { useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useSpring } from "@react-spring/three"

import "./index.css"

import Model from "./model.jsx"
import AnimationControls from "./Animation.jsx"

export default function App() {
  const [selectedPart, setSelectedPart] = useState(null)
  const [rotationIndex, setRotationIndex] = useState(0) // New state for tracking rotation index

  // Predefined rotations

  const rotations = [
    [Math.PI / 9, 0, 0],
    [Math.PI / 12, 0, 0],
    [-Math.PI / 20, 0, 0],
    [-Math.PI / 12, 0, 0],
    [0, 0, -Math.PI / 2],
  ]

  // Create a spring for smooth animation
  const [spring, api] = useSpring(() => ({
    rotation: rotations[0],
    config: { mass: 1, tension: 280, friction: 20 },
  }))

  const onSelectPart = useCallback(
    (direction) => {
      setRotationIndex((prevIndex) => {
        const newIndex =
          direction === "down"
            ? (prevIndex + 1) % rotations.length
            : (prevIndex - 1 + rotations.length) % rotations.length

        // Animate to the new rotation
        api.start({ rotation: rotations[newIndex] })

        console.log(`Selected part: ${newIndex}`)
        return newIndex
      })
    },
    [rotations.length, api]
  )

  const onRotatePart = useCallback((direction) => {
    // Implement your logic to rotate selected part based on direction
    console.log(`Rotating part: ${direction}`)
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
        <spotLight intensity={100} position={[-2, 10, -2]} />
        <spotLight intensity={30} position={[2, 5, -11]} />
        <spotLight intensity={30} position={[2, 0, 5]} />
        {/* <Environment files="./textures/envmap.hdr" /> */}
        <color attach="background" args={["#111111"]} />
        <Model rotation={spring.rotation} />
      </Canvas>
      <AnimationControls
        onSelectPart={onSelectPart}
        onRotatePart={onRotatePart}
      />
    </>
  )
}
