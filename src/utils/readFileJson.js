import fs from 'fs'

export function readFileJson(fileName) {
  const dataInFile = fs.readFileSync(fileName).toString()
  const data = JSON.parse(dataInFile)
  return data
}