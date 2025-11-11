import {Component} from 'react'
import Header from '../Header'
import ScoreContext from '../Context/ScoreContext'
import './index.css'

class GameResult extends Component {
  showReport = () => {
    const {history} = this.props
    history.push('/game-report')
  }

  render() {
    return (
      <ScoreContext.Consumer>
        {value => {
          const {score, attempted, questions} = value
          const percentage = (score / questions.length) * 100

          return (
            <div className="">
              <Header />
              <div className="home-page">
                {score >= 5 ? (
                  <div className="home-page-container bg-img-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                      alt="won"
                      className="won-cup-img"
                    />

                    <h1 className="congrats-header">Congrats!</h1>
                    <p className="percent-score">
                      {percentage}% Correctly Answered
                    </p>
                    <p className="completed-game-para">
                      Quiz completed successfully
                    </p>
                    <p className="total-questions-para">
                      You attempted {attempted} out of {questions.length}{' '}
                      questions as correct.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={this.showReport}
                      type="button"
                    >
                      Report
                    </button>
                  </div>
                ) : (
                  <div className="home-page-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                      className="lose-img"
                      alt="lose"
                    />
                    <p className="lose-text">You lose!</p>
                    <p className="percent-calculation">
                      {percentage}% Correctly Answered
                    </p>
                    <p className="total-questions-para-lose">
                      You attempted {attempted} out of {questions.length}{' '}
                      questions as correct.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.showReport}
                    >
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </ScoreContext.Consumer>
    )
  }
}

export default GameResult
