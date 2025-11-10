import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  startGame = () => {
    const {history} = this.props
    history.replace('/quiz-game')
  }

  render() {
    return (
      <div className="game-layout">
        <Header />
        <div className="home-page">
          <div className="home-page-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
              alt="start quiz game"
              className="home-container"
            />
            <h1 className="heading-question">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="para-container">
              Test yourself with these easy quiz questions and answers
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.startGame}
            >
              Start Quiz
            </button>
            <div className="test-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                alt="warning icon"
                className="warning-icon"
              />
              <p>
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
