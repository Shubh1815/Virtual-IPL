import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from '@material-ui/core'

import Context from '../../../Context/Context'

const useStyle = makeStyles({
    title: {
        'flex-grow': 1,
    },
})
const Navbar = (props) => {

    const classes = useStyle()
    const context = useContext(Context)
    
    const handleLogOut = () => {
        localStorage.removeItem('token')
        context.handleLogOut()
    }

    return(
        <AppBar position="sticky">
            <Toolbar>
                <Typography component="div" variant="h6" className={classes.title}>Virtual IPL</Typography>

                <ButtonGroup>
                    {props.children}
                    <Button variant="contained" color="secondary" onClick={handleLogOut} size="small">Log Out</Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar