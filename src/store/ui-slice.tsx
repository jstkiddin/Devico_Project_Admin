import { createSlice } from '@reduxjs/toolkit'

interface SliceState {
  showReg: boolean
  showCreateNewPassword: boolean
  congratAuth: boolean
  showSetPaidStatus: boolean
  showSetUserStatus: boolean
}

const initialState: SliceState = {
  showReg: false,
  showCreateNewPassword: true,
  congratAuth: false,
  showSetPaidStatus: false,
  showSetUserStatus: false,
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
    toggleShowSetUserStatus(state) {
      state.showSetUserStatus = !state.showSetUserStatus
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
