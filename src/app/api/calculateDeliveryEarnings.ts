import { zones } from './fuegoBurgerPrices'

type IPoint = {
  lat: number
  lng: number
}

function isPointInPolygon (point: IPoint, polygon: IPoint[]): boolean {
  let isInside = false
  const { lat, lng } = point
  const vertices = polygon

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].lat
    const yi = vertices[i].lng
    const xj = vertices[j].lat
    const yj = vertices[j].lng

    const intersect =
      // eslint-disable-next-line no-mixed-operators
      yi > lng !== yj > lng &&
      lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi

    if (intersect) isInside = !isInside
  }

  return isInside
}

export function calculateDeliveryEarnings (destination: IPoint) {
  for (const zone of zones) {
    if (isPointInPolygon(destination, zone.points)) {
      return {
        service: zone.price,
        tip: 0
      }
    }
  }

  return {
    service: 15000, // Precio base para zonas no definidas
    tip: 0
  }
}
