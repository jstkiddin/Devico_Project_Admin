import { memo, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../hooks/redux.hook'
import {
  TextField,
  Grid,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Divider,
} from '@mui/material'
import { MyTypography, RegisterButton, styledDiv, SignInBox } from './AuthStyles'
import { useAuthStyles } from './useAuthStyles'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { signInData } from './formikAuth'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const classes = useAuthStyles()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = useCallback(
    async (values: object, { resetForm }) => {
      dispatch({ type: signInData.onSubmitType, payload: { ...values, userRole: 'admin' } })
      setTimeout(() => navigate('/'), 450)
      resetForm()
    },
    [dispatch, navigate],
  )

  const formik = useFormik({
    initialValues: signInData.initialValues,
    validationSchema: signInData.validationSchema,
    onSubmit,
  })

  const handleClickShowPassword = useCallback(() => {
    return setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <Box className={classes.boxContainer} component="form" onSubmit={formik.handleSubmit}>
      <SignInBox>
        <Typography component="h1" variant="h5" className={classes.flexCenter}>
          <p className={classes.titleTypo}> Sign In </p>
        </Typography>
        <div className={classes.divider}>
          <Divider />
        </div>
        <Grid item xs={12}>
          <MyTypography>EMAIL*</MyTypography>
          <TextField
            fullWidth
            error={formik.errors.email && formik.touched.email ? true : false}
            id="email"
            name="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className={classes.errorMessege}>
            {formik.errors.email && formik.touched.email ? (
              <div style={styledDiv}>{formik.errors.email}</div>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <MyTypography>PASSWORD*</MyTypography>
          <OutlinedInput
            fullWidth
            error={formik.errors.password && formik.touched.password ? true : false}
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <div className={classes.errorMessege}>
            {formik.errors.password && formik.touched.password ? (
              <div style={styledDiv}>{formik.errors.password}</div>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <MyTypography>GOOGLE AUTHENTICATOR CODE*</MyTypography>
          <TextField
            fullWidth
            error={formik.errors.googleAuthCode && formik.touched.googleAuthCode ? true : false}
            id="googleAuthCode"
            name="googleAuthCode"
            size="small"
            value={formik.values.googleAuthCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className={classes.errorMessege}>
            {formik.errors.googleAuthCode && formik.touched.googleAuthCode ? (
              <div style={styledDiv}>{formik.errors.googleAuthCode}</div>
            ) : null}
          </div>
        </Grid>
        <RegisterButton type="submit" fullWidth variant="contained">
          Sign In
        </RegisterButton>
      </SignInBox>
    </Box>
  )
}

export default memo(SignIn)
