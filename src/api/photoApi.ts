import axios from 'axios'
import { PhotoUsers } from '~/types/PhotoUsers'

const API_URL = 'https://jsonplaceholder.typicode.com/users/:userId/albums'
const ALBUM_URL = 'https://jsonplaceholder.typicode.com/albums' // URL for handling album deletions

// Fetch albums by user ID
export const fetchPhotoUsersByUserId = async (userId: string): Promise<PhotoUsers[]> => {
  try {
    const response = await axios.get<PhotoUsers[]>(API_URL.replace(':userId', userId))
    return response.data
  } catch (error) {
    console.error('Error fetching photo users:', error)
    throw error
  }
}

// Delete album by album ID
export const deletePhotoUserById = async (albumId: string): Promise<void> => {
  const deleteUrl = `${ALBUM_URL}/${albumId}`
  try {
    await axios.delete(deleteUrl)
  } catch (error) {
    console.error('Error deleting album:', error)
    throw error
  }
}

// Add a new album
export const addPhotoUser = async (newPhotoUser: PhotoUsers): Promise<PhotoUsers> => {
  const addUrl = API_URL.replace(':userId', newPhotoUser.userId)
  try {
    const response = await axios.post(addUrl, newPhotoUser)
    return response.data
  } catch (error) {
    console.error('Error adding album:', error)
    throw error
  }
}
