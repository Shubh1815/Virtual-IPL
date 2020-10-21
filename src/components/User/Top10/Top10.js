import React, { useState, useEffect, useContext } from 'react'

import DataTable from '../DataTable/DataTable'
import Context from '../../../Context/Context'


import axios from 'axios'

const Top10 = () => {
    let prevTop10 = []

    if(JSON.parse(localStorage.getItem("top10")) !== null)
        prevTop10 = JSON.parse(localStorage.getItem('top10'))
        
    const [ top10, setTop10 ] = useState(prevTop10)
    const { setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)
        axios.get('https://virtual-ipl-api.herokuapp.com/api/top10/')
        .then((response) => {
            const data = JSON.parse(response.data)
            console.log(data)
            setTop10(data.top10)
            setLoading(false)
            localStorage.setItem('top10', JSON.stringify(data.top10))
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }, [ setLoading ])

    const createRows = () => (
        top10.map((player, i) => (
            [i + 1, player.team, player.player_name, `${player.price} CR`]
        ))
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