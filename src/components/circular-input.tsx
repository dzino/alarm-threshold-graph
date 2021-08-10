import React from "react"
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input"

const passiveColor = "#3b649630"

interface MyProps {
  activeColort: string
  value: number
  setValue: (v: number) => void
  maxCircular: number
}

export default function Circular({
  activeColort,
  value,
  setValue,
  maxCircular,
}: MyProps) {
  return (
    <>
      <CircularInput
        value={value / maxCircular}
        onChange={(i) => {
          setValue(Math.round(i * maxCircular))
        }}
      >
        <CircularTrack stroke={passiveColor} />
        <CircularProgress stroke={activeColort} />
        <CircularThumb stroke={activeColort} fill={activeColort} />
        <text
          x={100}
          y={100}
          textAnchor="middle"
          dy="0.3em"
          fontWeight="bold"
          fill={passiveColor}
          style={{
            fontFamily: "Open Sans,open-sans,sans-serif",
            fontSize: 50,
          }}
        >
          {value}
        </text>
      </CircularInput>
    </>
  )
}
