import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../api/userApi'
import { User } from '../types/User'
import UserTable from '../components/UserTable'
import LoadingScreen from '../components/LoadingScreen'
import { Container } from 'react-bootstrap' // Import Container

import '../styles/UserPage.css'

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users', error)
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Container className='py-2 container'>
      <h2>Users</h2>
      <UserTable users={users} />
    </Container>
  )
}

export default UserPage
