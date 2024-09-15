import axios from 'axios'
import { User } from '../types/User'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error)
    throw error
  }
}

export const updateUserById = async (userId: string, updatedData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}`, updatedData)
    return response.data
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error)
    throw error
  }
}
