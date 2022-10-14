// NODEMON -> gerenciar o seu projeto

const express = require('express')
const app = express()
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron')
const nodemailer = require('nodemailer')

let pizzas = []
let solicitations = []

app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b2ab7e798f588d",
    pass: "d0eae85bc4a4c8"
  }
});

cron.schedule('*/1 * * * *', () => {

  solicitations.forEach(solicitation => {
    if (solicitation.order === "EM PRODUÇÃO") {
      transporter.sendMail({
        from: 'devinhouseteste@gmail.com',
        to: 'joao@gmail.com',
        subject: 'Sua pizza está chegando',
        html: `<p>Olá ${solicitation.name_client}, sua pizza está há producao.</p>`
      }, (err, info) => {
        if (err)
          console.log(err);
        else
          console.log(info);
      })
    }
  });


})


app.get('/pizzas', (request, response) => {
  const nameQuery = request.query.name || ""
  const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))
  response.json(pizzasFiltered)
})

app.post('/pizzas', (request, response) => {
  const { name, description, price, url, ingredients } = request.body

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

  pizzas.push(pizza)

  response.status(201).json(pizza)
})

app.get('/solicitations', (request, response) => {
  response.json(solicitations)
})


app.get('/solicitations/:id', (request, response) => {
  const { id } = request.params

  const solicitation = solicitations.find(solicitation => solicitation.id === id)

  return response.json(solicitation)
})

app.post('/solicitations', (request, response) => {

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

  solicitations.push(soliciation)

  response.status(201).json(soliciation)

})

app.listen(3333, () => {
  console.log('Servidor no AR !!!')
})

