import { Info } from '@mui/icons-material'
import { Box, FormControl, Grid, MenuItem } from '@mui/material'
import clsx from 'clsx'
import { memo, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook'
import { licenseActions, notificationsActions } from '../../../store/saga-actions'
import { uiActions } from '../../../store/ui-slice'
import { ILicenses } from '../../../types/globalTypes'
import { OutlinedRegButton, RegisterButton } from '../../Auth/AuthStyles'
import { useAuthStyles } from '../../Auth/useAuthStyles'
import ModalContainer from '../../Modal/ModalContainer'
import useStyles, { StyledSelectField } from '../LicenseStyles'

const PaidStatus: React.FC = () => {
  const licenseId = useAppSelector<string>(state => state.license.licenseId)
  const licenseList = useAppSelector<ILicenses[]>(state => state.license.licenses)
  const license = licenseList.filter(license => license.id === licenseId)

  const [status, setStatus] = useState<string>(license[0]?.paidStatus)
  const dispatch = useAppDispatch()
  const classes = useAuthStyles()
  const licenseClasses = useStyles()

  const showStatusModal = useAppSelector<boolean>(state => state.ui.showSetPaidStatus)

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value as string)
  }, [])

  const handleSubmit = useCallback(() => {
    dispatch({ type: licenseActions.LICENSE_CHAGE_PAID_STATUS, payload: { licenseId, status } })
    const color = () => {
      if (status === 'Paid') {
        return { backgroundColor: 'rgba(80, 158, 47, 0.2)', height: 50 }
      }
      return { backgroundColor: 'rgba(238, 2, 2, 0.2)', height: 50 }
    }

    dispatch({
      type: notificationsActions.ADD_NOTIFICATION,
      payload: {
        text: `Your license's paid status was changed to "${status}"`,
        color,
        user_id: license[0].user_id,
      },
    })
  }, [dispatch, licenseId, status])

  const handleCancel = useCallback(() => {
    dispatch(uiActions.toggleShowSetPaidStatus())
  }, [dispatch])

  return (
    <ModalContainer
      dispatchAction={uiActions.toggleShowSetPaidStatus()}
      cartIsShown={showStatusModal}
    >
      <Box component="form" className={licenseClasses.box}>
        <div className={licenseClasses.container}>
          <div className={licenseClasses.textBlock}>
            <div className={licenseClasses.icon}>
              <Info fontSize="inherit" />
            </div>
            <div className={licenseClasses.title}>Set Payed Status</div>
            <div className={licenseClasses.text}>
              This will set a new status for this attendee and may trigger new actions based on your
              selection
            </div>
          </div>
          <div className={clsx(classes.flexCenter, classes.mobileView)}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <StyledSelectField
                    value={status}
                    name="car"
                    required
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={'Paid'}>Paid</MenuItem>
                    <MenuItem value={'No paid'}>No Paid</MenuItem>
                  </StyledSelectField>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className={licenseClasses.modalButtons}>
            <OutlinedRegButton variant="outlined" onClick={handleCancel}>
              Cancel
            </OutlinedRegButton>
            <RegisterButton variant="contained" onClick={handleSubmit}>
              Set status
            </RegisterButton>
          </div>
        </div>
      </Box>
    </ModalContainer>
  )
}

export default memo(PaidStatus)
