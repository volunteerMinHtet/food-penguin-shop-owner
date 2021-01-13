import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { nanoid } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

import { addNewCategory } from './categoriesSlice'

import {
  makeStyles,
  Button,
  FormControl,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Tooltip,
} from '@material-ui/core'

import Title from '../title/Title'

const useStyles = makeStyles((theme) => ({
  root: { minWidth: 250 },
  contentBody: {
    marginTop: theme.spacing(2),
  },
  inputFormControl: {
    // margin: theme.spacing(1),
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

export const AddCategoryForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const canSave = [name].every(Boolean)

  const onNameChanged = (e) => setName(e.target.value)

  const onAddBtnClicked = async () => {
    await dispatch(addNewCategory({ id: nanoid(), name }))
  }

  return (
    <Box className={classes.root}>
      <Title>Category Form</Title>

      <Box className={classes.contentBody}>
        <form noValidate autoComplete="off">
          <Box>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                <FormControl variant="outlined" className={classes.inputFormControl}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={onNameChanged}
                    value={name}
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
              disabled={!canSave}
              onClick={onAddBtnClicked}
            >
              Add
            </Button>
          </FormControl>
        </form>
      </Box>

      <Link to="/foods">Back</Link>
    </Box>
  )
}

export default AddCategoryForm
