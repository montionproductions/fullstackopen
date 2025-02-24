
import Content from './Content'
import Header from './Header'
//import Content from './Content'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <p><b>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
      </div>
    )
  }

export default Course