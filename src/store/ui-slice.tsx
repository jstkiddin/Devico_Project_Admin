import { createSlice } from '@reduxjs/toolkit'

interface SliceState {
  showReg: boolean
  showCreateNewPassword: boolean
  congratAuth: boolean
  showSetPaidStatus: boolean
  showSetLicenseStatus: boolean
}

const initialState: SliceState = {
  showReg: false,
  showCreateNewPassword: true,
  congratAuth: false,
  showSetPaidStatus: false,
  showSetLicenseStatus: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleReg(state) {
      state.showReg = !state.showReg
    },
    toggleCreateNewPassword(state) {
      state.showCreateNewPassword = !state.showCreateNewPassword
    },
    toggleCongratAuth(state) {
      state.congratAuth = !state.congratAuth
    },
    toggleShowSetPaidStatus(state) {
      state.showSetPaidStatus = !state.showSetPaidStatus
    },
    toggleShowSetLicenseStatus(state) {
      state.showSetLicenseStatus = !state.showSetLicenseStatus
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
