import { memo } from 'react'
import LicenseTable from '../Table/LicenseTable/LicenseTable'

const LicenseRequests: React.FC = () => {
  return (
    <div>
      <LicenseTable />
    </div>
  )
}
export default memo(LicenseRequests)
