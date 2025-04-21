import L from 'leaflet'
import {useEffect} from 'react'
import {useMap} from 'react-leaflet'

const GeomanShapeRenderer = ({item, onEdit}: {item: any; onEdit: any}) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !item) return
    let layer: any = null
    switch (item.layerType.toLowerCase()) {
      case 'polygon':
        layer = L.polygon(item.latlngs, {color: 'purple'})
        break
      case 'rectangle':
        layer = L.rectangle(item.latlngs, {color: 'green'})
        break
      case 'circle':
        layer = L.circle([item.latlngs.center.lat, item.latlngs.center.lng], {
          radius: item.latlngs.radius,
          color: 'blue',
        })
        break
      case 'line': // اضافه شد
      case 'polyline':
        layer = L.polyline(item.latlngs, {color: 'red'})
        break
      case 'marker':
        layer = L.marker([item.latlngs.lat, item.latlngs.lng])
        break
      default:
        return
    }

    map.pm.addControls({
      position: 'topleft',
      editMode: true,
      drawCircle: false,
      drawMarker: false,
      drawPolygon: false,
      drawPolyline: true,
      drawRectangle: false,
      drawCircleMarker: false,
      dragMode: true,
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

    if (layer) {
      layer.bindPopup(item.name)
      layer.addTo(map)
      layer.pm?.disable()
      layer.pm.enable({
        allowSelfIntersection: false,
      })
      if (layer.getBounds) {
        map.flyToBounds(layer.getBounds(), {padding: [50, 50]})
      } else if (layer.getLatLng) {
        map.flyTo(layer.getLatLng(), 11) // یا هر زوم دلخواه
      }
      layer.on('pm:edit', () => {
        if (layer instanceof L.Circle) {
          onEdit({
            center: layer.getLatLng(),
            radius: layer.getRadius(),
          })
        } else if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
          onEdit(layer.getLatLngs())
        } else if (layer instanceof L.Marker) {
          onEdit(layer.getLatLng())
        }
      })
    }

    return () => {
      map.removeLayer(layer)
    }
  }, [item, map])

  return null
}

export default GeomanShapeRenderer
