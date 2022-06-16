import { createSlice } from '@reduxjs/toolkit'
import { ILicenses } from '../types/globalTypes'

interface SliceState {
  licenses: ILicenses[]
  licenseId: string
  count: number
}

const initialState: SliceState = {
  licenses: [],
  licenseId: '',
  count: 0,
}

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicenses(state, action) {
      state.licenses = action.payload.licenses
    },
    setLicenseId(state, action) {
      state.licenseId = action.payload
    },
    setLicensesCount(state, action) {
      state.count = action.payload.count
    },
  },
})

export const licenseSliceActions = licenseSlice.actions

export default licenseSlice
