import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import GameStart from './components/GameStart'
import GameResult from './components/GameResult'
import ScoreContext from './components/Context/ScoreContext'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoutes'
import './App.css'
import {Component} from 'react'

// Replace your code here
class App extends Component {
  state = {
    score: 0,
    attempted: 0,
    questions: [],
    questionsAttemptedId: [],
  }

  updateScore = (score, attempted, questions, questionsAttemptedId) => {
    this.setState({
      score,
      attempted,
      questions,
      questionsAttemptedId,
    })
  }

  render() {
    const {score, attempted, questions, questionsAttemptedId} = this.state
    return (
      <ScoreContext.Provider
        value={{
          score,
          attempted,
          questions,
          questionsAttemptedId,
          updateScore: this.updateScore,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/quiz-game" component={GameStart} />
          <ProtectedRoute exact path="/game-results" component={GameResult} />
          <ProtectedRoute exact path="/game-report" component={GameReport} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ScoreContext.Provider>
    )
  }
}

export default App
