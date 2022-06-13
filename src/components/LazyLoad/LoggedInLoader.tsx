import { CircularProgress } from '@mui/material'
import clsx from 'clsx'
import { memo } from 'react'
import useStyles from '../../theme/useStyle'

const LoggedInLoader: React.FC = () => {
  const classes = useStyles()
  return <div className={clsx(classes.loader, classes.flexCenter)}>Loading...</div>
}
export default memo(LoggedInLoader)
