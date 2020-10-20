import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import SportsCricketIcon from '@material-ui/icons/SportsCricketTwoTone'

const useStyle = makeStyles((theme) => ({
    title: {
        'flex-grow': 1,
        'text-decoration': 'none',
        [theme.breakpoints.down('sm')]: {
            'font-size': '1.15em',
            '& > svg': {
                'font-size': '1.5em'
            }
        }
    },
}))

const MainNavbar = (props) => {

    const classes = useStyle()

    return(
        <AppBar position="sticky">
            <Toolbar>
                <Typography component={Link} to="/" variant="h5" className={classes.title} color="inherit">
                    <SportsCricketIcon  color="secondary" fontSize="large"/> Virtual IPL 
                </Typography>

                { props.children }
                
            </Toolbar>
        </AppBar>
    )
}

export default MainNavbar