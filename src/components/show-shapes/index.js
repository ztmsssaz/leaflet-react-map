import { Map, TileLayer, FeatureGroup, Circle, Rectangle, Polyline, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, FloatingLabel, Form, Row, Button } from 'react-bootstrap';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import osm from '../../helpers/osm-providers';
import Style from './style';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const ShowShapes = () => {
    const mapItems = useSelector((state) => state.mapsState.items);
    const [position, setPosition] = useState([30, 30]);
    const [shapeIndex, setShapeIndex] = useState(null);

    const mapRef = useRef();
    const dispatch = useDispatch();

    const editedShape = (e) => {
        const _latlngs = e;
        console.log(_latlngs);
    }

    function renderShape() {
        if (shapeIndex !== null) {
            let item = mapItems[shapeIndex];
            switch (item.layerType) {
                case 'circle':
                    return (
                        <Circle center={item._latlngs} radius={item.options.radius} />
                    )
                case 'rectangle':
                    return (
                        <Rectangle bounds={item._latlngs} />
                    )
                case 'polyline':
                    return (
                        <Polyline positions={item._latlngs} />
                    )
                case 'polygon':
                    return (
                        <Polygon positions={item._latlngs} />
                    )
                default:
                    break;
            }
        }
    }

    const handlechangeEditInput = (idx) => event => {
        const newItems = mapItems.map((item, index) => {
            if (idx !== index) return item;
            return { id: item.id, name: event.target.value, layerType: item.layerType, _latlngs: item._latlngs, options: item.options };
        })
        dispatch({ type: 'EDIT_MAP', payload: newItems })
    };

    const deleteShape = (id) => {
        setShapeIndex(null);
        dispatch({ type: 'REMOVE_MAP', payload: id })
    }

    function showOnMap(index) {
        setShapeIndex(index);
        let item = mapItems[index];
        if (item.layerType === 'circle') {
            var temp = item._latlngs;
        } else if (item.layerType === 'polyline') {
            temp = item._latlngs[0]
        } else
            temp = item._latlngs[0][0];
        setPosition([parseInt(temp.lat), parseInt(temp.lng)]);
    }

    return (
        <Style>
            <div className='d-flex flex-wrap'>
                <Container fluid>
                    <Row>
                        <Col className="shapeMap px-0" xs={12} md={6}>
                            <Map center={position} zoom={3} scrollWheelZoom={true} >
                                <FeatureGroup>
                                    <EditControl options={{ color: 'red' }} position="topright" onEdited={editedShape} draw={{ circlemarker: false, marker: false }} />
                                    {renderShape()}
                                </FeatureGroup>
                                <TileLayer
                                    attribution={osm.maptiler.attribution}
                                    url={osm.maptiler.url}
                                    ref={mapRef}
                                />
                            </Map>
                        </Col>
                        <Col xs={1} md={6} className='d-flex flex-wrap align-items-center'>
                            {mapItems.map((item, index) => {
                                return (
                                    <Col xs={6}>
                                        <div className='text-center'>
                                            <div className='shape-info rounded shadow-sm mx-1 my-2 p-3'>
                                                <h4>{item.name}</h4>
                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Name"
                                                    className="mb-3"
                                                >
                                                    <Form.Control value={mapItems[index].name} type="text" placeholder="enter the new name" autoComplete='false' onChange={handlechangeEditInput(index)} />
                                                </FloatingLabel>
                                                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                                    <FontAwesomeIcon className='text-danger h5' icon={faTrash} onClick={() => deleteShape(item.id)} />
                                                    <Button variant="primary" onClick={() => showOnMap(index)}>Show On Map</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Style>
    )
}

export default ShowShapes;