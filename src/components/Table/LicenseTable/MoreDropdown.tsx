import { MenuItem } from '@mui/material'
import { memo, useCallback } from 'react'
import { useAppDispatch } from '../../../hooks/redux.hook'
import { licenseSliceActions } from '../../../store/license-slice'
import { uiActions } from '../../../store/ui-slice'
import useStyles from '../TableStyles'

interface Props {
  licenseId: string
}

const MoreDropdown: React.FC<Props> = ({ licenseId }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  dispatch(licenseSliceActions.setLicenseId(licenseId))

  const handlePayedStatusClick = useCallback(() => {
    dispatch(uiActions.toggleShowSetPaidStatus())
  }, [dispatch])

  const handleUSerStatusClick = useCallback(() => {
    dispatch(uiActions.toggleShowSetLicenseStatus())
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
