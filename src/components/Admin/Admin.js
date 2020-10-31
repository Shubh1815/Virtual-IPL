import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Container } from '@material-ui/core'
import { Typography, TextField, Button } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/'

import SportsCricketIcon from '@material-ui/icons/SportsCricket'
import LinearProgress from '@material-ui/core/LinearProgress'

import Navbar from './Navbar/Navbar'

import axios from 'axios'
import Captain from './Captain/Captain'

const useStyle = makeStyles((theme) => ({
    root: {
        'min-height': 'calc(100vh - 64px)',
        [theme.breakpoints.down('sm')] : {
            'margin-top': '60px',
            'flex-direction': 'column'
        },
    },
    form: {
        'max-width': '500px',
        'background': 'white',
        'padding': '15px',
        'border-radius': '10px',
        'transform': 'translateY(-12%)',
        'margin': '0 20px',
    },
    button:{
        'float': 'right',
        'margin': '5px'
    }
}))

const Admin = () => {
    const [ players, setPlayers ] = useState([])
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)

    const [ team, setTeam ] = useState('')
    const [ player, setPlayer ] = useState(null)
    const [ price, setPrice ] = useState('')

    const [ toggleDeleteBox, setToggleDeleteBox ] = useState(false)

    const [ loading, setLoading ] = useState(false)

    const token = localStorage.getItem('token')

    const classes = useStyle()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/player/')
        .then((response) => {
            setPlayers(response.data)
        })
        .catch((err) => {
            setError(err)
        })
    }, [])

    useEffect(() => {
        setError('')
        setSuccess('')
    }, [player, price, team])

    const handlePlayer = (event, value) => {
        setPlayer(value)
    }

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleTeam = (event) => {
        setTeam(event.target.value)
    }

    const handleSubmit = () => {
        setError('')
        setSuccess('')
        if(player && price && team){
            const index = players.findIndex((p) => p === player)
            let data = players[index]

            data = {
                ...data,
                price: Number(price),
                team: Number(team),
            }
            
            setLoading(true)

            axios.put(`http://127.0.0.1:8000/api/player/${data.id}/`, data, {
                'headers': {
                    'Authorization': `Token ${token}`,
                }
            })
            .then((response) => {
                console.log(response.data)
                setLoading(false)
                setSuccess("Player Added")
            })
            .catch((err) => {
                setLoading(false)
                setError(err.response.data.error)
            })
        } else {
            setError("Please fill all inputs")
        }
    }

    const deleteBoxOpen = () => {
        if(player){
            setToggleDeleteBox(true)
        } else {
            setError('Please select a player first')
        }
    }

    const deleteBoxClose = () => {
        setToggleDeleteBox(false)
    }

    const handleDelete = () => {
        setError('')
        setSuccess('')
        if(player){
            const index = players.findIndex((p) => p === player)
            const data = players[index]

            setLoading(true)

            axios.delete(`http://127.0.0.1:8000/api/player/${data.id}/`, {
                'headers': {
                    'Authorization': `Token ${token}`,
                }
            })
            .then((response) => {
                console.log(response.data)
                setLoading(false)
                setSuccess('Player removed from his team.')
                setToggleDeleteBox(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                setToggleDeleteBox(false)
            })
        }
    }

    return (
        <React.Fragment>
            <Navbar>
                <Button component={Link} to="/leaderboard" variant="contained" size="small" >Leaderboard</Button>
            </Navbar>
            { loading && <LinearProgress />}
            <Container>
                <Box display='flex' justifyContent='center' alignItems='center' className={classes.root}>
                    <Grid container spacing={2} className={classes.form} component={Paper} elevation={3}>
                        <Grid item xs={12}>
                            <Typography component="div" variant="h4"><SportsCricketIcon color="secondary" fontSize="large"/> Virtual IPL</Typography>
                            { error ? (<Alert severity="error">{error}</Alert>) : null }
                            { success ? (<Alert severity="success">{success}</Alert>): null}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                autoFocus
                                fullWidth
                                label="Team No."
                                onChange={handleTeam}
                                required
                                type="number"
                                value={team}
                                variant="outlined"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Autocomplete 
                                getOptionLabel={(player) => player.player_name}
                                onChange={handlePlayer}
                                options={players}
                                renderInput={(params) => <TextField {...params} label="Player Name" variant="outlined" required />}
                                value={player}  
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label="Price (Crores)"
                                onChange={handlePrice}
                                required
                                type="number"
                                variant="outlined"
                                value={price}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Submit</Button>
                            <Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={deleteBoxOpen}>Delete</Button>

                            <Dialog open={toggleDeleteBox} onClose={deleteBoxClose}>
                                <DialogTitle>Delete</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Are you sure? This will remove the player from his team. </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button type="submit" variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
                                    <Button autoFocus variant="outlined" onClick={deleteBoxClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                    </Grid>
                    <Grid container spacing={2} className={classes.form} component={Paper} elevation={3}>
                        <Captain players={players} />
                    </Grid>
                </Box>   
            </Container>
        </React.Fragment>     
    )
}

export default Admin