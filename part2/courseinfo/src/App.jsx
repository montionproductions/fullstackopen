import { useState, useEffect} from 'react'

/*import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'*/
import countriesServices from './services/countries'
import openWeatherMap from './services/openWeatherMap'
import CountryInfo from './components/Country/CountryInfo'
import CountryRow from './components/Country/CountryRow'

const App = () => {
  /*const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSerch, setNewSerch] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')*/
  const [searchC, setSearchC] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const [newContryLoaded, setNewContryLoaded] = useState(false)

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

  const weatherHook = () => {
    if(searchC === '')
      return

    const country = countries.find(country => 
      new RegExp(`\\b${searchC.toLowerCase()}\\b`).test(country.name.common.toLowerCase())
    );

    if (!country) {
      console.log('No matching country found');
      return;
    }
    
    console.log('fetching weather contry ', searchC)
    openWeatherMap.getWeather(searchC).then(response => {
      setWeather(response.data) 
    }).catch(error => {
      console.log(error.message)
    })
    console.log('weather: ', weather)
  }

  useEffect(() => {
    countriesServices.getAll().then(response => {
      setCountries(response.data)
      //console.log(openWeatherMap.getWeather('Helsinki'))
      //console.log('fetching data: ', countries)
    })
    console.log("??????")
  }, [])

  useEffect(() => {
    
    if(newContryLoaded === false)
      return

    const interval = setInterval(() => {
      weatherHook()
      setNewContryLoaded(false)
    }, 3000);

    return () => clearInterval(interval)

  }, [newContryLoaded])

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
        <CountryInfo country={country} weather={weather} setWeather={setWeather}/>
      )
    }

    //const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase()))
    return (
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase())).length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (

          countries.filter(country => country.name.common.toLowerCase().includes(searchC.toLowerCase())).map(country => 
            <CountryRow key={country.name.common} country={country} handleOnClick={() => handleInputChangeW(country.name.common)} />
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
      console.log("button 1 presses: " + event.target.value);
      weatherHook()
    }
  }

  const handleInputChangeW = (contryName) => {
    console.log("button 2 presses: " + contryName);
    setSearchC(contryName)
    setNewContryLoaded(true)
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