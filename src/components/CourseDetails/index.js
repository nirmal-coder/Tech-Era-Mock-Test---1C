import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const status = {
  initial: 'INITIAL',
  fetched: 'FETCHED',
  notFetched: 'NOT-FETCHED',
}

const CourseDetails = props => {
  const [dataStatus, changeDataStatus] = useState(status.initial)
  const [course, changeCourse] = useState({})

  const getData = async () => {
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      changeCourse(data.course_details)
      changeDataStatus(status.fetched)
      console.log(data)
    } else {
      changeDataStatus(status.notFetched)
    }
  }

  useEffect(() => {
    getData()
    console.log('useEffect')
  }, [])

  const loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </div>
  )

  const failureView = () => (
    <div className="FailureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={getData}>
        Retry
      </button>
    </div>
  )

  const successView = () => (
    <div className="CdMainContainer">
      <div className="CdContainer">
        <img src={course.image_url} alt={course.name} />
        <div className="CdDescription">
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  )

  switch (dataStatus) {
    case status.initial:
      return loader()
    case status.fetched:
      return successView()
    case status.notFetched:
      return failureView()
    default:
      return null
  }
}
export default CourseDetails
