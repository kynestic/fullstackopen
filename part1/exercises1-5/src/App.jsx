// const Header = (props) => {
//   return(
//     <h1>{props.course}</h1>
//   )
// }

// const Part = (props) => {
//   return(
//     <>
//       <p>{props.part} {props.exercises}</p>
//     </>
//   )
// }

// const Content = (props) => {
//   return(
//     <>
//       <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
//       <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
//       <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
//     </>
//   )
// }

// const Total = (props) => {
//   return(
//     <>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts : [
//     {
//       name : 'Fundementals of React',
//       exercises : 10
//     }
//     ,
//     {
//       name : 'Using props to pass data',
//       exercises : 7
//     }
//     ,
//     {
//       name : 'State of a component',
//       exercises : 14
//     }
//     ]
//   }
  
//   return(
//     <div>
//       <Header course={course.name} />
//       <Content parts = {course.parts} />
//       <Total parts = {course.parts}/>
//     </div>
//   );
// }

//Lấy hàm useState
import { useState } from 'react'

const App = () => {
  const [value, setValue] = useState(10)
  

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default App