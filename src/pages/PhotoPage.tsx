import React, { useState, useEffect, useRef, useCallback } from 'react'
import { fetchPhotos } from '~/api/photoAlbumsApi'
import { Photo } from '~/types/Photo'
import PhotoList from '~/components/PhotoList'
import SearchPhoto from '~/components/SearchPhoto'
import { Button, Container } from 'react-bootstrap'
import LoadingScreen from '~/components/LoadingScreen'

const PhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [start, setStart] = useState<number>(0)
  const [limit] = useState<number>(12)
  const [loading, setLoading] = useState<boolean>(false)
  const [albumId, setAlbumId] = useState<string>('')

  const isFirstRender = useRef(true)

  const fetchPhotosData = useCallback(
    async (isNewSearch = false) => {
      setLoading(true)
      try {
        const newPhotos = await fetchPhotos(start, limit, albumId)
        if (isNewSearch) {
          setPhotos(newPhotos) // Replace old photos if new search
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    },
    [start, limit, albumId]
  )

  const handleLoadMore = useCallback(() => {
    setStart((prevStart) => prevStart + limit)
  }, [limit])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    fetchPhotosData() // Fetch photos on subsequent renders
  }, [start, albumId, fetchPhotosData])

  const handleSearch = useCallback(
    (newAlbumId: string) => {
      setPhotos([])
      setStart(0)
      setAlbumId(newAlbumId)
      fetchPhotosData(true)
    },
    [fetchPhotosData]
  )

  return (
    <Container className='mt-4'>
      <h2>Photos</h2>

      <SearchPhoto onSearch={handleSearch} />

      <PhotoList photos={photos} />

      <div className='d-flex justify-content-center'>
        {loading ? <LoadingScreen /> : <Button onClick={handleLoadMore}>Load more</Button>}
      </div>
    </Container>
  )
}

export default React.memo(PhotosPage)
