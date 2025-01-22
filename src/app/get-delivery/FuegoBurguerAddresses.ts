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
  // chapinero
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
  // sede modelia
  // {
  //   key: '2',
  //   number: '3202694642',
  //   geometry: {
  //     location: {
  //       lat: 0,
  //       lng: 0
  //     }
  //   },
  //   formatted_address: 'Carrera 68 # 22f 18'
  // },
  // sede prado
  {
    key: '3',
    number: '3202694620',
    geometry: {
      location: {
        lat: 4.7199839,
        lng: -74.0564799
      }
    },
    formatted_address: 'Cl. 134a #50-27, Suba, Bogotá, Colombia'
  },
  // sede poblado
  {
    key: '4',
    number: '',
    geometry: {
      location: {
        lat: 6.226800099999999,
        lng: -75.5724937
      }
    },
    formatted_address: 'Cl. 26 #43G -30, El Poblado, Medellín, El Poblado, Medellín, Antioquia, Colombia'
  },
  // sede bello
  {
    key: '5',
    number: '',
    geometry: {
      location: {
        lat: 6.3136148,
        lng: -75.5610805
      }
    },
    formatted_address: 'Cl. 24 #55-04, Guayacanes Del Norte, Bello, Antioquia, Colombia'
  }
]
