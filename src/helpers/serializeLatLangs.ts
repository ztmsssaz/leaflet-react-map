export const serializeLatlngs = (latlngs) => {
  if (Array.isArray(latlngs)) {
    return latlngs.map((point) =>
      Array.isArray(point)
        ? serializeLatlngs(point) // برای polygon تو در تو
        : {lat: point.lat, lng: point.lng}
    )
  } else if (latlngs?.lat && latlngs?.lng) {
    return {lat: latlngs.lat, lng: latlngs.lng}
  } else if (latlngs?.center && latlngs?.radius) {
    return {
      center: {
        lat: latlngs.center.lat,
        lng: latlngs.center.lng,
      },
      radius: latlngs.radius,
    }
  }
  return latlngs
}
