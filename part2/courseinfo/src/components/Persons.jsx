const Persons = ({persons, onDeleteHandle}) => {
    //console.log(persons)
    return (
        <>
            {persons.map(person => (
                <div key={person.id}>
                    <p>{person.name} {person.number}</p>
                    <button onClick={() => onDeleteHandle(person.id)}>delete</button>  
                </div>
            ))} 
        </>
    )

}

export default Persons