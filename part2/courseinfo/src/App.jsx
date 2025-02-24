import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSerch, setNewSerch] = useState('')

  const hook = () => {
    //console.log('effect')
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons.data)
    })
  }

  useEffect(hook, [])
  
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

    personService
      .create(phoneObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
  }

  const handleInputChange = ({event, setValueCall}) => {
    setValueCall(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook </h2>
      <Filter value={newSerch} setValue={setNewSerch} handleInputChange={handleInputChange} persons={persons} /> 

      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPhone} 
        newName={newName} 
        handleNameChange={(event) => handleInputChange({event, setValueCall: setNewName})} 
        newNumber={newPhone} 
        handleNumberChange={(event) => handleInputChange({event, setValueCall: setNewPhone})} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App