import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { startchecking } from '../action/auth'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen'

export const AppRouter = () => {

const dispatch = useDispatch();

useEffect(()=>{
    dispatch(startchecking()  );
},[dispatch])


    return (
        <Router>
            <div>

            <h1> AppRouter </h1>

            <Switch>
                <Route exact path='/login' component={ LoginScreen } />  
                <Route exact path='/' component={ CalendarScreen } />  
                <Redirect to='/' />
            </Switch>
            </div>
        </Router>
    )
}
