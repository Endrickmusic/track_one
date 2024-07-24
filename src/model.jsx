import React, { useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    "./models/cube_complex_ani_02.glb"
  )
  const { actions } = useAnimations(animations, group)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying)
    Object.values(actions).forEach((action) => {
      isPlaying ? action.stop() : action.play()
    })
  }

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        rotation={[Math.PI / 8, -Math.PI / 6, 0]}
        position={[0, -1.2, 0]}
        onClick={toggleAnimation}
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
      </group>
    </>
  )
}

useGLTF.preload("./models/cube_complex_ani_02.glb")
