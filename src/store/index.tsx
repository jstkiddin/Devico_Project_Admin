import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import uiSlice from './ui-slice'
import userSlice from './user-slice'
import eventSlice from './event-slice'
import eventSaga from './eventSaga'
import licenseSaga from './licenseSaga'
import licenseSlice from './license-slice'
import notificationsSaga from './notificationsSaga'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

let sagaMiddleware = createSagaMiddleware()
let eventSagaMiddleware = createSagaMiddleware()
let licenseSagaMiddleware = createSagaMiddleware()
let notificationsSagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    event: eventSlice.reducer,
    license: licenseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(
      sagaMiddleware,
      eventSagaMiddleware,
      licenseSagaMiddleware,
      notificationsSagaMiddleware,
    ),
  devTools: true,
})

sagaMiddleware.run(saga)
eventSagaMiddleware.run(eventSaga)
licenseSagaMiddleware.run(licenseSaga)
notificationsSagaMiddleware.run(notificationsSaga)

export default store
