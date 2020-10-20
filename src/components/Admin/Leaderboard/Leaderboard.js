import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Paper, Button } from '@material-ui/core'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../Navbar/Navbar'

import Context from '../../../Context/Context'
import styles  from '../../style'

import axios from 'axios'
import img from '../../../assets/batsmen.png'

const useStyle = makeStyles({
    ...styles,
    tableBody: {
        '& > tr > td': {
            'background-color': 'inherit',
            'color': 'inherit',
        }
    }
})

const Leaderboard = () => {

    const token = localStorage.getItem('token')

    const classes = useStyle()
    const [ leaderboard, setLeaderboard ] = useState([])

    const { loading, setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)
        axios.get('https://virtual-ipl-api.herokuapp.com/api/leaderboard/', {
            'headers': {
                'Authorization': `Token ${token}`,
            }
        })
        .then((response) => {
            console.log(response.data)
            setLeaderboard(response.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [ setLoading, token ])

    return (
        <React.Fragment>
            <Navbar>
                <Button component={Link} size="small" variant="contained" to="/admin">Admin</Button>
            </Navbar>
            <Box display="flex" justifyContent="center" className={classes.root}>
                <TableContainer className={classes.table} component={Paper}>
                    <div className={classes.tableTitle}>
                        <Typography component="div" variant="h4" className={classes.title}>Leaderboard</Typography>
                    </div>
                    {loading && <LinearProgress />}
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell align="center" width="10%">Rank</TableCell>
                                <TableCell align="center" width="20%">Team No.</TableCell>
                                <TableCell align="center" width="40%">Rating</TableCell>
                                <TableCell align="center" width="30%">Budget (Crores)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {leaderboard.map((team, i) => ( 
                                <TableRow key={team.team} style={i < 3 ? {'backgroundColor': 'rgb(0 181 95)', 'color': 'white'} : null}>
                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{team.team}</TableCell>
                                    <TableCell align="center">{team.rating}</TableCell>
                                    <TableCell align="center">{team.budget} CR</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    { !leaderboard.length ? <img className={classes.img} src={img} alt="batsmen"/> : null }
                </TableContainer>
            </Box>
        </React.Fragment>
        
    )
}

export default Leaderboard