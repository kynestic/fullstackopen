const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note
      .find({})
      .then(result => {
        response.status(200).json(result)
      })
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content){
    return res.status(400).json({error:'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then(result => {
      console.log('New note saved!');
      res.json(result)
    })
})

app.get('/api/notes/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => {
      res.json(note)
    })
})

// app.get('/api/notes/:id',(request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id === id)
//     if (note)
//         response.json(note)
//     else
//         response.status(404).end()
//     console.log(request.params.id);
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
//   })

// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => Number(n.id)))
//         : 0
//     return String(maxId + 1)
// }

// app.post('/api/notes',(request, response) => {
//     const body = request.body

//     if (!body.content){
//         return response
//                 .status(400)
//                 .json({error: 'content missing'})
//     }
//     const note ={
//         content:body.content,
//         important: Boolean(body.important) || false,
//         id: generateId()
//     }
//     notes = notes.concat(note)

//     response.json(note)
// })

// app.put('/api/notes/:id' , (request, response) => {
//   console.log(request.params.id);
//   let newNote = {...request.body}
//   notes = notes.map(note => {return note.id == request.params.id? newNote: note})
//   console.log(notes);
//   console.log(newNote);
//   response.status(200).json(newNote)
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
