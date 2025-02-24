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
  const [successMessage, setSuccessMessage] = useState('')
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
            setSuccessMessage(`${phoneObject.name}'was updated on server`)  
            setTimeout(() => {
              setSuccessMessage("")
            }, 5000)
            setNewName('')
            setNewPhone('')
          }).catch(error => {
            console.log(error.response.data)
            setErrorMessage(`Information of '${phoneObject.name}' has already been removed from server`)
            setTimeout(() => {
              setErrorMessage("")
            }, 5000)
          }
        )
      }
      return
    }

    personService
      .create(phoneObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setSuccessMessage(`Added '${phoneObject.name}' to server`)
            setTimeout(() => {
              setSuccessMessage("")
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

  const NotificationSuccess = ({ message }) => {

    if (message === "") {
      return
    }
  
    return (
      <p className="success">{message}</p>
    )
  }

  const NotificationError = ({ message }) => {

    if (message === "") {
      return
    }
  
    return (
      <p className="error">{message}</p>
    )
  }

  return (
    <div>
      <h2>Phonebook </h2>
      <Filter value={newSerch} setValue={setNewSerch} handleInputChange={handleInputChange} persons={persons} /> 

      <h3>Add a new</h3>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />
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