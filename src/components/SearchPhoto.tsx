import React, { useState, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'

interface SearchPhotoProps {
  onSearch: (albumId: string) => void
}

const SearchPhoto: React.FC<SearchPhotoProps> = ({ onSearch }) => {
  const [inputAlbumId, setInputAlbumId] = useState<string>('')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAlbumId(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    if (inputAlbumId.trim()) {
      onSearch(inputAlbumId)
      setInputAlbumId('')
    }
  }, [inputAlbumId, onSearch])

  return (
    <Form className='mb-3'>
      <Form.Group className='d-flex align-items-center gap-2'>
        <Form.Select aria-label='Album Id' className='w-auto'>
          <option value=''>Album Id</option>
        </Form.Select>

        <Form.Control
          className='w-20'
          type='text'
          value={inputAlbumId}
          onChange={handleInputChange}
          placeholder='Search by album id'
        />

        <Button variant='primary' onClick={handleSearch}>
          Search
        </Button>
      </Form.Group>
    </Form>
  )
}

export default React.memo(SearchPhoto)
