import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom'

import UserPage from './pages/UserPage'
import UserDetailsPage from './pages/UserDetailsPage '
import PhotosPage from './pages/PhotoPage'

import 'bootstrap/dist/css/bootstrap.min.css'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className='header bg-dark py-2'>
          <nav className='headerNav container d-flex justify-content-start'>
            <NavLink
              to='/users'
              className={({ isActive }) => (isActive ? 'text-white fw-bold' : 'fw-normal')}
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'hsla(0, 0%, 100%, .55)'
              })}
            >
              Users
            </NavLink>
            <NavLink
              to='/photos'
              className={({ isActive }) => (isActive ? 'text-white px-2 fw-bold' : 'px-2 fw-normal')}
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'hsla(0, 0%, 100%, .55)'
              })}
            >
              Photos
            </NavLink>
          </nav>
        </header>

        {/* Routes Section */}
        <Routes>
          <Route path='/' element={<Navigate to='/users' />} />
          <Route path='/users' element={<UserPage />} />
          <Route path='/photos' element={<PhotosPage />} />
          <Route path='/users/:userId' element={<UserDetailsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
