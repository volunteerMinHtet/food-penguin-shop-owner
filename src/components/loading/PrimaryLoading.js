import React from 'react'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function PrimaryLoading() {
  return (
    <Box display="flex" alignContent="center">
      <CircularProgress />
    </Box>
  )
}
