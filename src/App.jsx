import React, { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import "./index.css"

import Model from "./model.jsx"
import AnimationControls from "./Animation.jsx"

const parts = ["lows", "mids", "highs", "vocals", "drums"]

export default function App() {
  const [selectedPart, setSelectedPart] = useState(parts[0])
  const [direction, setDirection] = useState(null)

  const handleSelectPart = (direction) => {
    setSelectedPart((prev) => {
      const currentIndex = parts.indexOf(prev)
      if (direction === "up") {
        return parts[(currentIndex + 1) % parts.length]
      } else if (direction === "down") {
        return parts[(currentIndex - 1 + parts.length) % parts.length]
      }
      return prev
    })
    setDirection(direction)
  }

  const handleRotatePart = (direction) => {
    setDirection(direction)
  }

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
        <spotLight intensity={30} position={[2, 5, -11]} />
        <spotLight intensity={30} position={[2, 0, 5]} />
        {/* <Environment files="./textures/envmap.hdr" /> */}
        <color attach="background" args={["#111111"]} />
        <Model selectedPart={selectedPart} direction={direction} />
      </Canvas>
      <AnimationControls
        onSelectPart={handleSelectPart}
        onRotatePart={handleRotatePart}
      />
    </>
  )
}
