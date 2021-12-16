import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw'
import { useRef, useState } from 'react';
import osm from '../../helpers/osm-providers';
import Style from './style';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import AddShapeModal from './addShapeModal';

const Draw = (props) => {
    const { zoom } = props;
    const mapRef = useRef();
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const openModal = (e) => {
        console.log(e);
        setShow(true);
        setData(e);
    };

    return (
        <Style>
            <Map center={[30, 45]} zoom={zoom} scrollWheelZoom={true} >
                <FeatureGroup>
                    <EditControl options={{ color: 'red' }} position="topright" onCreated={openModal}
                        draw={{ circlemarker: false, marker: false, editing: false }} edit={{ edit: false }} />
                </FeatureGroup>
                <TileLayer
                    attribution={osm.maptiler.attribution}
                    url={osm.maptiler.url}
                    ref={mapRef}
                />
            </Map>
            <AddShapeModal show={show} setShow={setShow} data={data} />
        </Style>
    )
}

export default Draw;