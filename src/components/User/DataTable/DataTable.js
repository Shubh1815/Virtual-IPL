import React from 'react'
import { Box, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import styles from '../../style'
import img from '../../../assets/batsmen.png'


const useStyle = makeStyles(styles)

const DataTable = (props) => {

    const { title, subtitle, rows, cols, width, maxWidth } = props
    const classes = useStyle()

    return (
        <Box maxWidth="md" className={classes.root} display='flex' justifyContent='center'>
            <TableContainer component={Paper} className={classes.table} style={{maxWidth: maxWidth}}>
                <div className={classes.tableTitle}>
                    <Typography component="div" variant="h4" className={classes.title}>{ title }</Typography>
                    { subtitle &&  <Typography component="div" variant="subtitle1" className={classes.title}>{ subtitle }</Typography> }
                </div>
                <Table>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            { cols.map((col, i) => (
                                <TableCell align="center" width={width[i]} key={i}>{ col }</TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((cell, j) => (
                                    <TableCell align="center" key={j}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                { !rows.length && <img className={classes.img} src={img} alt="batsmen"/> }
            </TableContainer>
        </Box>
    )
}

export default DataTable