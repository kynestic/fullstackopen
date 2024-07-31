import { useEffect, useState } from 'react'
import Input from './components/Input'
import Search from './components/Search'
import Person from './components/Person'
import Header from './components/Header'
import phonebook from './services/phonebook'

const url ='http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(()=>{
    phonebook
      .getAll()
      .then(Response => {
        setPersons(Response)
        console.log(Response);
      })
  },[])

  const handleSubmit = (event) =>{
    event.preventDefault()
    let newPerson = { name: newName, number: newNumber}

    for (const person of persons){
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        newPerson.id = person.id
        phonebook
          .update(newPerson, person.id)
          .then(
            response => {
              setPersons(persons.map(person => person = person.id === newPerson.id? newPerson: person))
              setNewName('')
              setNewNumber('')
              setNewSearch('')
            }
            )
        return
      }
    }
    
    phonebook
      .create(newPerson)
      .then(response => {
        console.log(newPerson)
        newPerson.id = response.id
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setNewSearch('')
      })
  }

  const deletePerson = (id) => {
    phonebook
      .erase(id)
      .then(response => setPersons(persons.filter(person => person.id != id)))
  }

  return (
    <div>
      <Header text={'Phonebook'}/>
      <Search text={'filter shown with'} newSearch={newSearch} onChange={(event) => setNewSearch(event.target.value)}/>
      <form onSubmit={handleSubmit}>
          <Input text={'name'} newValue ={newName} onChange={(event) => setNewName(event.target.value)}/>
          <Input text={'number'} newValue ={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
          <button type="submit">add</button>
      </form>
      <Header text={'Numbers'}/>
      <Person persons={persons} newSearch={newSearch} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App