import Part from './subcomponents/Part'
import Header from './subcomponents/Header'
const Course = ({course}) =>{
  let total = course.parts.reduce((curr, next) => curr + next.exercises, 0)
  return(<>
    <Header key ={course.id} name = {course.name}/>
    {(course.parts).map(part => <Part key ={part.id} name = {part.name} exercises={part.exercises}/>)}
    <b>total of {total} exercises</b>
  </>)
}

export default Course