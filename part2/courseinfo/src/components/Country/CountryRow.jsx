const CountryRow = ({country, handleOnClick}) => {
    return (
    <div className='country-row'>
      <p key={country.name.common}>{country.name.common}</p>
      <button onClick={() => handleOnClick(country.name.common)}>Show</button>
    </div>) 
  }

export default CountryRow