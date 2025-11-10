import React from 'react'

const ScoreContext = React.createContext({
  score: 0,
  attempted: 0,
  questions: [],
  updateScore: () => {},
})

export default ScoreContext
