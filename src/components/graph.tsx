import React from "react"

interface MyProps {
  data: number[]
  threshold: number
  thresholdInversion?: boolean
  xHead: number[]
  xMeasure: string
  maxY: number
  animationTime: number
}

export default function Graph(props: MyProps) {
  const w = 350
  const h = 200
  const marginTop = 30
  const marginRight = 50
  const marginBottom = 30
  const marginLeft = 50

  function graph() {
    const mAx = Math.max(props.maxY, props.threshold) /* props.maxY */
    const maxX = Math.max(...props.xHead)
    const yHead: number[] = [
      0,
      (mAx / 5) * 1,
      (mAx / 5) * 2,
      (mAx / 5) * 3,
      (mAx / 5) * 4,
      (mAx / 5) * 5,
    ]
    const gh = h - marginBottom - marginTop
    const gw = w - marginLeft - marginRight
    const coefficientY = gh / mAx
    const coefficientX = gw / maxX

    const thresholdTrue = props.thresholdInversion ? "#71cdf1" : "#f73914"
    const thresholdFalse = props.thresholdInversion ? "#f73914" : "#71cdf1"

    const column: JSX.Element[] = Object.keys(props.data).map((i) => (
      <rect
        key={i}
        x={
          marginLeft + +i * ((w - marginLeft - marginRight) / props.data.length)
        }
        y={gh - props.data[+i] * coefficientY + marginTop || 0}
        width={gw / props.data.length / 2}
        height={props.data[+i] * coefficientY || 0}
        fill={
          props.data[+i] >= props.threshold ? thresholdTrue : thresholdFalse
        }
      />
    ))

    const textY: JSX.Element[] = Object.keys(yHead).map((i) => (
      <text
        key={`texty${i}`}
        x={35}
        y={gh - yHead[+i] * coefficientY - 3 + marginTop || 0}
        fontSize={10}
        fill="#3b6496"
        fontFamily="sans-serif"
        textAnchor="end"
      >
        {yHead[+i].toFixed(0)}
      </text>
    ))

    const lineY: JSX.Element[] = Object.keys(yHead).map((i) => (
      <rect
        key={`liney${i}`}
        x={marginLeft - 10}
        y={gh - yHead[+i] * coefficientY - 1 + marginTop || 0}
        width={w - marginLeft - marginRight + 20}
        height={1}
        fill={"#3b649630"}
      />
    ))

    const thresholdYValue = gh - props.threshold * coefficientY - 1 + marginTop
    const thresholdY: JSX.Element = (
      <rect
        key={`threshold`}
        x={marginLeft - 10}
        y={
          !props.thresholdInversion ? thresholdYValue - w : thresholdYValue || 0
        }
        width={w - marginLeft - marginRight + 20}
        height={
          !props.thresholdInversion ? w : props.threshold * coefficientY || 0
        }
        fill={"#3b649620"}
      />
    )

    const textX: JSX.Element[] = Object.keys(props.xHead).map((i) => (
      <text
        key={`textx${i}`}
        x={w - props.xHead[+i] * coefficientX - marginRight}
        y={h}
        fontSize={10}
        fill="#3b6496"
        fontFamily="sans-serif"
      >
        {props.xHead[+i]}
      </text>
    ))

    const lineX: JSX.Element[] = Object.keys(props.xHead).map((i) => (
      <rect
        key={`linex${i}`}
        x={w - props.xHead[+i] * coefficientX - marginRight}
        y={marginTop - 10}
        width={1}
        height={h - marginTop - marginBottom + 20}
        fill={"#3b649630"}
      />
    ))

    const xMeasure: JSX.Element = (
      <text
        key={`xMeasure`}
        x={marginLeft + w + 20}
        y={h}
        fill="#3b6496"
        fontFamily="sans-serif"
      >
        {props.xMeasure}
      </text>
    )

    return [
      thresholdY,
      ...column,
      ...textY,
      ...lineY,
      ...textX,
      ...lineX,
      xMeasure,
    ]
  }

  return (
    <svg
      style={{
        height: h,
        width: w,
      }}
    >
      {graph()}
    </svg>
  )
}
