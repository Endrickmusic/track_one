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
    [Math.PI / 8, 0, 0],
    [Math.PI / 16, 0, 0],
    [-Math.PI / 16, 0, 0],
    [-Math.PI / 8, 0, 0],
  ]

  // Create a spring for smooth animation
  const [spring, api] = useSpring(() => ({
    rotation: rotations[0],
    config: { mass: 1, tension: 180, friction: 12 },
  }))

  const onSelectPart = useCallback(
    (direction) => {
      setRotationIndex((prevIndex) => {
        const newIndex =
          direction === "up"
            ? (prevIndex + 1) % rotations.length
            : (prevIndex - 1 + rotations.length) % rotations.length

        // Animate to the new rotation
        api.start({ rotation: rotations[newIndex] })

        console.log(`Selected part: ${direction}`)
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
        <Environment files="./textures/envmap.hdr" />
        <color attach="background" args={["#eeeeee"]} />
        <Model rotation={spring.rotation} />
      </Canvas>
      <AnimationControls
        onSelectPart={onSelectPart}
        onRotatePart={onRotatePart}
      />
    </>
  )
}
