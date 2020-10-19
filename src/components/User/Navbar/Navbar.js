import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import SportsCricketIcon from '@material-ui/icons/SportsCricketTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import { Redirect } from 'react-router-dom'

import Context from '../../../Context/Context'

const useStyle = makeStyles((theme) => ({
    title: {
        'flex-grow': 1,
    },
    search: {
        'position': 'relative',
        'border-radius': '10px',
        'background-color': theme.palette.primary.light,
        'padding': '5px 5px 5px 40px',
        // 'color': 'white',
        // 'width': '100px'
    },
    searchIcon: {
        'position': "absolute",
        'left': '25px',
        'top': '50%',
        'transform': 'translate(-50%, -50%)'
    },
    inputRoot: {
        color: 'inherit',
    },
    input: {
        transition: theme.transitions.create('width'),
        width: '100px',
        [theme.breakpoints.up('sm')]: {
            width: '9ch',
            '&:focus': {
              width: '12ch',
            }
        }
    }
}))

const Navbar = () => {

    const classes = useStyle()

    const { loading } = useContext(Context)

    const [ team, setTeam] = useState(null)
    const [ redirect, setRedirect ] = useState('')

    const handleChange = (event) => {
        setTeam(event.target.value)
    }

    const handleTeam = (event) => {
        if(event.key === 'Enter' && !isNaN(team)){
            setRedirect(`/team/${team}`)
        }
    }

    const redirectToTeamPage = () => {
        return <Redirect to={redirect} />
    }

    return (
        <React.Fragment>
            {redirect && redirectToTeamPage()}
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="div" variant="h5" className={classes.title}>
                        <SportsCricketIcon  color="secondary" fontSize="large"/> Virtual IPL 
                    </Typography>

                    <div className={classes.search}>
                        <span className={classes.searchIcon}>
                            <SearchIcon />
                        </span>
                        <InputBase
                            placeholder="Team No."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.input
                            }}
                            onChange={(event) => handleChange(event)}
                            onKeyUp={(event) => handleTeam(event)}
                        />
                    </div>

                </Toolbar>
            </AppBar>
            { loading && <LinearProgress style={{height: '5px'}} color="primary" />}
        </React.Fragment>
    )
}

export default Navbar