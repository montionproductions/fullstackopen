import { useState } from 'react'

const ButtonRating = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>Click me {text}</button>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <ButtonRating handleClick={() => setGood(good + 1)} text="Good"></ButtonRating>
      <ButtonRating handleClick={() => setNeutral(neutral + 1)} text="Neutral"></ButtonRating>
      <ButtonRating handleClick={() => setBad(bad + 1)} text="Bad"></ButtonRating>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p> 
    </div>
  )
}

export default App