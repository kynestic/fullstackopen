const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})



app.get('/api/notes', (request, response, next) => {
    Note
      .find({})
      .then(result => {
        response.status(200).json(result)
      })
      .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
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
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (note)
        return res.status(200).json(note)
      return res.status(404)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
