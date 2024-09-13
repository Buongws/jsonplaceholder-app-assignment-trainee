import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'

import UserPage from './pages/UserPage'
import UserDetailsPage from './pages/UserDetailsPage '

import 'bootstrap/dist/css/bootstrap.min.css'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Header Section */}
        <header className='header bg-dark py-2'>
          <nav className='headerNav container d-flex justify-content-start'>
            <Link to='/users' className='text-white fw-bold'>
              Users
            </Link>
            <Link to='/photos' className='text-white px-2 fw-bold'>
              Photos
            </Link>
          </nav>
        </header>

        {/* Routes Section */}
        <Routes>
          <Route path='/' element={<Navigate to='/users' />} />
          <Route path='/users' element={<UserPage />} />
          <Route path='/users/:userId' element={<UserDetailsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
