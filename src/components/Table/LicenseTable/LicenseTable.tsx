import { useCallback, useState, memo, useEffect, useMemo } from 'react'
import { Table, TableContainer, Paper, TablePagination } from '@mui/material'
import EventsHeaders from './TableEventsHeaders'
import TableContent from './TableContent'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook'
import { ILicenses, LicenseCells, LicenseData } from '../../../types/globalTypes'
import moment from 'moment'
import { licenseActions } from '../../../store/saga-actions'

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
  id,
  fullName,
  dateOfIssuing,
  licenseType,
  status,
  payedStatus,
  button,
): LicenseData => {
  return { id, fullName, dateOfIssuing, licenseType, status, payedStatus, button }
}

const rowsEmpty = (rows, rowsPerPage, offset) => {
  const pageCount = Math.floor(rows.length / rowsPerPage)
  const empty = rowsPerPage * (pageCount + 1) - rows.length

  if (rows.length > rowsPerPage * pageCount && rows.length < rowsPerPage * (pageCount + 1)) {
    for (let i = 0; i < empty; i++) {
      rows.push(createData('', '', '', '', '', '', ''))
    }
  }
  for (let i = 0; i < offset; i++) {
    rows.unshift(createData('', '', '', '', '', '', ''))
  }

  return rows
}

const handleSetRows = (licenses, rowsPerPage, offset, setRows) => {
  setRows(
    rowsEmpty(
      licenses.map(license =>
        createData(
          license.id,
          license.fullNameLatin,
          moment(license.createdAt).format('DD-MM-YYYY'),
          license.license,
          license.status,
          license.paidStatus,
          '',
        ),
      ),
      rowsPerPage,
      offset,
    ),
  )
}

const LicenseTable: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [offset, setOffset] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: licenseActions.USER_GET_LICENSES,
      payload: { limit: rowsPerPage, offset },
    })
  }, [dispatch, rowsPerPage, offset])

  const licenses = useAppSelector<ILicenses[]>(state => state.license.licenses)
  const [rows, setRows] = useState([])

  useEffect(() => {
    handleSetRows(licenses, rowsPerPage, offset, setRows)
  }, [licenses, offset, rowsPerPage])

  const licensesCount = useAppSelector<number>(state => state.license.count)

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage)
      setOffset(newPage * rowsPerPage)
    },
    [rowsPerPage],
  )

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

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
        count={licensesCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default memo(LicenseTable)
