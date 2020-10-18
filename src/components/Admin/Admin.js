import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { Typography, TextField, Button } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'

import SportsCricketIcon from '@material-ui/icons/SportsCricket'

import Navbar from './Navbar/Navbar'

import axios from 'axios'

const useStyle = makeStyles({
    root: {
        'min-height': 'calc(100vh)',
    },
    form: {
        'width': '500px',
        'background': 'white',
        'padding': '15px',
        'border-radius': '10px',
    },
    button:{
        float:'right',
    }
})

const Admin = () => {
    const [ players, setPlayers ] = useState([])
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)

    const [ team, setTeam ] = useState('')
    const [ player, setPlayer ] = useState(null)
    const [ price, setPrice ] = useState('')

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
            
            axios.put(`http://127.0.0.1:8000/api/player/${data.id}/`, data, {
                'headers': {
                    'Authorization': `Token ${token}`,
                }
            })
            .then((response) => {
                console.log(response.data)
                setSuccess("Player Added")
            })
            .catch((err) => {
                setError(err.response.data.error)
            })
        } else {
            setError("Please fill all inputs")
        }
    }

    return (
        <React.Fragment>
            <Navbar>
                <Button component={Link} to="/leaderboard" variant="contained" size="small" >Leaderboard</Button>
            </Navbar>
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
                    </Grid>

                </Grid>
            </Box>   
        </React.Fragment>     
    )
}

export default Admin