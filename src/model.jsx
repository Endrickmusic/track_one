import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three" // Importing THREE for LoopOnce

const parts = ["lows", "mids", "highs", "vocals", "drums"]

export default function Model({ selectedPart, direction }) {
  const group = useRef()
  const light = useRef()
  const { nodes, materials, animations } = useGLTF(
    "./models/cube_complex_ani_04.glb"
  )
  const { actions, names } = useAnimations(animations, group)
  const [currentAnimation, setCurrentAnimation] = useState(null)

  console.log(names)
  useEffect(() => {
    // Stop all currently playing animations
    Object.values(actions).forEach((action) => action.stop())

    let newAnimation = null

    if (direction === "up" || direction === "down") {
      // Play selection animation
      if (selectedPart === "drums") {
        const drumAnimations = [
          actions["drums_select"],
          actions["vocals_dr_select"],
          actions["highs_dr_select"],
          actions["mids_dr_select"],
          actions["lows_dr_select"],
          // Add other drum-specific animations as needed
        ]

        drumAnimations.forEach((action) => {
          if (action) {
            action.setLoop(THREE.LoopOnce, 1)
            action.clampWhenFinished = true
            action.reset().play()
          }
        })
      } else {
        newAnimation =
          actions[`${selectedPart}_select`] ||
          actions[`${selectedPart}_dr_select`]
      }
    } else if (direction === "left" || direction === "right") {
      // Play rotation animation
      newAnimation =
        actions[`${selectedPart}_rotate`] || actions[`${selectedPart}_rotation`]
    }

    if (newAnimation) {
      newAnimation.setLoop(THREE.LoopOnce, 1)
      newAnimation.clampWhenFinished = true
      newAnimation.reset().play()
      setCurrentAnimation(newAnimation)
    }
  }, [selectedPart, direction, actions])

  useFrame((state, delta) => {
    if (currentAnimation) {
      currentAnimation.time += delta
      if (currentAnimation.time >= currentAnimation._clip.duration) {
        currentAnimation.time = 0
        setCurrentAnimation(null)
      }
    }
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    light.current.position.x = Math.sin(t * 0.5) * 6
    light.current.position.y = Math.cos(t * 0.5) * 6
  })

  return (
    <group
      ref={group}
      dispose={null}
      rotation={[Math.PI / 8, -Math.PI / 6, 0]}
      position={[0, -1.1, 0]}
    >
      <spotLight intensity={40} position={[-2, 10, -2]} ref={light} />
      <group name="Scene">
        <mesh
          name="lows"
          castShadow
          receiveShadow
          geometry={nodes.lows.geometry}
          material={materials.Plastiv_ABS_worn}
          position={[0.401, 0, 0]}
          scale={[0.801, 1, 0.801]}
        />
        <mesh
          name="mids"
          castShadow
          receiveShadow
          geometry={nodes.mids.geometry}
          material={materials.Plastiv_ABS_worn}
          position={[0.401, 0.84, 0]}
          scale={[0.8, 1, 0.801]}
        />
        <mesh
          name="highs"
          castShadow
          receiveShadow
          geometry={nodes.highs.geometry}
          material={materials.Plastiv_ABS_worn}
          position={[0.401, 1.67, 0]}
          scale={[0.8, 1, 0.801]}
        />
        <mesh
          name="vocals"
          castShadow
          receiveShadow
          geometry={nodes.vocals.geometry}
          material={materials.Plastiv_ABS_worn}
          position={[0.401, 2.5, 0]}
          scale={[0.8, 1, 0.801]}
        />
        <mesh
          name="drums"
          castShadow
          receiveShadow
          geometry={nodes.drums.geometry}
          material={materials.Plastiv_ABS_worn}
          position={[-2, 1.604, 0]}
          scale={[1, 0.801, 0.801]}
        />
      </group>
    </group>
  )
}

useGLTF.preload("./models/cube_complex_ani_04.glb")
