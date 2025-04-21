import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import 'leaflet/dist/leaflet.css'
import React, {useState} from 'react'
import {Button, Col, Container, FloatingLabel, Form, Row} from 'react-bootstrap'
import {MapContainer, TileLayer} from 'react-leaflet'
import {useDispatch, useSelector} from 'react-redux'

import {editShapeName, removeMap, updateMapShape} from '../../context/slices/mapSlice'
import {RootState} from '../../context/store'
import GeomanShapeRenderer from '../geoman/shapeRenderer'
import Style from './style'
import {serializeLatlngs} from '../../helpers/serializeLatLangs'

const ShowShapes = () => {
  const mapItems = useSelector((state: RootState) => state.maps.items)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const dispatch = useDispatch()

  const handleDelete = (id: number) => {
    dispatch(removeMap(id))
    setSelectedIndex(0)
  }

  const handleEditShape = (newLatlngs: any) => {
    const serializedLatlngs = serializeLatlngs(newLatlngs)

    dispatch(updateMapShape({id: mapItems[selectedIndex].id, latlngs: serializedLatlngs}))
  }

  const submitEditForm = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      dispatch(editShapeName({id: id, name: e.target.value}))
    } else {
      alert('Please Enter The Shape Name!')
    }
  }

  return (
    <Style>
      <div className='d-flex flex-wrap'>
        <Container fluid>
          <Row>
            <Col
              xs={12}
              md={6}
              className='shapeMap px-0'
            >
              <MapContainer
                center={[32.4279, 53.688]}
                zoom={6}
                style={{height: '100vh', width: '100%'}}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {mapItems[selectedIndex] && (
                  <GeomanShapeRenderer
                    onEdit={(e: any) => handleEditShape(e)}
                    item={mapItems[selectedIndex]}
                  />
                )}
              </MapContainer>
            </Col>

            <Col
              xs={12}
              md={6}
              className='d-flex flex-wrap align-items-start'
            >
              {mapItems.map((item, index) => (
                <Col
                  key={item.id}
                  xs={6}
                >
                  <div className='text-center'>
                    <div className='shape-info rounded shadow-sm mx-1 my-2 p-3'>
                      <h4>{item.name}</h4>
                      <FloatingLabel
                        controlId={`name-${item.id}`}
                        label='Name'
                        className='mb-3'
                      >
                        <Form.Control
                          type='text'
                          value={item.name}
                          name='name'
                          placeholder='Enter name'
                          onChange={submitEditForm(item.id)}
                          autoComplete='off'
                        />
                      </FloatingLabel>
                      <div className='d-flex justify-content-between align-items-center'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='text-danger h5'
                          onClick={() => handleDelete(item.id)}
                          role='button'
                        />
                        <Button
                          variant='primary'
                          onClick={() => setSelectedIndex(index)}
                        >
                          Show On Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </Style>
  )
}

export default ShowShapes
