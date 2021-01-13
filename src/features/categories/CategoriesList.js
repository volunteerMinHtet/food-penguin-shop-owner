import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'

import { Link as RouteLink } from 'react-router-dom'

import { fetchCategories, selectCategoryById, selectCategoryIds } from './categoriesSlice'

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

let CategoryExcerpt = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))

  return (
    <TableRow key={category.id}>
      <TableCell>{category.name}</TableCell>
    </TableRow>
  )
}

let FoodTable = ({ orderedCategoryIds }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderedCategoryIds.map((categoryId) => (
          <CategoryExcerpt key={categoryId} categoryId={categoryId} />
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
        {/* <Typography align="center" className={classes.loadingTypography}>
          
        </Typography> */}
      </Grid>
    </Grid>
  )
}

const CategoriesList = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const orderedCategoryIds = useSelector(selectCategoryIds)

  const categoryStatus = useSelector((state) => state.categories.status)
  const error = useSelector((state) => state.categories.error)

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [categoryStatus, dispatch])

  let content

  if (categoryStatus === 'successed') {
    content = <Loading />
    // } else if (categoryStatus === 'successed') {
    //   content = <FoodTable orderedCategoryIds={orderedCategoryIds} />
  } else if (categoryStatus === error) {
    content = <div>{error}</div>
  }

  return (
    <React.Fragment>
      <Title>Categories List</Title>

      {content}

      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more categories
        </Link>
      </div> */}
      <RouteLink to="/categories/add">
        <Button variant="contained">Add New Category</Button>
      </RouteLink>
      <RouteLink to="/foods">
        <Button variant="contained">Foods</Button>
      </RouteLink>
    </React.Fragment>
  )
}

export default CategoriesList
