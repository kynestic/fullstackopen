import { useState } from 'react'


const Header = ({header}) => {
  return (
    <h2>{header}</h2>
  )
}

const Button = (props) => {
  return(
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const StatisticsLine = ({text, value}) => {
  if (Number.isNaN(value))
    value = 0
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td></tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  return(
    <table>
      <tbody>
        <StatisticsLine text={'good'} value={good}/>
        <StatisticsLine text={'neutral'} value={neutral}/>
        <StatisticsLine text={'bad'} value={bad}/>
        <StatisticsLine text={'all'} value={good + neutral + bad}/>
        <StatisticsLine text={'average'} value={(good - bad)/(good + bad + neutral)}/>
        <StatisticsLine text={'positive'} value={(good)/(good + bad + neutral)*100}/>
      </tbody>
    </table>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    let newGood = good + 1
    setGood(newGood)
  }

  const updateNeutral = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const updateBad = () => {
    let newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <Header header = {'give feedback'}/>
      <Button onClick={updateGood} text = {'good'}/>
      <Button onClick={updateNeutral} text = {'neutral'}/>
      <Button onClick={updateBad} text = {'bad'}/>
      <Header header ={'statistics'}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App