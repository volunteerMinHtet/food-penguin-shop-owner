import React, { useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'

import { nanoid } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'

import { addNewFood } from './foodSlice'

import {
  makeStyles,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core'

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

const AddFoodForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')

  const canSave = [name, category, price].every(Boolean)

  const onNameChanged = (e) => setName(e.target.value)
  const onCategoryChanged = (e) => setCategory(e.target.value)
  const onPriceChanged = (e) => setPrice(e.target.value)

  const onAddBtnClicked = async () => {
    await dispatch(addNewFood({ id: nanoid(), name, category, price }))
    console.log(`${name}, ${category}, ${price}`)
  }

  return (
    <Box className={classes.root}>
      <Title>Food Form</Title>

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

              <Grid item xs="auto">
                <FormControl variant="outlined" className={classes.inputFormControl}>
                  <InputLabel id="categoryLabel">Category</InputLabel>
                  <Select
                    labelId="categoryLabel"
                    id="category"
                    label="Category"
                    onChange={onCategoryChanged}
                    value={category}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1} className={classes.selectOption}>
                      Sea Food
                    </MenuItem>
                    <MenuItem value={2}>Chinese Food</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs="auto">
                <FormControl variant="outlined" className={classes.inputFormControl}>
                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    onChange={onPriceChanged}
                    value={price}
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

      <RouteLink to="/foods">
        <Button variant="contained">Back</Button>
      </RouteLink>
    </Box>
  )
}

export default AddFoodForm
