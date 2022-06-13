import { createSlice } from '@reduxjs/toolkit'
import { ILicenses } from '../types/globalTypes'

interface SliceState {
  licenses: ILicenses[]
  licenseId: string
}

const initialState: SliceState = {
  licenses: [],
  licenseId: '',
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
  },
})

export const licenseSliceActions = licenseSlice.actions

export default licenseSlice
