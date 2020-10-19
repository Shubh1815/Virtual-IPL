import React, { useState, useEffect, useContext } from 'react'
import Context from '../../Context/Context'

import { Paper, Box, Grid, TextField, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import { Redirect } from 'react-router-dom'

const useStyle = makeStyles({
    root: {
        'min-height': '100vh',
        'width': '100%',
    },
    form: {
        'width': '500px',
        'padding': '20px 10px'
    }
})

const LoginPage = () => {
    
    const context = useContext(Context)
    const classes = useStyle()

    const [ redirect, setRedirect ] = useState('')

    const [ error, setError ] = useState('') 
    const [ username, setUsername ] = useState('admin')
    const [ password, setPassword ] = useState('')

    useEffect(() => {
        if(context.isAuth)
            setRedirect('/admin')
    }, [ context.isAuth ])

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const submit = () => {
        const data = {
            'username': username,
            'password': password,
        }
        context.setLoading(true)
        axios.post('https://virtual-ipl-api.herokuapp.com/auth/login/', data)
        .then((response) => {
            localStorage.setItem('token', response.data.key)
            console.log(response.data)
            context.setLoading(false)
            context.handleLogin()
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response.data.non_field_errors[0])
            context.setLoading(false)
        })
    }

    const redirectToAdmin = () => {
        return <Redirect to={redirect} />
    }

    return (
        <React.Fragment>
            { redirect && redirectToAdmin() }
            <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
                <Grid container spacing={3} component={Paper} className={classes.form}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert> }
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField 
                            autoFocus
                            label="Username"
                            value={username}
                            variant="outlined"
                            fullWidth 
                            onChange={handleUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            fullWidth    
                            onChange={handlePassword}     
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={submit} disabled={context.loading}>Log In!  {context.loading && < CircularProgress size="20px" color="secondary" style={{padding: '0 5px'}}/> }</Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default LoginPage