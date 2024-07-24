import React, { useRef, useState, useEffect } from "react"
import { Vector3, Matrix4 } from "three"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import { animated } from "@react-spring/three"

export default function Model({ selectedPart, rotationAngle }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    "./models/cube_complex_ani_04.glb"
  )
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play the selection animation for the current part
    const currentAction = actions[`select_${selectedPart}`]
    if (currentAction) {
      Object.values(actions).forEach((action) => action.stop())
      currentAction.reset().play()
    }
  }, [selectedPart, actions])

  useFrame(() => {
    if (group.current) {
      // Apply rotation to the selected part
      const selectedMesh = group.current.getObjectByName(`part_${selectedPart}`)
      if (selectedMesh) {
        selectedMesh.rotation.y = rotationAngle
      }
    }
  })

  return (
    <>
      <animated.group
        ref={group}
        dispose={null}
        // rotation={rotation || [Math.PI / 8, -Math.PI / 6, 0]} // Use rotation prop or default
        rotation={[Math.PI / 8, -Math.PI / 6, 0]}
        position={[0, -1.1, 0]}
      >
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
      </animated.group>
    </>
  )
}

useGLTF.preload("./models/cube_complex_ani_04.glb")
