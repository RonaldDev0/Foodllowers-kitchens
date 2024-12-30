type IAddress = {
  key: string
  number: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export const addresses: IAddress[] = [
  {
    key: '1',
    number: '3202700938',
    geometry: {
      location: {
        lat: 4.6507208,
        lng: -74.0666842
      }
    },
    formatted_address: 'Cra. 16 #63-69, Bogotá, Colombia'
  },
  {
    key: '2',
    number: '3202694620',
    geometry: {
      location: {
        lat: 4.7199839,
        lng: -74.0564799
      }
    },
    formatted_address: 'Cl. 134a #50-27, Suba, Bogotá, Colombia'
  },
  {
    key: '3',
    number: '',
    geometry: {
      location: {
        lat: 6.226800099999999,
        lng: -75.5724937
      }
    },
    formatted_address: 'Cl. 26 #43G -30, El Poblado, Medellín, El Poblado, Medellín, Antioquia, Colombia'
  }
  // {
  //   key: '4',
  //   number: '3202694642',
  //   geometry: {
  //     location: {
  //       lat: 0,
  //       lng: 0
  //     }
  //   },
  //   formatted_address: 'Avenida ciudad de cali.  22f 18'
  // }
]
