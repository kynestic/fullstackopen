let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req) =>{
    return req.method === 'POST'? JSON.stringify(req.body): ''
})

app.use(morgan(':method :url :status :res[content-size] :response-time ms :body'))

app.get('/api/persons',(req, res)=>{
    res.json(persons)
})





app.get('/info', (req, res) => {
    let newDate = new Date
    res
      .send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${newDate}</p>`)
})

app.get('/api/person/:id', (req, res) => {
    const person = persons.find(p => p.id == req.params.id)
    console.log(person);
    res.json(person)
})

app.delete('/api/person/:id', (req, res) => {
    persons = persons.filter(p => p.id != req.params.id)
    console.log(persons);
    res.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id)) + 1
        : 0
    return maxId
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number)
        return res.status(400).json({error:'please fill all the information'})

    for (const person of persons){
        if (person.name == body.name)
            return res.status(400).json({error: 'name must be unique'})
    }

    let newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})