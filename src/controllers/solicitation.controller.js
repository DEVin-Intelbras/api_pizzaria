import { v4 as uuidv4 } from 'uuid'
import { getSolicitationsInFile } from '../utils/getSolicitationsInFile.js'
import fs, { write } from 'fs'
import { readFileJson } from '../utils/readFileJson.js'

export function findMany(request, response) {
  const solicitations = getSolicitationsInFile()
  response.json(solicitations)
}

export function findOne(request, response) {
  const { id } = request.params

  const solicitations = readFileJson('solicitations.json')

  const solicitation = solicitations.find(solicitation => solicitation.id === id)

  return response.json(solicitation)
}

export function create(request, response) {
  const {
    name_client,
    document_client,
    contact_client,
    address_client,
    payment_method,
    observations,
    pizzas
  } = request.body

  const soliciation = {
    id: uuidv4(),
    name_client,
    document_client,
    contact_client,
    address_client,
    payment_method,
    observations,
    pizzas,
    order: "EM PRODUÇÃO"
  }

  const solicitations = getSolicitationsInFile()

  fs.writeFileSync('solicitations.json', JSON.stringify([...solicitations, soliciation]))

  response.status(201).json(soliciation)
}

{

}


export function updateStatus(request, response) {
  const solicitations = getSolicitationsInFile()

 const updatedSolicitations = solicitations.map(solicitation => {
    if (solicitation.id === request.params.id) {
      solicitation.order = 'HÁ CAMINHO'
    }
    return solicitation
  })

  fs.writeFileSync('solicitations.json', JSON.stringify(updatedSolicitations))

  return response.json()

}