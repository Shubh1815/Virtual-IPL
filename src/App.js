import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from './components/Admin/Admin'
import Leaderboard from './components/Admin/Leaderboard/Leaderboard'
import User from './components/User/User'
import Login from './components/LoginPage/LoginPage'
import Context from './Context/Context'

import './App.css'

function App() {
  const token = localStorage.getItem('token')
  const [ isAuth, setIsAuth ] = useState(!token ? false : true)

  const handleLogin = () => {
    setIsAuth(true)
  }

  const handleLogOut = () => {
    setIsAuth(false)
  }

  return (
      <Context.Provider value={{
        'isAuth': isAuth,
        'handleLogin': handleLogin,
        'handleLogOut': handleLogOut
      }}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            {isAuth && <Route exact path="/admin" component={Admin}/>}
            {isAuth && <Route exact path="/leaderboard" component={Leaderboard} /> }
            <Route path="/" component={User} />
          </Switch>
        </Router>
      </Context.Provider>
  )
}

export default App
