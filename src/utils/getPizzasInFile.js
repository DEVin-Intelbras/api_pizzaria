import fs from 'fs'

export function getPizzasInFile() {
  const pizzasInFile = fs.readFileSync('pizzas.json').toString()
  const pizzas = JSON.parse(pizzasInFile)
  return pizzas
}