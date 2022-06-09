import clsx from 'clsx'
import useStyles from '../theme/useStyle'
import { memo } from 'react'
import Licenses from '../components/Licenses/Licenses'

const LicensesPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homePageContainer, classes.mainPageMargin)}>
      <Licenses />
    </div>
  )
}

export default memo(LicensesPage)
