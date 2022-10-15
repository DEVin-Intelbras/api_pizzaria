import fs from 'fs'

export function getSolicitationsInFile() {
  const solicitationsInFile = fs.readFileSync('solicitations.json').toString()
  const solicitations = JSON.parse(solicitationsInFile)
  return solicitations
}