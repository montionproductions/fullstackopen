import { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPhone = (event) => {
    event.preventDefault()
    const phoneObject = {
      number: '000000000000',
      name: newName,
      id: persons.length + 1
    }
  
    setPersons(persons.concat(phoneObject))
    setNewName('')
  }

  const handleInputTextChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPhone}>
        <div>
          name: <input 
            value={newName}
            onChange={handleInputTextChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App