/* eslint-disable */
// @ts-ignore

interface String {
  argBoolean(): boolean
  argString(): string
  argNumber(): number
}

String.prototype.argBoolean = function () {
  const key = this
  const paramArg = process.argv.filter((x) => x.startsWith(`-${key}`))[0]
  const param = paramArg ? true : false
  return param
}

String.prototype.argString = function () {
  const key = this
  const paramArg = process.argv.filter((x) => x.startsWith(`-${key}`))[0]
  const param = paramArg ? paramArg.split("=")[1] : ""
  return param
}

String.prototype.argNumber = function () {
  const key = this
  const paramArg = process.argv.filter((x) => x.startsWith(`-${key}`))[0]
  const param = paramArg ? paramArg.split("=")[1] : "0"
  return +param
}
