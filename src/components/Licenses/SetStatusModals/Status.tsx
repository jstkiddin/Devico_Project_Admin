import { Info } from '@mui/icons-material'
import { Box, FormControl, Grid, MenuItem } from '@mui/material'
import clsx from 'clsx'
import { memo, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook'
import { uiActions } from '../../../store/ui-slice'
import { OutlinedRegButton, RegisterButton } from '../../Auth/AuthStyles'
import { useAuthStyles } from '../../Auth/useAuthStyles'
import ModalContainer from '../../Modal/ModalContainer'
import useStyles, { StyledSelectField } from '../LicenseStyles'

const Status: React.FC = () => {
  const [status, setStatus] = useState<string>('Paid')
  const dispatch = useAppDispatch()
  const classes = useAuthStyles()
  const licenseClasses = useStyles()

  const showStatusModal = useAppSelector<boolean>(state => state.ui.showSetUserStatus)

  const handleStatusChange = useCallback(
    e => {
      setStatus(e.target.value as string)
    },
    [status],
  )

  const handleSubmit = useCallback(() => {
    // dispatch()
  }, [])
  const handleCancel = useCallback(() => {
    dispatch(uiActions.toggleShowSetUserStatus())
  }, [dispatch])

  return (
    <ModalContainer
      dispatchAction={uiActions.toggleShowSetUserStatus()}
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
