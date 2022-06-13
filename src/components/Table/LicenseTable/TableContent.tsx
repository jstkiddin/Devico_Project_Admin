import { MoreVert } from '@mui/icons-material'
import { TableBody, TableCell, TableRow } from '@mui/material'
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

enum PaidStatus {
  paid = 'paid',
  paidID = 'Paid',
  noPaid = 'no-paid',
}
enum LicenseStatus {
  requestedModifications = 'Requested modification',
  reqModifID = 'Requested-modification',
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
                textAlign: 'start',
              }}
            >
              {row.fullName}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
                textAlign: 'center',
              }}
            >
              {row.dateOfIssuing}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
                textAlign: 'center',
              }}
            >
              {row.licenseType}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
                textAlign: 'center',
              }}
            >
              <div
                id={
                  row.status === LicenseStatus.requestedModifications
                    ? LicenseStatus.reqModifID
                    : row.status
                }
                className={clsx(classes.status, classes.flexCenter)}
              >
                {row.status}
              </div>
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              <div className={classes.flexCenter}>
                <div
                  id={
                    row.payedStatus.length > 0
                      ? row.payedStatus === PaidStatus.paidID
                        ? PaidStatus.paid
                        : PaidStatus.noPaid
                      : ''
                  }
                  className={clsx(classes.payedStatus, classes.flexCenter)}
                >
                  {row.payedStatus}
                </div>
              </div>
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              <UserBarButtons
                menuClass={classes.dropdown}
                popperClassName={classes.popper}
                buttonClass={clsx(classes.tableButton, classes.userBarInner, classes.flexCenter)}
                buttonType="icon"
                popperPosition
              >
                <MoreVert />
                <MoreDropdown licenseId={row.id} />
              </UserBarButtons>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default memo(TableContent)
