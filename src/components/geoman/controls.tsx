import L from 'leaflet'
import {useEffect} from 'react'
import {useMap} from 'react-leaflet'

const GeomanControls = ({
  onShapeCreated,
}: {
  onShapeCreated: (layer: any, layerType: string) => void
}) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    map.pm.addControls({
      position: 'topleft',
      drawCircle: true,
      drawMarker: true,
      drawPolygon: true,
      drawPolyline: true,
      drawRectangle: true,
      drawCircleMarker: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
    })
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconUrl: 'assets/icons/location-icon.png',
      iconSize: [35, 35],
      iconAnchor: [16, 32],
      iconRetinaUrl: 'assets/icons/location-icon.png',
      shadowUrl: null,
    })
    map.on('pm:create', (e: any) => {
      const {layer, shape} = e
      layer.pm.disable()
      onShapeCreated(layer, shape)
    })

    return () => {
      map.pm.removeControls()
    }
  }, [map, onShapeCreated])

  return null
}

export default GeomanControls
