import { useCallback, useState, memo } from 'react'
import { Table, TableContainer, Paper, TablePagination } from '@mui/material'
import EventsHeaders from './TableEventsHeaders'
import TableContent from './TableContent'
import { useAppSelector } from '../../../hooks/redux.hook'
import { EventData, LicenseCells, LicenseData } from '../../../types/globalTypes'
import moment from 'moment'

const height = 21

const columns: LicenseCells[] = [
  {
    id: 'fullName',
    label: 'Full Name',
    height: height,
    minWidth: 5,
    maxWidth: 20,
  },
  {
    id: 'dateOfIssuing',
    label: 'Date of the issuing',
    height: height,
    minWidth: 90,
    maxWidth: 90,
  },
  {
    id: 'licenseType',
    label: 'License type',
    height: height,
    minWidth: 10,
  },
  {
    id: 'status',
    label: 'Status',
    height: height,
    minWidth: 5,
    width: '20%',
    maxWidth: 30,
  },
  {
    id: 'payedStatus',
    label: 'Payed status',
    height: height,
    minWidth: 5,
    width: 140,
  },
  {
    id: 'button',
    label: '',
    height: height,
    minWidth: 5,
    width: 5,
    maxWidth: 28,
  },
]

const createData = (
  fullName,
  dateOfIssuing,
  licenseType,
  status,
  payedStatus,
  button,
): LicenseData => {
  return { fullName, dateOfIssuing, licenseType, status, payedStatus, button }
}

const rows = [
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested', 'Paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested-modifications', 'No paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Declined', 'Paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested', 'No paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested-modifications', 'Paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Declined', 'No paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested', 'Paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Requested-modifications', 'No paid', ''),
  createData('Dmitry Novik', '15.12.2021', 'D1 2000 UAH', 'Declined', 'Paid', ''),
]

const rowsEmpty = rows => {
  const pageCount = Math.floor(rows.length / 6)
  const empty = 6 * (pageCount + 1) - rows.length
  if (rows.length > 6 * pageCount && rows.length < 6 * (pageCount + 1)) {
    for (let i = 0; i < empty; i++) {
      rows.push(createData('', ' ', '  ', '  ', '  ', ''))
    }
  }

  return rows
}

const LicenseTable: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const events = useAppSelector<EventData>(state => state.event.events)

  // const rows = rowsEmpty(
  //   events.map(event =>
  //     createData(
  //       moment(event.date).format('DD.MM').toString(),
  //       event.discipline,
  //       event.series,
  //       event.title,
  //       event.place,
  //     ),
  //   ),
  // )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const pageCount = useCallback(() => {
    if (rows.length % rowsPerPage !== 0) {
      return Math.floor(1 + rows.length / 6)
    }
    return Math.floor(rows.length / 6)
  }, [rows])

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer
        sx={{
          maxHeight: 500,
          tableLayout: 'auto',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <EventsHeaders columns={columns} />
          <TableContent columns={columns} rows={rows} page={page} rowsPerPage={rowsPerPage} />
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
  )
}

export default memo(LicenseTable)
