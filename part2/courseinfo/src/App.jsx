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
  const [errorMessage, setErrorMessage] = useState('')

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
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      if(window.confirm(`Replace the old number of ${person.name} with a new one?`)) {
        personService.update(person
          .id, phoneObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setNewName('')
            setNewPhone('')
          })
      }
      return
    }

    personService
      .create(phoneObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setErrorMessage(
          `Note '${phoneObject.name}' was already added to server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePhone = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(response)
        })
    }
  }

  const handleInputChange = ({event, setValueCall}) => {
    setValueCall(event.target.value)
  }

  const Notification = ({ message }) => {

    if (message === "") {
      return
    }
  
    return (
      <p className="success">{message}</p>
    )
  }

  return (
    <div>
      <h2>Phonebook </h2>
      <Filter value={newSerch} setValue={setNewSerch} handleInputChange={handleInputChange} persons={persons} /> 

      <h3>Add a new</h3>
      <Notification message={errorMessage} />
      <PersonForm 
        addPerson={addPhone} 
        newName={newName} 
        handleNameChange={(event) => handleInputChange({event, setValueCall: setNewName})} 
        newNumber={newPhone} 
        handleNumberChange={(event) => handleInputChange({event, setValueCall: setNewPhone})} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} onDeleteHandle={deletePhone}/>
    </div>
  )
}

export default App