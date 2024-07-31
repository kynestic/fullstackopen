const Show = ({persons, newSearch}) => {
    let showPersons = persons.filter(person => {
        if (newSearch === '') 
          return true
        return !(person.name.search(newSearch) === -1)
    })
    return(
        <ul>
            {showPersons.map(person => <li key ={person.name}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Show