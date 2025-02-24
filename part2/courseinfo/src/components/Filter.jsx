const Filter = ({value, setValue, handleInputChange, persons}) => {
    return (
        <>
        <div>
          Searc: <input 
            value={value}
            onChange={(event) => handleInputChange({event, setValueCall: setValue})}
          /></div>
          {persons.filter(person => person.name.toLowerCase() === value.toLowerCase()).length > 0 ? (
            <p>Result: {persons.find(person => person.name.toLowerCase() === value.toLowerCase()).number}</p>
          ) : (
            <p>No results found</p>
          )}
        </>
    )  
}

export default Filter