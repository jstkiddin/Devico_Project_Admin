import { Toolbar, Typography, AppBar, Slide, useScrollTrigger } from '@mui/material'
import clsx from 'clsx'
import { memo } from 'react'
import { useNavbarStyles } from './style/useNavbarStyles'
import UserBarLoggedIn from './UserBarLoggedIn'

interface Props {
  children: React.ReactElement
}

const HideOnScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const NavBar = () => {
  const classes = useNavbarStyles()

  return (
    <HideOnScroll>
      <AppBar elevation={0} className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" component="div">
            <div className={clsx(classes.userBar, classes.flexCenter)}>
              <UserBarLoggedIn />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default memo(NavBar)
