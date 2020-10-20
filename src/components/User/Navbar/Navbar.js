import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import SearchIcon from '@material-ui/icons/Search'

import MainNavBar from '../../MainNavbar/MainNavbar'
import Context from '../../../Context/Context'

const useStyle = makeStyles((theme) => ({
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

    const [ team, setTeam] = useState('')
    const [ redirect, setRedirect ] = useState('')

    useEffect(()=> {
        setRedirect('')
    }, [ team ])

    const handleChange = (event) => {
        setTeam(event.target.value)
        console.log(event.target.value)
    }

    const handleTeam = (event) => {
        console.log(team)
        if(event.key === 'Enter' && !isNaN(team)){
            setRedirect(`/team/${team}`)
        }
    }

    const redirectToTeamPage = () => {
        if(team)
            setTeam('')
        return <Redirect to={redirect} />
    }

    return (
        <React.Fragment>
            {redirect && redirectToTeamPage()}
            <MainNavBar>
                <div className={classes.search}>
                    <span className={classes.searchIcon}>
                        <SearchIcon />
                    </span>
                    <InputBase
                        classes={{
                            root: classes.inputRoot,
                            input: classes.input
                        }}
                        onChange={(event) => handleChange(event)}
                        onKeyUp={(event) => handleTeam(event)}
                        placeholder="Team No."
                        value={team}
                    />
                </div>
            </MainNavBar>
            { loading && <LinearProgress style={{height: '5px'}} color="primary" />}
        </React.Fragment>
    )
}

export default Navbar