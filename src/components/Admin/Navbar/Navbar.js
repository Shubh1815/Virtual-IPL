import React, { useContext } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

import MainNavbar from '../../MainNavbar/MainNavbar'
import Context from '../../../Context/Context'

const Navbar = (props) => {

    const context = useContext(Context)
    
    const handleLogOut = () => {
        localStorage.removeItem('token')
        context.handleLogOut()
    }

    return(
        <MainNavbar>
            <ButtonGroup>
                {props.children}
                <Button variant="contained" color="secondary" onClick={handleLogOut} size="small">Log Out</Button>
            </ButtonGroup>
        </MainNavbar>
    )
}

export default Navbar