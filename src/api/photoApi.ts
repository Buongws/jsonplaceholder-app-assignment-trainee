import axios from 'axios'
import { PhotoUsers } from '~/types/PhotoUsers'

const API_URL = 'https://jsonplaceholder.typicode.com/users/:userId/albums'

export const fetchPhotoUsersByUserId = async (userId: string): Promise<PhotoUsers[]> => {
  try {
    const response = await axios.get<PhotoUsers[]>(API_URL.replace(':userId', userId))
    return response.data
  } catch (error) {
    console.error('Error fetching photo users:', error)
    throw error
  }
}

export const deletePhotoUserById = async (photoUserId: string): Promise<void> => {
  try {
    await axios.delete(API_URL.replace(':userId', photoUserId))
  } catch (error) {
    console.error('Error deleting photo user:', error)
    throw error
  }
}

export const addPhotoUser = async (newPhotoUser: PhotoUsers): Promise<PhotoUsers> => {
  try {
    const response = await axios.post(API_URL, newPhotoUser)
    return response.data
  } catch (error) {
    console.error('Error adding photo user:', error)
    throw error
  }
}
