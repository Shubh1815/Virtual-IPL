import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Typography, TextField, Button } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'

import axios from 'axios'

const Captain = ({ players }) => {

    const [ team, setTeam ] = useState('')
    const [ captain, setCaptain] = useState(null)

    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')

    const [ teamPlayers, setTeamPlayers ] = useState([])

    const handleTeam = (event) => {
        setSuccess('')
        setError('')
        setTeam(event.target.value)
        if (event.target.value){
            setTeamPlayers(players.filter((player) => (
                player.team === Number(event.target.value)
            )))
        }
    }

    const handleCaptain = (event, value) => {
        setSuccess('')
        setError('')
        setCaptain(value)
    }

    const handleSubmit = () => {
        if(team && captain){
            axios.put(`https://virtual-ipl-api.herokuapp.com/api/team/${team}/`, {
                "captain_name": captain.player_name,
                "captain_rating": captain.player_rating
            })
            .then((response) => {
                setSuccess('Added Captain')
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            setError('Fill all fields')
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
            <Typography component="div" variant="h4"> Captain </Typography>
            { error ? (<Alert severity="error">{error}</Alert>): null} 
            { success ? (<Alert severity="success">{success}</Alert>): null} 
            </Grid>

            <Grid item xs={12}>
                <TextField 
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
                    onChange={handleCaptain}
                    options={teamPlayers}
                    renderInput={(params) => <TextField {...params} label="Player Name" variant="outlined" required />}
                    value={captain}  
                    disabled={!team}
                />
            </Grid>

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" style={{float: 'right'}} onClick={handleSubmit}>Submit</Button>
            </Grid>

        </React.Fragment>
    )
}

export default Captain