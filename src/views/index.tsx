import React, { useEffect, useState, useRef } from "react"
import dateFormat from "dateformat"
import * as Dec from "../declaration"
import GraphX from "../components/graph"
import { SVG } from "../components/svg"
import Circular from "../components/circular-input"

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    margin: "0 5",
  },
  centeredContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  graphHeader: {
    width: 80,
    alignItems: "center",
    marginLeft: -1,
    padding: 0,
    marginTop: -20,
  },
  v: {
    margin: 5,
    color: "#3b649650",
    fontFamily: "Open Sans,open-sans,sans-serif",
    fontSize: 14,
  },
  h2: {
    marginLeft: 10,
    padding: 0,
    fontWeight: 700,
    fontFamily: "Open Sans,open-sans,sans-serif",
    fontSize: 30,
  },
  input: {
    padding: 10,
    backgroundColor: "#00000000",
    borderRadius: 20,
    border: "2px solid",
    borderColor: "#3b649630",
    width: 70,
  },
  invert: {
    transform: "rotate(0.5turn)",
  },
}

const tools = {
  dateID(): number {
    return +dateFormat(new Date(), "yyyymmddHHMMssl")
  },
  getRandomInt(max: number, previousNumber: number): number {
    const up: boolean = Boolean(Math.round(Math.random()))
    const checkMax: boolean = previousNumber === max
    const checkMin: boolean = previousNumber === 0
    return up && !checkMax
      ? ++previousNumber
      : !up && !checkMin
      ? --previousNumber
      : previousNumber
  },
  __DEV__: process.env.NODE_ENV !== "production",
}

class Graph {
  private length = 0
  private full = false

  constructor(private graphLength: number, private data: number[]) {
    this.length = this.data.length
    this.full = this.graphLength - this.length <= 0
  }

  get max() {
    return Math.max(...this.data)
  }

  get render() {
    return this.full
      ? this.data.slice(this.length - this.graphLength)
      : [...new Array(this.graphLength - this.length).fill(0), ...this.data]
  }
}

export default function App() {
  /** ## Threshold retention timer */
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [temperature, setTemperature] = useState<number>(0)
  const [limitTemperature, setLimitTemperature] = useState<number>(20)
  const [data, setData] = useState<Dec.General.DataUnit[]>([])
  const alarm: boolean = temperature < limitTemperature

  /* Reset saved limit */
  // localStorage.setItem("limitTemperature", JSON.stringify(0));

  const host: Readonly<string> = "192.168.43.100"
  const port: Readonly<number> = 8080
  const graphLength: Readonly<number> = 120

  const graphTemp = new Graph(
    graphLength,
    data.map((i) => i.temperature)
  )

  function update(): void {
    if (tools.__DEV__) {
      const convert: Dec.General.DataUnit = {
        temperature: tools.getRandomInt(
          50,
          data[data.length - 1]?.temperature || 20
        ),
        date: tools.dateID(),
      }
      setData((v) => [...v, convert])
    } else {
      /* Server request */
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
      fetch(`http://${host}:${port}/`, requestOptions)
        .then((response) => response.json())
        .then((lastUnit: { temperature: number }) => {
          const convert: Dec.General.DataUnit = {
            ...lastUnit,
            date: tools.dateID(),
          }
          setData((v) => [...v, convert])
        })
    }
  }

  function limitsGet(): void {
    setLimitTemperature(+(localStorage.getItem("limitTemperature") || 0))
  }

  function limitsSet(): void {
    localStorage.setItem("limitTemperature", JSON.stringify(limitTemperature))
  }

  useEffect(() => {
    limitsGet()
    update()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      limitsSet()
    }, 3000)
  }, [limitTemperature]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const lastUnit = data[data.length - 1]
    if (lastUnit) {
      setTemperature(lastUnit.temperature)
      setTimeout(update, 5000)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles.app}>
      <div className="row" style={{ marginBottom: 60 }}>
        <div
          className="col-sm center-block"
          style={{ ...styles.centeredContent, marginTop: 40 }}
        >
          <div>
            <GraphX
              data={graphTemp.render}
              threshold={limitTemperature}
              thresholdInversion={true}
              xHead={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
              xMeasure={"min"}
              maxY={graphTemp.max}
              animationTime={500}
            />
            <div
              className="col"
              style={{ ...styles.graphHeader, marginTop: -25 }}
            >
              {
                SVG(
                  40,
                  temperature < limitTemperature ? "#f73914  " : "#71cdf1"
                ).temperature
              }
              <h2 style={{ ...styles.h2, marginLeft: 6, marginTop: 5 }}>
                {temperature}
              </h2>
            </div>
            <div style={{ ...styles.centeredContent, marginTop: -20 }}>
              <Circular
                activeColort={alarm ? "#f73914" : "#71cdf1"}
                value={limitTemperature}
                setValue={setLimitTemperature}
                maxCircular={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
