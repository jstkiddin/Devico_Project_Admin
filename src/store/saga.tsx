import { call, takeEvery, put, Effect } from 'redux-saga/effects'
import { userSliceActions } from './user-slice'
import { sagaActions } from './saga-actions'
import { uiActions } from '../store/ui-slice'
import api from '../hooks'

const { setUser, setAvatar, toggleAuth, removeUser, unToggleAuth, toggleEmailSend } =
  userSliceActions

const { toggleLog, toggleReg, toggleCongratAuth, toggleCreateNewPassword } = uiActions

export function* userSignUpSaga(action: Effect) {
  try {
    const { email, password, userRole } = action.payload
    const data = yield call(api.post, '/auth/register', { email, password, userRole })
    const { accessToken, id } = data.data
    yield put(toggleReg())
    yield put(setUser({ id, email }))
    yield put(toggleCongratAuth())
    yield put(toggleAuth())
    localStorage.setItem('token', accessToken)
  } catch (error) {
    console.log(error)
  }
}
export function* userLoginSaga(action: Effect) {
  try {
    const { email, password, userRole } = action.payload
    const data = yield call(api.post, '/auth/login', { email, password, userRole })
    const { accessToken, id } = data.data
    yield put(setUser({ id, email }))
    yield put(toggleLog())
    yield put(toggleCongratAuth())
    yield put(toggleAuth())
    localStorage.setItem('token', accessToken)
    const avatar = yield call(async () => {
      return await api.get('/getAvatar')
    })
    yield put(setAvatar({ avatar: avatar.data.imageUrl }))
  } catch (error) {
    console.log(error)
  }
}

export function* userLogoutSaga() {
  try {
    yield call(api.post, '/auth/logout')
    localStorage.removeItem('token')
    yield put(unToggleAuth())
    yield put(removeUser())
  } catch (error) {
    console.log(error)
  }
}

export function* userRefreshSaga() {
  try {
    const data = yield call(api.post, '/auth/refresh')
    const { accessToken, id, email } = data.data
    yield put(setUser({ id, email }))
    localStorage.setItem('token', accessToken)
    yield put(toggleAuth())
  } catch (error) {
    console.log(error)
  }
}

export function* userResetPassSaga(action: Effect) {
  try {
    const { email } = action.payload
    yield call(api.post, '/forgotPassword', { email })
    yield put(toggleEmailSend())
  } catch (error) {
    console.log(error)
  }
}

export function* userNewPassSaga(action: Effect) {
  try {
    const { password, token, id } = action.payload
    yield call(api.post, '/createNewPassword', { password, token, id })
    yield put(toggleCreateNewPassword())
    yield put(toggleLog())
  } catch (error) {
    console.log(error)
  }
}

export function* updateUserDataSaga(action: Effect) {
  try {
    const { email } = action.payload
    yield call(api.patch, '/updateUser', { ...action.payload })
    if (email) {
      yield put(setUser({ email }))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* userGetAvatarSaga(action: Effect) {
  try {
    const data = yield call(api.get, '/getAvatar')
    yield put(setAvatar({ avatar: data.data.imageUrl }))
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.USER_SIGNUP_SAGA, userSignUpSaga)
  yield takeEvery(sagaActions.USER_LOGIN_SAGA, userLoginSaga)
  yield takeEvery(sagaActions.USER_LOGOUT_SAGA, userLogoutSaga)
  yield takeEvery(sagaActions.USER_REFRESH_SAGA, userRefreshSaga)
  yield takeEvery(sagaActions.USER_NEWPASS_SAGA, userNewPassSaga)
  yield takeEvery(sagaActions.USER_RESET_SAGA, userResetPassSaga)
  yield takeEvery(sagaActions.USER_UPDATE_DATA_SAGA, updateUserDataSaga)
  yield takeEvery(sagaActions.USER_GET_AVATAR_SAGA, userGetAvatarSaga)
}
