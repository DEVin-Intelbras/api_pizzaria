import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { getPizzasInFile } from '../utils/getPizzasInFile.js'
import { readFileJson } from '../utils/readFileJson.js'

export function findMany(request, response) {
  const nameQuery = request.query.name || ""

  const pizzas = readFileJson('pizzas.json')

  const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

  response.json(pizzasFiltered)
}

export function create(request, response) {
  const { name, description, price, url, ingredients } = request.body

  const pizzas = getPizzasInFile()

  const pizzaExists = pizzas.find(pizza => pizza.name === name)

  if (pizzaExists) {
    return response.status(401).json({ error: 'Pizza já encontra-se cadastrada' })
  }

  const pizza = {
    id: uuidv4(),
    name,
    url,
    description,
    price,
    ingredients
  }

  fs.writeFileSync('pizzas.json', JSON.stringify([...pizzas, pizza]))

  response.status(201).json(pizza)
}