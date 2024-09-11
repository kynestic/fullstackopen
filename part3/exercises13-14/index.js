const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors")
const Person = require("./models/person")

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req) =>{
    return req.method === 'POST'? JSON.stringify(req.body): ''
})

app.use(morgan(':method :url :status :res[content-size] :response-time ms :body'))



app.get('/api/persons',(req, res, next)=>{
    Person
        .find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Person
        .find({})
        .then(result => {
            let newDate = new Date
            res
                .send(`<p>Phonebook has info for ${result.length} people</p>
                        <p>${newDate}</p>`)
        })
        .catch(error => next(error))
   
})

app.get('/api/person/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number)
        return res.status(400).json({error:'please fill all the information'})

    Person
        .find({})
        .then(persons => {
            for (const person of persons){
                if (person.name == body.name)
                    return res.status(400).json({error: 'name must be unique'})
            }

            let newPerson = new Person({
                name: body.name,
                number: body.number
            })
        
            newPerson
                .save()
                .then(result => {
                    res.status(200).json(newPerson)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))

    
    
})


app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    const newPerson = req.body

    Person
        .findByIdAndUpdate(id, newPerson, {new: true, runValidators: true, context: 'query'})
        .then(result => {
            res.status(200).end(JSON.stringify(newPerson))
        })
        .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
    console.log("Error throw!");
    console.log(error.message);
    if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
}


app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})