// src/components/PhotoList.tsx
import React from 'react'
import { Photo } from '~/types/Photo'
import { Card, Col, Row } from 'react-bootstrap'
import { limitText } from '~/ultis/utils'

interface PhotoListProps {
  photos: Photo[]
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  return (
    <Row>
      {photos.map((photo, index) => (
        <Col md={3} key={`${photo.albumId}-${photo.id}-${index}`} className='mb-4'>
          <Card className='h-100 d-flex flex-column'>
            <Card.Img variant='top' src={photo.url} alt={photo.title} style={{ objectFit: 'cover', height: '300px' }} />
            <Card.Body className='d-flex flex-column justify-content-between'>
              <Card.Title>{limitText(photo.title, 25)}</Card.Title>
              <div>
                <Card.Text>Id: #{photo.id}</Card.Text>
                <Card.Text>Album Id: #{photo.albumId}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default React.memo(PhotoList)
