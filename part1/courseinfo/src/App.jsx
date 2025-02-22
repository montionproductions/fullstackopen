const Header = (props) => {
  
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
  <>
    <p>
        {props.name} {props.exercise}
    </p>
  </>
  )
}

const Content = (props) => {
  console.log(props.parts[0].exercises);
  return (
    <>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  const sumParts = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
    <>
    <p>Number of exercises {sumParts}</p>
    </>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

export default App