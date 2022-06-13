import * as React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material'

import { memo } from 'react'
import TableHeader from './TableHeader'
import { HeadCell, Data } from '../../types/globalTypes'
import { Mail } from '@mui/icons-material'
import useStyles from './TableStyles'

const height = 21

const createData = (
  name: string,
  phone: string,
  email: string,
  details: string,
  buttons: string,
): Data => {
  return {
    name,
    phone,
    email,
    details,
    buttons,
  }
}

const rows = [
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
  createData('Dmitry Novik', '775-015-1143', 'Novik15@gmail.com', '67', '4.3'),
]

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    height: height,
    minWidth: 5,
    maxWidth: 20,
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
    height: height,
    minWidth: 10,
    maxWidth: 50,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    height: height,
    minWidth: 10,
  },
  {
    id: 'details',
    numeric: true,
    disablePadding: false,
    label: 'Details',
    height: height,
    minWidth: 5,
    width: '20%',
    maxWidth: 30,
  },
  {
    id: 'buttons',
    numeric: true,
    disablePadding: false,
    label: '',
    minWidth: 5,
    width: '20%',
    maxWidth: 28,
  },
]

const DataTable: React.FC = () => {
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const classes = useStyles()

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer
          sx={{
            maxHeight: 500,
            tableLayout: 'auto',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">
                        <div className={classes.emailCell}>
                          <Mail color="primary" fontSize="small" />
                          {row.email}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <a href="/">{row.details}</a>
                      </TableCell>
                      <TableCell align="right">{row.buttons}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default memo(DataTable)
