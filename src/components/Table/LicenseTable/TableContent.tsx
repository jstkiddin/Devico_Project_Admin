import { MoreVert } from '@mui/icons-material'
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import clsx from 'clsx'
import { memo } from 'react'
import { LicenseCells, LicenseData } from '../../../types/globalTypes'
import UserBarButtons from '../../NavBar/dropdown/userBarButtons'
import useStyles from '../TableStyles'
import MoreDropdown from './MoreDropdown'

interface Props {
  columns: LicenseCells[]
  rows: LicenseData[]
  page: number
  rowsPerPage: number
}

const TableContent: React.FC<Props> = ({ columns, rows, page, rowsPerPage }) => {
  const classes = useStyles()
  return (
    <TableBody>
      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
        return (
          <TableRow hover role="checkbox" tabIndex={0} key={index}>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              {row.fullName}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              {row.dateOfIssuing}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              {row.licenseType}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              {row.status}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              <div
                id={row.payedStatus == 'Paid' ? 'paid' : 'no-paid'}
                className={clsx(classes.payedStatus, classes.flexCenter)}
              >
                {row.payedStatus}
              </div>
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
                position: 'relative',
              }}
            >
              <UserBarButtons
                menuClass={classes.dropdown}
                popperClassName={classes.popper}
                buttonClass={clsx(classes.tableButton, classes.userBarInner, classes.flexCenter)}
                buttonType="icon"
                popperPosition={true}
              >
                <MoreVert />
                <MoreDropdown />
              </UserBarButtons>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default memo(TableContent)
