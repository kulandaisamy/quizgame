import {Component} from 'react'
import Header from '../Header'
import ScoreContext from '../Context/ScoreContext'
import './index.css'

class GameReport extends Component {
  render() {
    return (
      <ScoreContext.Consumer>
        {value => {
          const {score, attempted, questions, questionsAttemptedId} = value
          const unattempted = questions.length - attempted
          const wrongAnswer = questions.length - (unattempted + score)
          const filterUnattemptedQuestions = questions.filter(eachItem => {
            const filteredData = !questionsAttemptedId.includes(eachItem.id)
            return filteredData
          })
          return (
            <div>
              <Header />
              <div className="report-home-page">
                <div className="report-page-container">
                  <div className="result-details-container">
                    <div className="mark-container">
                      <p>
                        <span className="mark-style">{score}</span>
                        <span className="slash-style">/</span>
                        <span className="out-of-mark">{questions.length}</span>
                      </p>
                    </div>
                    <div className="no-of-ans-container">
                      <div className="no-of-crt-ans">
                        <div className="icon-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                            alt="correct answer icon"
                            className="report-correct-img"
                          />
                        </div>
                        <p className="wrong-ans-para">
                          {score} Correct answers
                        </p>
                      </div>
                      <div className="no-of-crt-ans">
                        <div className="icon-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                            alt="incorrect answer icon"
                            className="report-wrong-img"
                          />
                        </div>
                        <p className="wrong-ans-para">
                          {wrongAnswer} Wrong answers
                        </p>
                      </div>
                      <div className="no-of-crt-ans">
                        <div className="icon-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                            alt="unattempted icon"
                            className="report-unattenpted-img"
                          />
                        </div>
                        <p className="wrong-ans-para">
                          {unattempted} Unattempted
                        </p>
                      </div>
                    </div>
                  </div>
                  {filterUnattemptedQuestions.length > 0 ? (
                    <div className="unattempted-question-container">
                      <h1 className="unattemp-question-header">
                        Unattempted Questions
                      </h1>
                      <ul className="unattempted-question-list">
                        {filterUnattemptedQuestions.map(eachItem => {
                          if (eachItem.optionsType === 'DEFAULT') {
                            return (
                              <li
                                key={eachItem.id}
                                className="unattempted-whole-question-container"
                              >
                                <p className="question-heading">
                                  {eachItem.questionText}
                                </p>
                                <ol className="unttempted-option-section">
                                  {eachItem.options.map((each, index) => {
                                    const optionLetter = String.fromCharCode(
                                      65 + index,
                                    )
                                    return (
                                      <li
                                        className="unattempted-button-align-result"
                                        key={each.id}
                                      >
                                        <div
                                          className={
                                            each.isCorrect
                                              ? 'unattempted-correct-color unattempted-list-Item btn-options'
                                              : 'unattempted-list-Item btn-options'
                                          }
                                        >
                                          <span className="count-alpha">
                                            {optionLetter}.
                                          </span>
                                          <span>{each.text}</span>
                                        </div>
                                        <span className="unattempted-icon-space">
                                          {each.isCorrect && (
                                            <img
                                              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                              alt="correct checked circle"
                                              className="correct-circle-img"
                                            />
                                          )}
                                        </span>
                                      </li>
                                    )
                                  })}
                                </ol>
                              </li>
                            )
                          }
                          if (eachItem.optionsType === 'IMAGE') {
                            return (
                              <li
                                key={eachItem.id}
                                className="unattempted-whole-question-container"
                              >
                                <p className="image-question-heading">
                                  {eachItem.questionText}
                                </p>
                                <ul className="unttempted-image-option-section">
                                  {eachItem.options.map(each => (
                                    <li
                                      className="unattempted-button-align-result"
                                      key={each.id}
                                    >
                                      <div className="image-options btn-options">
                                        <img
                                          src={each.imageUrl}
                                          alt={each.text}
                                          className="btn-img-options"
                                        />
                                      </div>
                                      <span className="icon-space-image">
                                        {each.isCorrect && (
                                          <img
                                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                            alt="correct checked circle"
                                            className="correct-circle-img-icon"
                                          />
                                        )}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )
                          }
                          if (eachItem.optionsType === 'SINGLE_SELECT') {
                            return (
                              <li
                                key={eachItem.id}
                                className="unattempted-whole-question-container"
                              >
                                <p className="question-heading">
                                  {eachItem.questionText}
                                </p>
                                <ul className="order-option-list">
                                  {eachItem.options.map(each => (
                                    <li
                                      className="option-radio-btn"
                                      key={each.id}
                                    >
                                      <input
                                        type="radio"
                                        id={each.id}
                                        name={each.id}
                                        checked={each.isCorrect}
                                        disabled
                                      />
                                      <label
                                        htmlFor={each.id}
                                        className="options-label"
                                      >
                                        {each.text}
                                      </label>

                                      <span className="icon-space">
                                        {each.isCorrect && (
                                          <img
                                            src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                            alt="correct checked circle"
                                            className="correct-circle-img-icon"
                                          />
                                        )}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )
                          }
                          return null
                        })}
                      </ul>
                    </div>
                  ) : (
                    <div className="unattempted-question-container no-unattempt-question">
                      <p className="attempt-all-question">
                        Attempted all the questions
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ScoreContext.Consumer>
    )
  }
}

export default GameReport
