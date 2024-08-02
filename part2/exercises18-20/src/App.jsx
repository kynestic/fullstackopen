import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    setFind(value)
    setValue('')
  }

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response =>{
        setData(response.data)
      })
  },[])

  useEffect(() => {
    setCountries(data.filter(country => {
      let name = country.name
      // console.log((name.common).toLowerCase());
      // console.log(find.toLowerCase());
      if ((name.common).toLowerCase().search(find.toLowerCase()) !== -1)
        return true
      if ((name.official).toLowerCase().search(find.toLowerCase()) !== -1)
        return true

      return false
    }))
  }, [find])

  const handleResult = () =>{
    if (countries.length >= 10)
      return 'Xin hay nhap cu the hon!'

    if (countries.length === 1)
      return countries.map(country => 
        <div key={country.name.official}>
            <h2>
                {country.name.common}
            </h2>
            <img src= {country.flags.png? country.flags.png: country.flags.svg} alt={country.flags.alt} />
            <div><b>Capital: </b>{country.capital}</div>
            <div><b>Languages:</b></div>
            <ul>
              {Object
                .entries(country.languages)
                .map(([code, language]) => 
                  <li key={`${country.name.official}${code}`}>{language}</li>)
              }
            </ul>
        </div>)
    
      return countries.map(country => 
        <h2 key={country.name.official}>
          {country.name.common}
        </h2>)
  }

  return(
  <>
    <div>
      Find Countries: 
      <form>
        <input value = {value} onChange={handleChange} />
          <button onClick={handleClick}>Find</button>
      </form>
    </div>

    {handleResult()}
  </>
  )
}

export default App