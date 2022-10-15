import fs from 'fs'

export function readFileJson(fileName: 'solicitations.json' | 'pizzas.json') {
  const dataInFile = fs.readFileSync(fileName).toString()
  const data = JSON.parse(dataInFile)
  
  return data
}