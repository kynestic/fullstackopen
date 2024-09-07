const mongoose = require('mongoose')
require('dotenv').config()
  

mongoose.set('strictQuery',false)

mongoose.connect(process.env.URI)

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