import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  emailCell: {
    display: 'flex',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    width: 150,
    right: 45,
    top: 10,
    color: '#8F8F8F',
  },
  popper: {
    position: 'relative',
    width: '100%',
    zIndex: 3,
  },
  moreDropdownButtons: {
    width: 150,
    height: 48,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#dbd3de',
      color: '#000',
    },
  },
  tableButton: {
    cursor: 'pointer',
  },
  userBarInner: {
    width: 60,
    height: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  payedStatus: {
    height: 30,
    width: 81,
    borderRadius: '20px',
    '&#paid': {
      backgroundColor: 'rgba(80, 158, 47, 0.1)',
      color: '#509E2F',
    },
    '&#no-paid': {
      backgroundColor: 'rgba(238, 2, 2, 0.1)',
      color: '#ee0202',
    },
  },
}))
export default useStyles
