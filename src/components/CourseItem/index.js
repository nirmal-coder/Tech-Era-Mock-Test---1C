import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {obj} = props
  console.log(obj)
  return (
    <Link className="Links" to={`/courses/${obj.id}`}>
      <li className="CiContainer">
        <img src={obj.logo_url} alt={obj.name} />
        <p>{obj.name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
