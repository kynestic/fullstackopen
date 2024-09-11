import { useEffect, useState } from 'react'
import Input from './components/Input'
import Search from './components/Search'
import Person from './components/Person'
import Header from './components/Header'
import phonebook from './services/phonebook'

const Added = (props) => {
  const format = {
    display: 'block',
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (props.state) 
    format.display = 'block'
  else
    format.display = 'none'
  return(
    <div style={format}>
      {props.message}
    </div>
  )
}

const Error = (props) => {
  const format = {
    display: 'block',
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (props.state) 
    format.display = 'block'
  else
    format.display = 'none'
  return(
    <div style={format}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [added, setAdded] = useState('')
  const [addedState, setAddedState] = useState(false)
  const [error, setError] = useState('')
  const [errorState, setErrorState] = useState(false)

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
        newPerson.id = person.id
        phonebook
          .update(newPerson, person.id)
          .then(
            response => {
              if (response.status === 200){
                setPersons(persons.map(person => person = person.id === newPerson.id? newPerson: person))
                setNewName('')
                setNewNumber('')
                setNewSearch('')
                setAddedState(true)
                setAdded(`Updated ${newPerson.name} with number ${newPerson.number}`)
                setTimeout(() => setAddedState(false),5000)
              }               
          })
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
        setAddedState(true)
        setAdded(`Added ${newPerson.name} with number ${newPerson.number}`)
        setTimeout(() => setAddedState(false),5000)
      })
      .catch(result => {
        const message = result.response.data.error;
        console.log(result);
        setErrorState(true)
        setError(message)
        setTimeout(() => setErrorState(false),5000)
      })
  }

  const deletePerson = (id) => {
    let tmpPerson = {}
    for (const person of persons)
      if (person.id === id){
        tmpPerson = person
        break
      }
    phonebook
      .erase(id)
      .then(response => setPersons(persons.filter(person => person.id != id)))
      .catch(
        error => {
          setPersons(persons.filter(person => person.name !== tmpPerson.name))
          setErrorState(true)
          setError(`Information of ${tmpPerson.name} has been removed from server`)
          setTimeout(() => setErrorState(false),5000)
        }
      )
  }

  return (
    <div>
      <Header text={'Phonebook'}/>
      <Added message={added} state ={addedState}/>
      <Error message={error} state ={errorState}/>
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