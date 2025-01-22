/* eslint-disable no-mixed-operators */
import * as turf from '@turf/turf'
import { zones } from './fuegoBurgerPrices'

export function calculateDeliveryEarnings (lat: number, lon: number) {
  const point = turf.point([lon, lat])
  for (let i = 0; i < zones.length; i++) {
    const polygonCoordinates = zones[i].points.map(p => [p.lng, p.lat])
    const polygon = turf.polygon([polygonCoordinates])
    if (turf.booleanPointInPolygon(point, polygon)) {
      return { service: zones[i].price, tip: 0 }
    }
  }

  return { service: 10000, tip: 0 }
}
