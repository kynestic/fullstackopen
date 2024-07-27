import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return(
    <h2>{text}</h2>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(Object.assign({}, Array(anecdotes.length).fill(0)))
  const [maxVotes, setMaxVotes] = useState(0)

  const getRandomAnecdotes = () => {
    let newSelected = Math.floor(Math.random()*(anecdotes.length - 1))
    console.log(newSelected)
    setSelected(newSelected)
  }

  const createVote = () => {
    let newVote = {...vote, [selected]: vote[selected] + 1}
    setVotes(newVote)
    console.log(newVote)

    if (newVote[selected] > newVote[maxVotes]){
      let newMaxVotes = selected
      setMaxVotes(newMaxVotes)
    }
    
  }

  return (
    <>
      <Header text = {'Anecdote of the day'}/>
      <div>
        {anecdotes[selected]}
      </div>
      <Button onClick={createVote} text = 'Vote'/>
      <Button onClick={getRandomAnecdotes} text = 'next anecdotes'/>
      <Header text = {'Anecdote with most votes'}/>
      <div>
        {anecdotes[maxVotes]}
      </div>
    </>
  )
}

export default App