import { call, takeEvery, put, Effect } from 'redux-saga/effects'
import api from '../hooks'
import { notificationsActions } from './saga-actions'

export function* addNotification(action: Effect) {
  try {
    const { user_id, color, text } = action.payload

    yield call(api.put, '/notifications/addNotification', { user_id, color, text })
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(notificationsActions.ADD_NOTIFICATION, addNotification)
}
