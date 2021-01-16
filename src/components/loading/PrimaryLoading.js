import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0),
  },
}))

export default function PrimaryLoading() {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <CircularProgress />
    </Box>
  )
}
