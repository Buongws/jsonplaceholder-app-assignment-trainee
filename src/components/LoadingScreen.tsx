import React from 'react'
import '../styles/LoadingScreen.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className='loading-screen'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  )
}

export default LoadingScreen
