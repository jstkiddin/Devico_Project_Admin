import { memo, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PageNotFound from './pages/404'
import { sagaActions, eventActions } from './store/saga-actions'
import SideBar from './components/Sidebar/SideBar'
import NavBar from './components/NavBar/NavBar'
import { useAppDispatch, useAppSelector } from './hooks/redux.hook'
import SignInPage from './pages/SignInPage'
import UsersPage from './pages/UsersPage'
import LicensesPage from './pages/LicensesPage'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector<boolean>(state => state.user.isAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({ type: sagaActions.USER_REFRESH_SAGA })
    }
    dispatch({ type: eventActions.EVENT_GET_SAGA })
    dispatch({ type: sagaActions.USER_GET_DATA_SAGA })
    dispatch({ type: sagaActions.USER_GET_CARS_SAGA })
    dispatch({ type: sagaActions.USER_EVENTS_DATA_SAGA })
  }, [])

  return (
    <Router>
      {isAuth ? (
        <>
          <SideBar />
          <NavBar />
        </>
      ) : null}

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route
          path="/licenses"
          element={isAuth ? <LicensesPage /> : <Navigate to="/signin" replace />}
        />
        <Route path="/users" element={isAuth ? <UsersPage /> : <Navigate to="/signin" replace />} />
        <Route path="/signin" element={isAuth ? <Navigate to="/" replace /> : <SignInPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default memo(App)
