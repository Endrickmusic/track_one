import React, { useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useSpring } from "@react-spring/three"

import "./index.css"

import Model from "./model.jsx"
import AnimationControls from "./Animation.jsx"

export default function App() {
  const [selectedPart, setSelectedPart] = useState(0)
  const [rotateDirection, setRotateDirection] = useState(null)
  const totalParts = 5 // Adjust this to match your model

  const handleSelectPart = useCallback(
    (direction) => {
      setSelectedPart((prev) => {
        if (direction === "up") {
          return (prev + 1) % totalParts
        } else if (direction === "down") {
          return (prev - 1 + totalParts) % totalParts
        }
        return prev
      })
      setRotateDirection(null) // Reset rotation when selecting a new part
    },
    [totalParts]
  )

  const handleRotatePart = useCallback((direction) => {
    setRotateDirection(direction)
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
        <spotLight intensity={100} position={[-2, 10, -2]} />
        <spotLight intensity={30} position={[2, 5, -11]} />
        <spotLight intensity={30} position={[2, 0, 5]} />
        {/* <Environment files="./textures/envmap.hdr" /> */}
        <color attach="background" args={["#111111"]} />
        <Model selectedPart={selectedPart} />
      </Canvas>
      <AnimationControls
        onSelectPart={handleSelectPart}
        onRotatePart={handleRotatePart}
      />
    </>
  )
}
