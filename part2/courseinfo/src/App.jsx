import { useState, useEffect } from 'react'

/*import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'*/
import countriesServices from './services/countries'

const CountryRow = ({country, handleOnClick}) => {
  return (
  <div className='country-row'>
    <p key={country.name.common}>{country.name.common}</p>
    <button onClick={() => handleOnClick(country.name.common)}>Show</button>
  </div>) 
}

const ContryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" height="100" />
    </div>
  )
}

const App = () => {
  /*const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSerch, setNewSerch] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')*/
  const [searchC, setSearchC] = useState('')
  const [countries, setCountries] = useState(null)

  /*useEffect(() => {
    console.log('effect running, fetching data: ', countries)

    if(searchC !== '') {
      console.log('fetching countries...')
      countriesServices.
        getCountry(searchC).
          then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
          })
      
    }
  }, [searchC])*/

  useEffect(() => {
    countriesServices.getAll().then(response => {
      setCountries(response.data)
      //console.log('fetching data: ', countries)
    })
  }, [countries])

  const getAllConsidencies = () => {
    if(countries === null) {
      return <p>Loading...</p>
    }

    // Print first 10 countries
    /*countries.slice(0, 10).map(country => 
      console.log(country.name)
    )*/

    if(countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase())).length === 1) {
      const country = countries.find(country => country.name.common.toLowerCase().includes(searchC.toLowerCase()))
      return (
        <ContryInfo country={country} />
      )
    }

    //const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase()))
    return (
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase())).length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (

          countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase())).map(country => 
            <CountryRow key={country.name.common} country={country} handleOnClick={setSearchC} />
          )
        )
        }
      </div>
    )
  }
  
  /*const addPhone = (event) => {
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
  }*/

  const handleInputChange = ({event, setValueCall}) => {
    if(setValueCall !== null) {
      setValueCall(event.target.value)
    }
  }

  /*const NotificationSuccess = ({ message }) => {

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
  }*/

  return (
    <div>
      <form>
        <p>Find countries</p>
        <input 
          value={searchC} 
          onChange={(event) => handleInputChange({event, setValueCall: setSearchC})} 
          />
      </form> 
      {getAllConsidencies()}     
    </div> )  
}

{/*<div>
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
    </div>*/}

export default App