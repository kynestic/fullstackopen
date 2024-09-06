const mongoose = require('mongoose')
require('dotenv').config()

const url =
  `mongodb+srv://muadong1198:${process.env.password}@cluster0.biepc.mongodb.net/phonebook?
  retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)



if (process.argv.length === 2) {
    Person
        .find({})
        .then(persons=> {
            console.log(`Phonebook:`);
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })
            mongoose.connection.close()
        })
}




if (process.argv.length > 3) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    newPerson.save().then(result => {
        console.log('new person saved!');
        mongoose.connection.close()
    })
}





