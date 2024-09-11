const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.URI)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Person = mongoose.model('Person', personSchema)


// let persons = [
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// persons.forEach(person => {
//     const newPerson = new Person({
//       name: person.name,
//       number: person.number,
//     })
//     newPerson
//         .save()
//         .then(result => {
//             console.log('Person saved!'); 
//         })
// })

module.exports = mongoose.model('Person', personSchema)





