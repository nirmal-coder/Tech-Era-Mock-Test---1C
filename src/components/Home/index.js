import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'
import './index.css'

const status = {
  initial: 'INITIAL',
  fetched: 'FETCHED',
  notFetched: 'NOT-FETCHED',
}

const Home = () => {
  const [courseList, setCourseList] = useState([])
  const [dataStatus, setStatus] = useState(status.initial)

  const getData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      setCourseList(data.courses)
      setStatus(status.fetched)
      console.log(data)
    } else {
      setStatus(status.notFetched)
    }
  }

  useEffect(() => {
    getData()
    console.log('useEffect')
  }, [])

  const loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
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
    <div className="MainContainer">
      <h1 className="Heading">Courses</h1>
      <ul className="Container">
        {courseList.map(each => (
          <CourseItem obj={each} key={each.id} />
        ))}
      </ul>
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

export default Home
