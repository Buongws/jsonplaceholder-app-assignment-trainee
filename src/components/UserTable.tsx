import React from 'react'
import { User } from '../types/User'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

interface UserTableProps {
  users: User[]
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate()

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`)
  }

  return (
    <div className='table-wrapper'>
      <Table striped bordered hover responsive className='mt-3'>
        <thead>
          <tr className='table-list'>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>City</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)} className='table-row'>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default React.memo(UserTable)
