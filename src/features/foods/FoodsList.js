import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'

import { Link as RouteLink } from 'react-router-dom'

import { selectFoodById, selectFoodIds } from './foodSlice'

import { fetchFoods } from './foodSlice'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Title from '../title/Title'
import PrimaryLoading from '../../components/loading/PrimaryLoading'

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles((theme) => ({
  loadingTypography: {
    padding: theme.spacing(2, 0),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

let FoodExcerpt = ({ foodId }) => {
  const food = useSelector((state) => selectFoodById(state, foodId))

  return (
    <TableRow key={food.id}>
      <TableCell>{food.name}</TableCell>
      <TableCell>{food.category_id}</TableCell>
      <TableCell align="right">{food.price}</TableCell>
    </TableRow>
  )
}

let FoodTable = ({ orderedFoodIds }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderedFoodIds.map((foodId) => (
          <FoodExcerpt key={foodId} foodId={foodId} />
        ))}
      </TableBody>
    </Table>
  )
}

let Loading = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <PrimaryLoading />
      </Grid>
    </Grid>
  )
}

const FoodsList = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const orderedFoodIds = useSelector(selectFoodIds)

  const foodStatus = useSelector((state) => state.foods.status)
  const error = useSelector((state) => state.foods.error)

  useEffect(() => {
    if (foodStatus === 'idle') {
      dispatch(fetchFoods())
    }
  }, [foodStatus, dispatch])

  let content

  if (foodStatus === 'loading') {
    content = <Loading />
  } else if (foodStatus === 'successed') {
    content = <FoodTable orderedFoodIds={orderedFoodIds} />
  } else if (foodStatus === error) {
    content = <div>{error}</div>
  }

  return (
    <React.Fragment>
      <Title>Foods List</Title>

      {content}

      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more foods
        </Link>
      </div> */}
      <RouteLink to="/foods/add">
        <Button variant="contained">Add New Food</Button>
      </RouteLink>
      <RouteLink to="/categories">
        <Button variant="contained">Category</Button>
      </RouteLink>
    </React.Fragment>
  )
}

export default FoodsList
