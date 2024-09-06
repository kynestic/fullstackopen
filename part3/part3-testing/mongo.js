const mongoose = require('mongoose')
require('dotenv').config()
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.env.password

const url =
  `mongodb+srv://muadong1198:${password}@cluster0.biepc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})