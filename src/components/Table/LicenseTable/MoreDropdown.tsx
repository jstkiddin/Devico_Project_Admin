import { MenuItem } from '@mui/material'
import { memo, useCallback } from 'react'
import { useAppDispatch } from '../../../hooks/redux.hook'
import { uiActions } from '../../../store/ui-slice'
import useStyles from '../TableStyles'

const MoreDropdown: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handlePayedStatusClick = useCallback(() => {
    dispatch(uiActions.toggleShowSetPaidStatus())
  }, [dispatch])

  const handleUSerStatusClick = useCallback(() => {
    dispatch(uiActions.toggleShowSetUserStatus())
  }, [dispatch])
  return (
    <div>
      <MenuItem
        component="button"
        className={classes.moreDropdownButtons}
        onClick={handlePayedStatusClick}
      >
        Set Payed Status
      </MenuItem>
      <MenuItem
        component="button"
        className={classes.moreDropdownButtons}
        onClick={handleUSerStatusClick}
      >
        Set Status
      </MenuItem>
      <MenuItem component="button" className={classes.moreDropdownButtons}>
        <span>View</span>
      </MenuItem>
    </div>
  )
}

export default memo(MoreDropdown)
