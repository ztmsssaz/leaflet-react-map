import L from 'leaflet'

export const detectLayerType = (layer: any): string => {
  if (layer instanceof L.Circle) return 'circle'
  if (layer instanceof L.Rectangle) return 'rectangle'
  if (layer instanceof L.Polygon) return 'polygon'
  if (layer instanceof L.Polyline) return 'polyline'
  if (layer instanceof L.Marker) return 'marker'
  return 'unknown'
}

// helpers/detectLayer.ts

export const GetLatLangs = (layer: any): any => {
  if (!layer) return null

  if (layer instanceof L.Circle) {
    const center = layer.getLatLng()
    const radius = layer.getRadius()
    return {center, radius}
  }

  if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
    const latlngs = layer.getLatLngs()
    return latlngs
  }

  if (layer instanceof L.Rectangle) {
    const bounds = layer.getBounds()
    return [bounds.getSouthWest(), bounds.getNorthEast()]
  }

  if (layer instanceof L.Marker) {
    return layer.getLatLng()
  }

  return null
}
