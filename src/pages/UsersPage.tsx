import clsx from 'clsx'
import { memo } from 'react'
import DataTable from '../components/Table/DataTable'
import useStyles from '../theme/useStyle'

const UsersPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homePageContainer, classes.mainPageMargin)}>
      {/* buttons */}
      <DataTable />
    </div>
  )
}

export default memo(UsersPage)
