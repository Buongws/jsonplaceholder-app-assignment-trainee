import React, { useCallback, useEffect, useState } from 'react'
import { fetchPhotoUsersByUserId, addPhotoUser, deletePhotoUserById } from '../api/userPhotoAlbumsApi'
import { PhotoUsers } from '../types/PhotoUsers'
import { Button, Form, Row, Col } from 'react-bootstrap'

interface UserPhotoAlbumsProps {
  userId: string
}

const UserPhotoAlbums: React.FC<UserPhotoAlbumsProps> = ({ userId }) => {
  const [albums, setAlbums] = useState<PhotoUsers[]>([])
  const [newAlbumTitle, setNewAlbumTitle] = useState<string>('')

  useEffect(() => {
    const loadPhotoAlbums = async () => {
      try {
        const photoAlbums = await fetchPhotoUsersByUserId(userId)
        setAlbums(photoAlbums)
      } catch (error) {
        console.error('Error fetching photo albums:', error)
      }
    }

    loadPhotoAlbums()
  }, [userId])

  const handleAddAlbum = useCallback(async () => {
    if (!newAlbumTitle.trim()) return
    const customId = `newAlbum${albums.length + 1}`
    const newAlbum = { userId, id: customId, title: newAlbumTitle } as PhotoUsers

    try {
      const addedAlbum = await addPhotoUser(newAlbum)
      setAlbums((prevAlbums) => [...prevAlbums, addedAlbum])
      setNewAlbumTitle('')
    } catch (error) {
      console.error('Error adding album:', error)
    } finally {
    }
  }, [newAlbumTitle, albums, userId])

  const handleDeleteAlbum = useCallback(async (albumId: string) => {
    try {
      await deletePhotoUserById(albumId)
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId))
    } catch (error) {
      console.error(`Error deleting album with ID ${albumId}:`, error)
    } finally {
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlbumTitle(e.target.value)
  }

  return (
    <div className='user-photo-albums'>
      <h2>Photo Albums:</h2>
      <div className='d-flex mb-3 user-photo-form'>
        <Form.Control
          type='text'
          value={newAlbumTitle}
          onChange={handleInputChange}
          placeholder='Title of new album'
          className='me-2'
        />
        <Button variant='success' onClick={handleAddAlbum} className='flex-shrink-0 w-25 btn btn-success btn-lg'>
          New Album
        </Button>
      </div>
      <Row>
        {albums.map((album, index) => (
          <Col xs={12} sm={6} className='mb-3' key={`${album.id}-${index}`}>
            <div className='d-flex items-center justify-content-between border rounded text-decoration-none text-black'>
              <div className='py-2 flex-shrink-0 border-end d-flex items-center justify-content-center w-10'>
                {index + 1}
              </div>
              <span className='py-2 w-100 px-4 text-truncate fw-bold text-start'>{album.title}</span>
              <div className='text-center flex-shrink-0 w-10 py-2'>
                <Button variant='danger' size='sm' onClick={() => handleDeleteAlbum(album.id)}>
                  X
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default React.memo(UserPhotoAlbums)
