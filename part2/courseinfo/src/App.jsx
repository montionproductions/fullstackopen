import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSerch, setNewSerch] = useState('')


  const addPhone = (event) => {
    event.preventDefault()
    const phoneObject = {
      number: newPhone,
      name: newName,
      id: persons.length + 1
    }
  
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(phoneObject))
    setNewName('')
  }

  const handleInputChange = ({event, setValueCall}) => {
    setValueCall(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
          Searc: <input 
            value={newSerch}
            onChange={(event) => handleInputChange({event, setValueCall: setNewSerch})}
          /></div>
          {persons.filter(person => person.name.toLowerCase() === newSerch.toLowerCase()).length > 0 ? (
            <p>Result: {persons.find(person => person.name.toLowerCase() === newSerch.toLowerCase()).number}</p>
          ) : (
            <p>No results found</p>
          )}
      
      <h1>Add a new</h1>
      <form onSubmit={addPhone}>
        <div>
          name: <input 
            value={newName}
            onChange={(event) => handleInputChange({event, setValueCall: setNewName})}
          /></div>
        <div>
          number: <input 
            value={newPhone}
            onChange={(event) => handleInputChange({event, setValueCall: setNewPhone})}
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