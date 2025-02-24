import Part from './Part'

const Content = (props) => {
    //console.log(props.parts[0].exercises);
    return (
      <>
        {props.parts.map(
            part => <Part key={part.id} 
                name={part.name} 
                exercise={part.exercises} 
        />)}
      </>
    )
  }

export default Content