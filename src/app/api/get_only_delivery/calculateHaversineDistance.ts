interface CoordinateOrigin {
  lat: number
  lng: number
}

interface CoordinateDestination {
  latitude: number
  longitude: number
}

const degToRad = Math.PI / 180 // Convertir grados a radianes directamente
const earthRadius = 6371 // Radio de la Tierra en kilómetros

export function calculateHaversineDistance (origin: CoordinateOrigin, destination: CoordinateDestination): number {
  // Convertir grados a radianes directamente
  const originLatRad = origin.lat * degToRad
  const originLonRad = origin.lng * degToRad
  const destinationLatRad = destination.latitude * degToRad
  const destinationLonRad = destination.longitude * degToRad

  const difLat = destinationLatRad - originLatRad
  const difLon = destinationLonRad - originLonRad

  const sinDifLatDiv2 = Math.sin(difLat / 2)
  const sinDifLonDiv2 = Math.sin(difLon / 2)

  const cosOriginLat = Math.cos(originLatRad)
  const cosDestinationLat = Math.cos(destinationLatRad)

  const a = sinDifLatDiv2 ** 2 + cosOriginLat * cosDestinationLat * sinDifLonDiv2 ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadius * c

  return Math.round(distance * 10) / 10
}
