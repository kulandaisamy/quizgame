import {Component, React} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import ScoreContext from '../Context/ScoreContext'
import './index.css'

class GameStart extends Component {
  state = {
    questions: [],
    questionCount: 1,
    isLoader: true,
    timeLeft: 15,
    selectedId: '',
    isAnswered: false,
    isDisabledNxt: true,
    score: 0,
    attempted: 0,
    questionsAttemptedId: [],
    isFailure: false,
  }

  getQuestions = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const getAllQuestions = data.questions.map(eachItem => ({
        id: eachItem.id,
        options: eachItem.options.map(each => ({
          id: each.id,
          isCorrect: each.is_correct === true || each.is_correct === 'true',
          text: each.text,
        })),
        optionsType: eachItem.options_type,
        questionText: eachItem.question_text,
      }))
      this.setState(
        {
          questions: getAllQuestions,
          isLoader: false,
        },
        this.timingChange,
      )
    } else {
      this.setState({
        isLoader: false,
        isFailure: true,
      })
    }
  }

  retryBtn = () => {
    this.setState(
      {
        isLoader: true,
        isFailure: false,
      },
      this.getQuestions,
    )
  }

  timingChange = () => {
    clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      this.setState(preState => {
        if (preState.timeLeft === 1) {
          return {
            timeLeft: 15,
            questionCount: preState.questionCount + 1,
            isDisabledNxt: true,
            selectedId: '',
            isAnswered: false,
          }
        }
        return {
          timeLeft: preState.timeLeft - 1,
        }
      })
    }, 1000)
  }

  componentDidMount() {
    this.getQuestions()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  checkResult = (optionId, isCorrect, questionId) => {
    this.setState(
      preState => ({
        selectedId: optionId,
        isAnswered: true,
        isDisabledNxt: false,
        score: isCorrect ? preState.score + 1 : preState.score,
        attempted: preState.attempted + 1,
        questionsAttemptedId: [...preState.questionsAttemptedId, questionId],
      }),
      this.updateScoreToContext,
    )
  }

  updateScoreToContext = () => {
    const {score, attempted, questions, questionsAttemptedId} = this.state
    this.context.updateScore(score, attempted, questions, questionsAttemptedId)
  }

  changeNxtQst = () => {
    this.setState(
      preState => ({
        timeLeft: 15,
        questionCount: preState.questionCount + 1,
        isDisabledNxt: true,
        selectedId: '',
        isAnswered: false,
      }),
      this.updateScoreToContext,
    )
  }

  render() {
    const {
      questionCount,
      questions,
      isLoader,
      timeLeft,
      selectedId,
      isAnswered,
      isDisabledNxt,
      score,
      isFailure,
    } = this.state
    console.log(score)
    if (questionCount === 11) {
      clearInterval(this.timerId)
      this.updateScoreToContext()
      return <Redirect to="/game-results" />
    }

    return (
      <div>
        <Header />
        <div className="home-page">
          <div className="question-page-container">
            {isLoader ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#263868"
                  height={50}
                  width={50}
                />
              </div>
            ) : isFailure ? (
              <div className="isFailure-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
                  alt="failure view"
                  className="failure-img"
                />
                <h1 className="failure-heading">Something went wrong</h1>
                <p className="busy-server">
                  Our server are busy please try again
                </p>
                <button
                  className="retry-button"
                  type="button"
                  onClick={this.retryBtn}
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="whole-page-question">
                <div>
                  <div className="question-container">
                    <div className="question-count-container">
                      <h1 className="text-question">Question</h1>
                      <p className="text-question-count">
                        {questionCount}/{questions.length}
                      </p>
                    </div>
                    <div className="time-counter">
                      <p>{timeLeft}</p>
                    </div>
                  </div>

                  {questions[questionCount - 1].optionsType === 'DEFAULT' && (
                    <div className="question-session">
                      <h1 className="headers-question">
                        {questions[questionCount - 1].questionText}
                      </h1>
                      <ol className="option-section">
                        {questions[questionCount - 1].options.map(
                          (eachItem, index) => {
                            let classStyle = 'list-Item btn-options'
                            const correctAnswer = questions[
                              questionCount - 1
                            ].options.find(eachItem => eachItem.isCorrect)
                            const questionId = questions[questionCount - 1].id
                            let isDisabled = false
                            if (isAnswered) {
                              if (eachItem.id === selectedId) {
                                if (eachItem.isCorrect) {
                                  classStyle += ' correct-color'
                                  isDisabled = true
                                } else {
                                  classStyle += ' wrong-color'
                                  isDisabled = true
                                }
                              } else if (eachItem.id === correctAnswer.id) {
                                classStyle += ' correct-color'
                                isDisabled = true
                              } else {
                                isDisabled = true
                                classStyle += ' normal-color'
                              }
                            }

                            const optionLetter = String.fromCharCode(65 + index)
                            return (
                              <li
                                className="button-align-result"
                                key={eachItem.id}
                              >
                                <button
                                  type="button"
                                  className={classStyle}
                                  onClick={() =>
                                    this.checkResult(
                                      eachItem.id,
                                      eachItem.isCorrect,
                                      questionId,
                                    )
                                  }
                                  disabled={isDisabled}
                                >
                                  <span className="count-alpha">
                                    {optionLetter}.
                                  </span>
                                  <span>{eachItem.text}</span>
                                </button>
                                <span className="icon-space">
                                  {isAnswered && selectedId === eachItem.id && (
                                    <>
                                      {eachItem.isCorrect ? (
                                        <img
                                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                          alt="correct checked circle"
                                          className="correct-circle-img"
                                        />
                                      ) : (
                                        <img
                                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                                          alt="incorrect close circle"
                                          className="wrong-circle-img"
                                        />
                                      )}
                                    </>
                                  )}
                                  {isAnswered &&
                                    eachItem.isCorrect &&
                                    eachItem.id !== selectedId && (
                                      <img
                                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                        alt="correct checked circle"
                                        className="correct-circle-img"
                                      />
                                    )}
                                </span>
                              </li>
                            )
                          },
                        )}
                      </ol>
                    </div>
                  )}
                  {questions[questionCount - 1].optionsType === 'IMAGE' && (
                    <div className="question-session">
                      <h1 className="headers-question">
                        {questions[questionCount - 1].questionText}
                      </h1>
                      <ol className="image-options-list">
                        {questions[questionCount - 1].options.map(eachItem => {
                          const questionId = questions[questionCount - 1].id
                          return (
                            <li
                              key={eachItem.id}
                              className="button-align-result"
                            >
                              <button
                                type="button"
                                className="image-options btn-options"
                                onClick={() =>
                                  this.checkResult(
                                    eachItem.id,
                                    eachItem.isCorrect,
                                    questionId,
                                  )
                                }
                                disabled={isAnswered}
                              >
                                {eachItem.text}
                              </button>
                              <span className="icon-space-image">
                                {isAnswered && selectedId === eachItem.id && (
                                  <>
                                    {eachItem.isCorrect ? (
                                      <img
                                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                        alt="correct checked circle"
                                        className="correct-circle-img-icon"
                                      />
                                    ) : (
                                      <img
                                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                                        alt="incorrect close circle"
                                        className="wrong-circle-img-icon"
                                      />
                                    )}
                                  </>
                                )}
                                {isAnswered &&
                                  eachItem.isCorrect &&
                                  eachItem.id !== selectedId && (
                                    <img
                                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                      alt="correct checked circle"
                                      className="correct-circle-img-icon"
                                    />
                                  )}
                              </span>
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  )}
                  {questions[questionCount - 1].optionsType ===
                    'SINGLE_SELECT' && (
                    <div className="question-session">
                      <h1 className="headers-question">
                        {questions[questionCount - 1].questionText}
                      </h1>
                      <ol className="order-option-list">
                        {questions[questionCount - 1].options.map(eachItem => {
                          const questionId = questions[questionCount - 1].id
                          return (
                            <li key={eachItem.id} className="option-radio-btn">
                              <input
                                type="radio"
                                id={eachItem.id}
                                name="options"
                                onChange={() =>
                                  this.checkResult(
                                    eachItem.id,
                                    eachItem.isCorrect,
                                    questionId,
                                  )
                                }
                                disabled={isAnswered}
                              />
                              <label
                                htmlFor={eachItem.id}
                                className="options-label"
                              >
                                {eachItem.text}
                              </label>
                              <span className="icon-space">
                                {isAnswered && selectedId === eachItem.id && (
                                  <>
                                    {eachItem.isCorrect ? (
                                      <img
                                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                        alt="correct checked circle"
                                        className="correct-circle-img-icon"
                                      />
                                    ) : (
                                      <img
                                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                                        alt="incorrect close circle"
                                        className="wrong-circle-img-icon"
                                      />
                                    )}
                                  </>
                                )}
                                {isAnswered &&
                                  eachItem.isCorrect &&
                                  eachItem.id !== selectedId && (
                                    <img
                                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                      alt="correct checked circle"
                                      className="correct-circle-img-icon"
                                    />
                                  )}
                              </span>
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  )}
                </div>

                <button
                  className={isDisabledNxt ? 'btn-nxtPage' : 'accessNxt-page'}
                  disabled={isDisabledNxt}
                  onClick={this.changeNxtQst}
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

GameStart.contextType = ScoreContext
export default GameStart
