type IPoint = {
  lat: number
  lng: number
}

type IZone = {
  id: string
  price: number
  points: IPoint[]
};

export const zones: IZone[] = [
  {
    id: 'zone-1',
    price: 14000,
    points: [
      { lat: 4.711, lng: -74.0721 },
      { lat: 4.712, lng: -74.0725 },
      { lat: 4.713, lng: -74.071 },
      { lat: 4.711, lng: -74.0721 }
    ]
  },
  {
    id: 'zone-2',
    price: 11000,
    points: [
      { lat: 4.721, lng: -74.0821 },
      { lat: 4.722, lng: -74.0825 },
      { lat: 4.723, lng: -74.081 },
      { lat: 4.721, lng: -74.0821 }
    ]
  }
]
