import React, { useState, useEffect, useContext } from 'react'

import DataTable from '../DataTable/DataTable'
import Context from '../../../Context/Context'


import axios from 'axios'

const Top10 = () => {
    
    const [ top10, setTop10 ] = useState([])
    const { setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/top10/')
        .then((response) => {
            console.log(response.data)
            setTop10(response.data.top10)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }, [ setLoading ])

    const createRows = () => (
        top10.map((player, i) => {
            player = JSON.parse(player)
            return [i + 1, player.team, player.player_name, `${player.price} CR`]
        })
    )

    return (
        <DataTable
            title="TOP 10"
            cols={[
                'Sr No.',
                'Team No.',
                'Player Name',
                'Price (CR)'
            ]}
            rows={createRows()}
            width={['10%', '20%', '40%', '30%']}
            maxWidth="992px"
        />
    )
}

export default Top10