import React, { useState, useEffect, useContext } from 'react'
import CopyrightIcon from '@material-ui/icons/Copyright'
import DataTable from '../DataTable/DataTable'
import Context from '../../../Context/Context'

import axios from 'axios'

const Team = (props) => {

    const { setLoading } = useContext(Context)

    const team_no = props.match.params.id
    const [ state, setState ] = useState({
        'team': {
            'team_no': '',
            'budget': '',
            'captain_name': '',
            'captain_rating' : ''
        },
        'players': [],  
    })

    useEffect(() => {
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/api/team/${team_no}/`)
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

    const createRows = () => (
        state.players.map((player, i) => (
            [
                i + 1, 
                 <React.Fragment>
                    {player.player_name} {(player.player_name === state.team.captain_name ? <CopyrightIcon style={{verticalAlign: 'middle'}}/> : '')} 
                 </React.Fragment>, 
                player.player_type, 
                `${player.price} CR`
            ]
        ))
    )

    return (
        <DataTable 
            title={`Team ${state.team.team_no}`}
            subtitle={`Budget: ${state.team.budget} CR`}
            rows={createRows()} 
            cols={[
                'Sr No.', 
                'Player Name',
                'Type',
                'Price (Crores)'
            ]}
            width={['10%', '40%', '25%', '25%']} 
            maxWidth="764px"
        />
    )
}

export default Team