import { createSlice } from '@reduxjs/toolkit'

interface SliceState {
  isAuth: boolean
  email?: string
  id?: string
  isEmailSend: boolean
  licenses: ILicenses[]
}

interface ILicenses {
  fullNameUK: string
  fullNameLat: string
  birthday: string
  nativeCity: string
  address: string
  identificationNum: string
  email: string
  phone: string
  status: string
  paidSatus: string
  licenseType: string
  user_id: number
}

const initialState: SliceState = {
  isAuth: false,
  email: '',
  id: '',
  isEmailSend: false,
  licenses: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.id = action.payload.id
    },

    removeUser(state) {
      state.email = ''
      state.id = ''
    },
    toggleAuth(state) {
      state.isAuth = true
    },
    unToggleAuth(state) {
      state.isAuth = false
    },
    toggleEmailSend(state) {
      state.isEmailSend = true
    },
    unToggleEmailSend(state) {
      state.isEmailSend = false
    },
  },
})

export const userSliceActions = userSlice.actions

export default userSlice
