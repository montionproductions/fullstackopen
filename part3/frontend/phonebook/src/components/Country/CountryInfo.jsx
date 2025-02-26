const CapitalInfo = ({country}) => {
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
        <p>Weather in {country.capital}</p>
      </div>
  )
}

const CountryInfo = ({country, weather}) => {
  if(weather === null) 
    return (<>
      <CapitalInfo country={country} />
      <p>Loading weather...</p>
    </>)

  const scrURL = weather.weather[0].icon
  console.log(scrURL)

  return (
    <div>
      <CapitalInfo country={country} />
      <p>Zone: {weather.name}</p>
      <img src={'https://openweathermap.org/img/wn/'+ scrURL + '@2x.png'} alt="Weather icon"/>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryInfo