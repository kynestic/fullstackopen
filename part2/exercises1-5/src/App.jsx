import { useState } from 'react'
import Note from './components/Note'

const App = ({notes}) => {
  return(
    <div>
      <h2>Hello this is an example</h2>
      <ul>
        {notes.map((note, i) => <Note key = {note.id} content = {note.content}/>)}
      </ul>
    </div>
  )
}

export default App
