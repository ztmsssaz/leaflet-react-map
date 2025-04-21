// Draw.tsx
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, {useEffect, useRef} from 'react'
import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import AddShapeModal from './addShapeModal'
import Style from './style'
import GeomanControls from '../geoman/controls'

// const GeomanControls = ({setShow, setData}: any) => {
//   const map = useMap()

//   useEffect(() => {
//     // فعال‌سازی دکمه‌های Geoman
//     map.pm.addControls({
//       position: 'topleft',
//       drawPolygon: false,
//       drawPolyline: false,
//       drawCircle: false,
//       drawMarker: false,
//       drawRectangle: true,
//       drawCircleMarker: false,
//       editMode: false,
//       dragMode: false,
//       cutPolygon: false,
//       removalMode: false,
//     })

//     // شنونده برای ساخت شکل جدید
//     map.on('pm:create', (e: any) => {
//       console.log('Created shape:', e)
//       setData(e)
//       setShow(true)
//     })
//   }, [map, setShow, setData])

//   return null
// }

const Draw: React.FC<{zoom: number}> = ({zoom}) => {
  const [show, setShow] = React.useState(false)
  const [data, setData] = React.useState({})
  const mapRef = useRef<L.Map>(null)

  const handleShapeCreated = (layer: any, layerType: string) => {
    setData({layer, layerType})
    setShow(true)
  }

  return (
    <Style>
      <MapContainer
        center={[32.4279, 53.688]}
        zoom={6}
        style={{height: '100vh', width: '100%'}}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <GeomanControls onShapeCreated={handleShapeCreated} />
      </MapContainer>

      <AddShapeModal
        show={show}
        setShow={setShow}
        data={data}
      />
    </Style>
  )
}

export default Draw
