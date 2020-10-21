import React, { useState, useEffect, useContext } from 'react'

import DataTable from '../DataTable/DataTable'
import Context from '../../../Context/Context'

import axios from 'axios'

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

    const createRows = () => (
        state.players.map((player, i) => (
            [i + 1, player.player_name, player.player_type, `${player.price} CR`]
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