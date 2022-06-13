import { Info } from '@mui/icons-material'
import { Box, FormControl, Grid, MenuItem } from '@mui/material'
import clsx from 'clsx'
import { memo, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook'
import { licenseActions } from '../../../store/saga-actions'
import { uiActions } from '../../../store/ui-slice'
import { ILicenses } from '../../../types/globalTypes'
import { OutlinedRegButton, RegisterButton } from '../../Auth/AuthStyles'
import { useAuthStyles } from '../../Auth/useAuthStyles'
import ModalContainer from '../../Modal/ModalContainer'
import useStyles, { StyledSelectField } from '../LicenseStyles'

const Status: React.FC = () => {
  const licenseId = useAppSelector<string>(state => state.license.licenseId)
  const licenseList = useAppSelector<ILicenses[]>(state => state.license.licenses)
  const license = licenseList.filter(license => license.id === licenseId)

  const [status, setStatus] = useState<string>(license[0]?.status)
  const dispatch = useAppDispatch()
  const classes = useAuthStyles()
  const licenseClasses = useStyles()

  const showStatusModal = useAppSelector<boolean>(state => state.ui.showSetLicenseStatus)

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value as string)
  }, [])

  const handleSubmit = useCallback(() => {
    dispatch({ type: licenseActions.CHAGE_LICENSE_STATUS, payload: { licenseId, status } })
  }, [dispatch, licenseId, status])

  const handleCancel = useCallback(() => {
    dispatch(uiActions.toggleShowSetLicenseStatus())
  }, [dispatch])

  return (
    <ModalContainer
      dispatchAction={uiActions.toggleShowSetLicenseStatus()}
      cartIsShown={showStatusModal}
    >
      <Box component="form" className={licenseClasses.box}>
        <div className={licenseClasses.container}>
          <div className={licenseClasses.textBlock}>
            <div className={licenseClasses.icon}>
              <Info fontSize="inherit" />
            </div>
            <div className={licenseClasses.title}>Set Attendee Status</div>
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
                    <MenuItem value={'Requested'}>Requested</MenuItem>
                    <MenuItem value={'Requested modification'}>Requested modification</MenuItem>
                    <MenuItem value={'Declined'}>Declined</MenuItem>
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

export default memo(Status)
