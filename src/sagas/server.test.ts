import { Update } from "./server"
import { General } from "../declaration"
import "../argPrototypes"

describe("Test server:", () => {
  const update = new Update()

  test("Get date and temperature", async () => {
    const result: General.DataUnit = await new Promise((resolve) => {
      update
        .run({
          host: "127.0.0.1",
          port: 8080,
          data: [],
          setData: (v: General.DataUnit) => resolve(v),
          __PRODUCTION__: "production".argBoolean(),
        })
        ?.next()
    })

    expect(
      result.date &&
        result.temperature &&
        Number.isInteger(result.date) &&
        Number.isInteger(result.temperature)
    ).toEqual(true)
  })
})
