import { Button } from '@mui/material'
import clsx from 'clsx'
import { memo } from 'react'
import DataTable from '../components/Table/DataTable'
import useStyles from '../theme/useStyle'

const UsersPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homePageContainer, classes.mainPageMargin)}>
      {/* <div className={classes.buttons}>
        <Button variant="contained" onClick={toggleLogHandler}>
          Sign in
        </Button>
        <Button variant="outlined" onClick={toggleRegHandler}>
          Sign up
        </Button>
      </div> */}
      {/* buttons */}
      <DataTable />
    </div>
  )
}

export default memo(UsersPage)
