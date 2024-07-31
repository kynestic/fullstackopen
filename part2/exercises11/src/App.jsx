import { useEffect, useState } from 'react'
import Input from './components/Input'
import Search from './components/Search'
import Show from './components/Show'
import Header from './components/Header'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(Response => {
        setPersons(Response.data)
        console.log(Response.data);
      })
  },[])

  const handleSubmit = (event) =>{
    event.preventDefault()
    for (const person of persons){
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    let newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setNewSearch('')
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
      <Show persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App