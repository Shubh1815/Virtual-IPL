import React from 'react'
import Navbar from './Navbar/Navbar'
import Team from './Team/Team'
import Top10 from './Top10/Top10'

import { Switch, Route, Redirect } from 'react-router-dom'

const User = () => {

    return (
        <React.Fragment>
            <Navbar />
            
            <Switch>
                <Route exact path="/team/:id" render={(props) => <Team {...props} />} />
                <Route exact path="/" component={Top10} />
                <Redirect to="/" />
            </Switch>
            
        </React.Fragment>
    )
}

export default User