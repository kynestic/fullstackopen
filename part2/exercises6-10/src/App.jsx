import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSubmit = (event) =>{
    event.preventDefault()
    for (const person of persons){
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    let newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setNewSearch('')
  }

  let showPersons = persons.filter(person => {
    if (newSearch === '') 
      return true
    return !(person.name.search(newSearch) === -1)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value ={newSearch} onChange={(event) => setNewSearch(event.target.value)} />
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value ={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showPersons.map(person => <li key ={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App