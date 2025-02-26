const Persons = ({persons, onDeleteHandle}) => {
    //console.log(persons)
    return (
        <>
            {persons.map(person => (
                <table key={person.id}>
                    <tbody>
                        <tr>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={() => onDeleteHandle(person.id)}>delete</button></td>
                        </tr>
                    </tbody>
                </table>
            ))} 
        </>
    )

}

export default Persons