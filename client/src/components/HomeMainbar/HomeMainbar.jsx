import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

  const user = useSelector((state) => (state.currentUserReducer));
  const navigate = useNavigate()

  const questionsList = useSelector(state => state.questionsReducer)

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question")
      navigate('/Auth')
    } else {
      navigate('/AskQuestion')
    }
  }

  const location = useLocation()

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1 className='home-head-ing'>Top Questions</h1> : <h1 className='home-head-ing'>All Questions</h1>
        }

        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null ?
            <h1 className='load-screen'>Loading...</h1> :
            <>
              <p>{questionsList.data.length} question</p>
              <QuestionList questionsList={questionsList.data} />
            </>
        }
      </div>
    </div>
  )
}
export default HomeMainbar
