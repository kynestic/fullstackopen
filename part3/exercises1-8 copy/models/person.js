const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


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

persons.forEach(person => {
    person
        .save()
        .then(result => {
            console.log('Person saved!'); 
        })
})


module.exports = mongoose.model('Person', personSchema)





