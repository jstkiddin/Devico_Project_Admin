import { call, takeEvery, put, Effect } from 'redux-saga/effects'
import { licenseActions } from './saga-actions'
import api from '../hooks'
import { licenseSliceActions } from './license-slice'
import { uiActions } from './ui-slice'

const { setLicenses } = licenseSliceActions
const { toggleShowSetPaidStatus, toggleShowSetLicenseStatus } = uiActions

export function* getLicensesList(action: Effect) {
  try {
    const data = yield call(api.get, '/getLicenses')
    const { licenses } = data.data
    yield put(setLicenses({ licenses }))
  } catch (error) {
    console.log(error)
  }
}

export function* changePaidStatus(action: Effect) {
  try {
    yield call(api.put, '/changePaidStatus', {
      id: action.payload.licenseId,
      paidStatus: action.payload.status,
    })
    const data = yield call(api.get, '/getLicenses')
    const { licenses } = data.data
    yield put(setLicenses({ licenses }))
    yield put(toggleShowSetPaidStatus())
  } catch (error) {
    console.log(error)
  }
}

export function* changeLicenseStatus(action: Effect) {
  try {
    yield call(api.put, '/changeLicenseStatus', {
      id: action.payload.licenseId,
      status: action.payload.status,
    })
    const data = yield call(api.get, '/getLicenses')
    const { licenses } = data.data
    yield put(setLicenses({ licenses }))
    yield put(toggleShowSetLicenseStatus())
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(licenseActions.USER_GET_LICENSES, getLicensesList)
  yield takeEvery(licenseActions.LICENSE_CHAGE_PAID_STATUS, changePaidStatus)
  yield takeEvery(licenseActions.CHAGE_LICENSE_STATUS, changeLicenseStatus)
}
