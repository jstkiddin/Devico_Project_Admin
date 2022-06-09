import { MoreVert } from '@mui/icons-material'
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import { memo } from 'react'
import { LicenseCells, LicenseData } from '../../../types/globalTypes'

interface Props {
  columns: LicenseCells[]
  rows: LicenseData[]
  page: number
  rowsPerPage: number
}

const TableContent: React.FC<Props> = ({ columns, rows, page, rowsPerPage }) => {
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
              {row.payedStatus}
            </TableCell>
            <TableCell
              style={{
                fontSize: 'calc(4px + 0.8vw)',
              }}
            >
              <IconButton aria-label="delete">
                <MoreVert />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default memo(TableContent)
