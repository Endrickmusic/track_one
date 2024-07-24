import React from "react"

function AnimationControls({ onSelectPart, onRotatePart }) {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
      <button onClick={() => onSelectPart("up")}>Up</button>
      <button onClick={() => onSelectPart("down")}>Down</button>
      <button onClick={() => onRotatePart("left")}>Left</button>
      <button onClick={() => onRotatePart("right")}>Right</button>
    </div>
  )
}

export default AnimationControls
