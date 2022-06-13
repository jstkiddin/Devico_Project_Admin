import React, { memo } from 'react'
import { TableCell, TableHead, TableRow, Checkbox, Toolbar } from '@mui/material'
import { HeadCell } from '../../types/globalTypes'
import useStyles from './TableStyles'

interface Props {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
  headCells: readonly HeadCell[]
}

enum cellType {
  name = 'name',
  phone = 'phone',
}

const TableHeader: React.FC<Props> = props => {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props
  const classes = useStyles()
  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          style={{
            backgroundColor: '#9470CE',
          }}
        >
          <Checkbox
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#fff',
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {numSelected > 0
          ? headCells.map(headCell => (
              <TableCell
                style={{
                  backgroundColor: '#9470CE',
                  color: '#fff',
                  fontSize: 'calc(4px + 0.8vw)',
                  height: headCell.height,
                  width: headCell.width,
                }}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                {headCell.id === cellType.name ? `${numSelected} selected` : null}
              </TableCell>
            ))
          : headCells.map(headCell => (
              <TableCell
                style={{
                  backgroundColor: '#9470CE',
                  color: '#fff',
                  fontSize: 'calc(4px + 0.8vw)',
                  height: headCell.height,
                  minWidth: headCell.minWidth,
                  maxWidth: headCell.maxWidth,
                  width: headCell.width,
                }}
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
                {headCell.label}
              </TableCell>
            ))}
      </TableRow>
    </TableHead>
  )
}

export default memo(TableHeader)
