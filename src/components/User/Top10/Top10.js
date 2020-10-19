import React, { useState, useEffect } from 'react'
import { Box, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../style'


import img from '../../../assets/batsmen.jpg'
import axios from 'axios'

const useStyle = makeStyles({
    ...styles,
    table: {
        'margin': '0 10px',
        'max-width': '992px',
        'min-height': '350px',
        'position': 'relative',
    },
})

const Top10 = () => {

    const classes = useStyle()
    const [ top10, setTop10 ] = useState([])

    useEffect(() => {
        axios.get('https://virtual-ipl-api.herokuapp.com/api/top10/')
        .then((response) => {
            console.log(response.data)
            setTop10(response.data.Top10)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <Box display="flex" justifyContent="center" className={classes.root}>
            <TableContainer className={classes.table} component={Paper}>
                <div className={classes.tableTitle}>
                    <Typography component="div" variant="h4" className={classes.title}>TOP 10</Typography>
                </div>
                <Table>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center" width="10%">Sr No.</TableCell>
                            <TableCell align="center" width="20%">Team No.</TableCell>
                            <TableCell align="center" width="40%">Player Name</TableCell>
                            <TableCell align="center" width="30%">Price (CR)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {top10.map((player, i) => ( 
                            <TableRow key={player.id}>
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell align="center">{player.team}</TableCell>
                                <TableCell align="center">{player.player_name}</TableCell>
                                <TableCell align="center">{player.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { !top10.length ? <img className={classes.img} src={img} alt="batsmen"/> : null }
            </TableContainer>
        </Box>
    )
}

export default Top10