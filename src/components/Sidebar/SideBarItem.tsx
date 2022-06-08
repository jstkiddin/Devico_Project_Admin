import { useState, useCallback, MouseEvent, memo } from 'react'
import useSideBarStyles from './SideBarStyles'
import { List, ListItem } from '@mui/material'
import { HashLink as Link } from 'react-router-hash-link'
import DynamicIcon from '../DynamicIcon'
import clsx from 'clsx'
import { sagaActions } from '../../store/saga-actions'
import { uiActions } from '../../store/ui-slice'
import { useAppDispatch } from '../../hooks/redux.hook'

const sagaButtons = [
  { id: 5, text: 'Change Password', icon: 'LockOpen' },
  {
    id: 6,
    text: 'Sign Out',
    icon: 'Logout',
  },
]

const scrollWithOffset = el => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -60
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
}

const SideBarItem: React.FC = () => {
  const classes = useSideBarStyles()
  const dispatch = useAppDispatch()

  const [list_item, setState] = useState({
    activeButton: {},
    objects: [
      {
        id: 0,
        text: 'News',
        icon: 'Article',
        path: '/news',
      },
      {
        id: 1,
        text: 'Events',
        icon: 'PhotoCamera',
        path: '/events',
      },
      {
        id: 2,
        text: 'Issuance of licenses',
        icon: 'ArtTrack',
        path: '/licenses',
      },
      {
        id: 3,
        text: 'List of the users',
        icon: 'Groups',
        path: '/users',
      },
      {
        id: 4,
        text: 'List of the admins',
        icon: 'SupervisorAccount',
        path: '/admin-users',
      },
    ],
  })

  const toggleSagaButton = useCallback(
    (e: MouseEvent) => {
      const target = e.currentTarget as HTMLLIElement
      const ariaLabel = target.ariaLabel as string
      switch (ariaLabel) {
        case '5':
          dispatch(uiActions.toggleCreateNewPassword())
          break
        case '6':
          dispatch({ type: sagaActions.USER_LOGOUT_SAGA })
          break
      }
    },
    [dispatch],
  )

  const toggleButton = useCallback(
    (e: MouseEvent) => {
      const target = e.currentTarget as HTMLLIElement
      const ariaLabel = target.ariaLabel as string
      setState({ ...list_item, activeButton: list_item.objects[parseInt(ariaLabel)] })
    },
    [list_item],
  )

  const toggleActiveClass = useCallback(
    (index: number) => {
      return list_item.objects[index] === list_item.activeButton ? classes.active : classes.inactive
    },
    [list_item],
  )

  return (
    <div>
      <List className={classes.responsiveList}>
        {list_item.objects.map(item => (
          <Link
            key={item.id}
            to={item.path}
            smooth
            scroll={scrollWithOffset}
            aria-label={item.id.toString()}
            className={classes.link}
            onClick={toggleButton}
          >
            <ListItem
              className={clsx(toggleActiveClass(item.id), classes.item, classes.flexCenter)}
              id={item.text}
            >
              <div className={classes.iconAlign}>
                <DynamicIcon iconName={item.icon} className="" />
              </div>
              <span className={classes.text}>{item.text}</span>
            </ListItem>
          </Link>
        ))}

        <div className={classes.sagaButtons}>
          {sagaButtons.map(item => (
            <div
              onClick={toggleSagaButton}
              aria-label={item.id.toString()}
              className={classes.sagaButtonsContainer}
            >
              <ListItem
                className={clsx(toggleActiveClass(item.id), classes.item, classes.flexCenter)}
                id={item.text}
              >
                <div className={classes.iconAlign}>
                  <DynamicIcon iconName={item.icon} className="" />
                </div>
                <span className={classes.text}>{item.text}</span>
              </ListItem>
            </div>
          ))}
        </div>
      </List>
    </div>
  )
}

export default memo(SideBarItem)
