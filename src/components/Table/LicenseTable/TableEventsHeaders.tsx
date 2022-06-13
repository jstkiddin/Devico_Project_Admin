import { FilterAlt } from '@mui/icons-material'
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material'
import { memo } from 'react'
import { LicenseCells } from '../../../types/globalTypes'

interface Props {
  columns: LicenseCells[]
}

const EventsHeaders: React.FC<Props> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={index}
            style={{
              backgroundColor: '#9470CE',
              color: '#fff',
              height: column.height,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              width: column.width,
              fontSize: 'calc(4px + 0.8vw)',
              textAlign: 'center',
            }}
          >
            {column.label}
            {column.id == 'button' ? null : (
              <IconButton sx={{ color: '#fff' }} aria-label="delete">
                <FilterAlt fontSize="small" />
              </IconButton>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default memo(EventsHeaders)
