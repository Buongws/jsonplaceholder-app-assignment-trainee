import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types/User'
import { fetchUserById, updateUserById } from '../api/userApi'
import LoadingScreen from '~/components/LoadingScreen'
import UserPhotoAlbums from '~/components/UserPhotoAlbums'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

import '../styles/UserDetailsPage.css'

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  if (!userId) {
    return <h1>Details for user with ID: {userId}</h1>
  }
  const [user, setUser] = useState<Partial<User>>({})
  const [originalUser, setOriginalUser] = useState<Partial<User>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const loadUser = async () => {
      try {
        const data = await fetchUserById(userId)
        setUser(data)
        setOriginalUser(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user details', error)
      }
    }

    loadUser()
  }, [userId])

  const handleEditClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancelClick = useCallback(() => {
    setIsEditing(false)
    setUser(originalUser)
  }, [originalUser])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedData = {
      email: user.email,
      website: user.website,
      phone: user.phone
    }

    try {
      const response = await updateUserById(userId, updatedData as User)
      setUser(response)
      setOriginalUser(response)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating user details:', error)
    }
  }

  const handleChange = useCallback((field: keyof User, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }))
  }, [])

  const isFormModified = useCallback(() => {
    return (
      user.email !== originalUser.email || user.phone !== originalUser.phone || user.website !== originalUser.website
    )
  }, [user, originalUser])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Container className='mt-4'>
      <Row className='mb-4'>
        <h2>{user.name}</h2>
      </Row>
      <Row>
        <Col md={6}>
          <div className='d-flex flex-column'>
            <div className='user-section mb-4'>
              <h2>Personal:</h2>
              <p className='d-flex justify-content-between'>
                <span>Id:</span> <strong>{user.id}</strong>
              </p>
              <p className='d-flex justify-content-between'>
                <span>Username:</span> <strong>{user.username}</strong>
              </p>
            </div>

            <div className='user-section mb-4'>
              <h2>Address:</h2>
              <p className='d-flex justify-content-between'>
                <span>Street:</span> <strong>{user.address?.street}</strong>
              </p>
              <p className='d-flex justify-content-between'>
                <span>Suite:</span> <strong>{user.address?.suite}</strong>
              </p>
              <p className='d-flex justify-content-between'>
                <span>City:</span> <strong>{user.address?.city}</strong>
              </p>
              <p className='d-flex justify-content-between'>
                <span>Zipcode:</span> <strong>{user.address?.zipcode}</strong>
              </p>
            </div>

            <div className='user-section mb-4'>
              <h2>Company:</h2>
              <p className='d-flex justify-content-between company'>
                <span>Name:</span> <strong>{user.company?.name}</strong>
              </p>
              <p className='d-flex justify-content-between company'>
                <span>CatchPhrase:</span> <strong>{user.company?.catchPhrase}</strong>
              </p>
              <p className='d-flex justify-content-between company'>
                <span>Bs:</span> <strong>{user.company?.bs}</strong>
              </p>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className='user-contact'>
            <div className='user-section mb-4'>
              <h2>Contact:</h2>
              {isEditing ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={user.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                      type='tel'
                      value={user.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Website:</Form.Label>
                    <Form.Control
                      type='text'
                      value={user.website || ''}
                      onChange={(e) => handleChange('website', e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type='submit'
                    variant='success'
                    className={isFormModified() ? '' : 'disabled'}
                    disabled={!isFormModified()}
                  >
                    Submit
                  </Button>

                  <Button variant='danger' type='button' className='ms-2' onClick={handleCancelClick}>
                    Reset
                  </Button>
                </Form>
              ) : (
                <>
                  <p className='d-flex justify-content-between'>
                    <span>Email:</span> <strong>{user.email || 'No Email'}</strong>
                  </p>
                  <p className='d-flex justify-content-between'>
                    <span>Website:</span> <strong>{user.website || 'No Website'}</strong>
                  </p>
                  <p className='d-flex justify-content-between'>
                    <span>Phone:</span> <strong>{user.phone || 'No Phone'}</strong>
                  </p>
                  <Button variant='success' className='mt-3' onClick={handleEditClick}>
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className='mt-4'>
        <UserPhotoAlbums userId={userId} />
      </Row>
    </Container>
  )
}

export default UserDetailsPage
