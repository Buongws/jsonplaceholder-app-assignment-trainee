import axios from 'axios'
import { PhotoUsers } from '~/types/PhotoUsers'

// Mock API URLs
const API_URL = 'https://jsonplaceholder.typicode.com/users/:userId/albums'
const ALBUM_URL = 'https://jsonplaceholder.typicode.com/albums'

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

// Delete album by custom album ID
export const deletePhotoUserById = async (albumId: string): Promise<void> => {
  const deleteUrl = `${ALBUM_URL}/${albumId}`
  try {
    await axios.delete(deleteUrl)
  } catch (error) {
    console.error('Error deleting album:', error)
    throw error
  }
}

// Add a new album with a custom ID (client-side unique ID)
export const addPhotoUser = async (newPhotoUser: PhotoUsers): Promise<PhotoUsers> => {
  const addUrl = API_URL.replace(':userId', newPhotoUser.userId)
  try {
    await axios.post(addUrl, newPhotoUser)
    return { ...newPhotoUser }
  } catch (error) {
    console.error('Error adding album:', error)
    throw error
  }
}
