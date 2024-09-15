// src/api/photoAlbumsApi.ts
import axios from 'axios'
import { Photo } from '~/types/Photo'

const BASE_URL = 'https://jsonplaceholder.typicode.com/photos'

export const fetchPhotos = async (start: number, limit: number, albumId?: string): Promise<Photo[]> => {
  try {
    const url = albumId
      ? `${BASE_URL}?_start=${start}&_limit=${limit}&albumId=${albumId}`
      : `${BASE_URL}?_start=${start}&_limit=${limit}`

    const response = await axios.get<Photo[]>(url)
    return response.data
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}
