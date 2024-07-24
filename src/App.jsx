import React, { useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import "./index.css"

import Model from "./model.jsx"
import AnimationControls from "./Animation.jsx"

export default function App() {
  const [selectedPart, setSelectedPart] = useState(null)
  const [rotationIndex, setRotationIndex] = useState(0) // New state for tracking rotation index

  // Predefined rotations
  // const rotations = [
  //   { x: 0, y: 0, z: 0 },
  //   { x: Math.PI / 2, y: 0, z: 0 },
  //   { x: 0, y: Math.PI / 2, z: 0 },
  //   { x: 0, y: 0, z: Math.PI / 2 },
  // ]

  const rotations = [
    [Math.PI / 8, 0, 0],
    [Math.PI / 4, 0, 0],
    [-Math.PI / 4, 0, 0],
    [-Math.PI / 8, 0, 0],
  ]

  // Logic for selecting and rotating parts

  const onSelectPart = useCallback(
    (direction) => {
      // Adjust rotation index based on direction
      setRotationIndex((prevIndex) => {
        if (direction === "up") {
          console.log(`Selected part: ${direction}`)
          return (prevIndex + 1) % rotations.length // Wrap around to the first rotation if at the end
        } else if (direction === "down") {
          console.log(`Selected part: ${direction}`)
          return (prevIndex - 1 + rotations.length) % rotations.length // Wrap around to the last rotation if at the beginning
        }
        return prevIndex
      })
    },
    [rotations.length]
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
        <Model rotation={rotations[rotationIndex]} />
      </Canvas>
      <AnimationControls
        onSelectPart={onSelectPart}
        onRotatePart={onRotatePart}
      />
    </>
  )
}
