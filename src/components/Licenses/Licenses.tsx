import { Box, Tab, Tabs } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import LicensePanel from './LicensePanel'
import LicenseRequests from './LicenseRequests'
import useStyles from './LicenseStyles'

const allyProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Lisences: React.FC = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }, [])

  return (
    <Box>
      <Box className={classes.profileTabs}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="licenses requests" {...allyProps(0)} />
          <Tab label="Issued liscenses" {...allyProps(1)} />
        </Tabs>
      </Box>
      <LicensePanel value={value} index={0}>
        <LicenseRequests />
      </LicensePanel>
      <LicensePanel value={value} index={1}>
        {/* <PersonalData /> */}
        <></>
      </LicensePanel>
    </Box>
  )
}

export default memo(Lisences)
