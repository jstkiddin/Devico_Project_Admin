import { memo } from 'react'
import SignIn from '../components/Auth/SignIn'
import useStyles from '../theme/useStyle'

const SignInPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.signInPage}>
      <div className={classes.signInPageContainer}>
        <SignIn />
      </div>
    </div>
  )
}

export default memo(SignInPage)
