import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
const api_key = import.meta.env.VITE_SOME_KEY;
console.log(api_key);
const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [find, setFind] = useState('')
  const [countries, setCountries] = useState([])
  const [visible, setVisible] = useState([])

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
    let newCountries = data.filter(country => {
      let name = country.name
      // console.log((name.common).toLowerCase());
      // console.log(find.toLowerCase());
      if ((name.common).toLowerCase().search(find.toLowerCase()) !== -1)
        return true
      if ((name.official).toLowerCase().search(find.toLowerCase()) !== -1)
        return true

      return false
    })
    setCountries(newCountries)
    console.log(newCountries)
  }, [find])

  const handleVisible = (name) => {
    setVisible({...visible, [name]: !visible[name]})
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

    {countries.map(country => <Country key={country.name.official} handleVisible={()=>{handleVisible(country.name.official)}} country = {country} visible = {visible[country.name.official]}/>)}
  </>
  )
}

export default App