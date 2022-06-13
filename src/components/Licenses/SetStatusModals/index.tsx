import { memo } from 'react'
import PaidStatus from './PaidStatus'
import Status from './Status'

const LicenseModals: React.FC = () => {
  return (
    <>
      <PaidStatus />
      <Status />
    </>
  )
}
export default memo(LicenseModals)
