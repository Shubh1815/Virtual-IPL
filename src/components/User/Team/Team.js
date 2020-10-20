import React, { useState, useEffect, useContext } from 'react'
import { Box, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../style'
import img from '../../../assets/batsmen.png'
import axios from 'axios'

import Context from '../../../Context/Context'

const useStyle = makeStyles(styles)

const Team = (props) => {

    const { setLoading } = useContext(Context)

    const team_no = props.match.params.id
    const [ state, setState ] = useState({
        'team': {
            'team_no': '',
            'budget': ''
        },
        'players': [],  
    })

    const classes = useStyle()

    useEffect(() => {
        setLoading(true)
        axios.get(`https://virtual-ipl-api.herokuapp.com/api/team/${team_no}/`)
        .then((response) => {
            console.log(response.data)
            setState(response.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [ team_no, setLoading ] )

    return (
        <Box maxWidth="md" className={classes.root} display='flex' justifyContent='center'>
            <TableContainer component={Paper} className={classes.table}>
                <div className={classes.tableTitle}>
                    <Typography component="div" variant="h4" className={classes.title}>Team {state.team.team_no}</Typography>
                    <Typography component="div" variant="subtitle1" className={classes.title}>Budget: {state.team.budget} CR</Typography>
                </div>
                <Table>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center" width="10%">Sr No.</TableCell>
                            <TableCell align="center" width="40%">Player Name</TableCell>
                            <TableCell align="center" width="25%">Type</TableCell>
                            <TableCell align="center" width="25%">Price (Crores)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {state.players.map((player, i) => (
                            <TableRow key={player.id}>
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell align="center">{player.player_name}</TableCell>
                                <TableCell align="center">{player.player_type}</TableCell>
                                <TableCell align="center">{player.price} Cr</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { !state.players.length ? <img className={classes.img} src={img} alt="batsmen"/> : null }
            </TableContainer>
        </Box>
    )
}

export default Team