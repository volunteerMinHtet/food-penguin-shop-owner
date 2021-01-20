import React, { useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { makeStyles, Button, FormControl, TextField, Grid, Box } from '@material-ui/core'

import { userLogin } from './userSlice'

import Title from '../title/Title'

const useStyles = makeStyles((theme) => ({
  root: { minWidth: 250 },
  contentBody: {
    marginTop: theme.spacing(2),
  },
  inputFormControl: {
    width: 250,
  },
  btnFormControl: {
    margin: theme.spacing(2, 0),
    width: 150,
  },
  selectOption: {
    maxWidth: 250,
  },
}))

const UserLoginForm = () => {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const canLogin = [email, password].every(Boolean)

  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const onLoginBtnClicked = async () => {
    await dispatch(userLogin({ email, password }))
  }

  return (
    <Box className={classes.root}>
      <Title>Login</Title>

      <Box className={classes.contentBody}>
        <form noValidate autoComplete="off">
          <Box>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                <FormControl variant="outlined" className={classes.inputFormControl}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={onEmailChanged}
                    value={email}
                  />
                </FormControl>
              </Grid>

              <Grid item xs="auto">
                <FormControl variant="outlined" className={classes.inputFormControl}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={onPasswordChanged}
                    value={password}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <FormControl variant="outlined" className={classes.btnFormControl}>
            <Button
              color="primary"
              variant="contained"
              type="button"
              disabled={!canLogin}
              onClick={onLoginBtnClicked}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>

      <RouteLink to="/">
        <Button variant="contained">Back</Button>
      </RouteLink>
    </Box>
  )
}

export default UserLoginForm
