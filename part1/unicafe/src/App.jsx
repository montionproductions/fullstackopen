import { useState } from 'react'

const ButtonRating = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>Click me {text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return (<>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>) 
  }
  return (<>
    <h1>Statistics</h1>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>All ratings: {good + neutral + bad}</p>
    <p>Average: {(good - bad) / (good + neutral + bad)}</p>
    <p>Positive: {good / (good + neutral + bad) * 100} %</p>
  </>)

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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App