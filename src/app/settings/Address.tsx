'use client'
import { useState, useEffect, FC } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { Input, Card, CardHeader, CardBody, CardFooter, CircularProgress, Button } from '@nextui-org/react'
import { MapPin } from 'lucide-react'
import { useSupabase } from '@/app/providers'
import { useData } from '@/store'

// Bogota position
const position = { lat: 4.645000, lng: -74.101750 }
const bounds = {
  latLngBounds: {
    south: 4.524361711687331,
    west: -74.20901080492014,
    north: 4.77892461009049,
    east: -74.01207250779134
  },
  strictBounds: true
}

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

const Toast: FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className='fixed bottom-0 right-0 m-6 animate-bounce'>
      <div className='bg-green-500 border-l-4 border-green-700 text-white px-4 py-2 shadow-md rounded-lg transform transition duration-500 ease-in-out hover:scale-105'>
        <div className='flex items-center justify-center gap-5'>
          <span className='font-bold'>{message}</span>
          <button onClick={onClose} className='text-2xl leading-none hover:text-gray-300'>&times;</button>
        </div>
      </div>
    </div>
  )
}

export function Address () {
  const { supabase } = useSupabase()
  const { kitchenId, kitchenAddress, setStore } = useData()

  const [address, setAddress] = useState<any>(null)
  const [addressError, setAddressError] = useState(false)
  const [input, setInput] = useState<string>('')
  const [markerPosition, setMarkerPosition] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState<any>(position)
  const [predictionss, setPredictions] = useState<any>([])
  const [openAutoComplete, setOpenAutoComplete] = useState(false)
  const [mapZoom, setMapZoom] = useState(13)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [toastVisible, setToastVisible] = useState(false)

  function showToast () {
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

  function handleMapClick (latLng: any) {
    setMarkerPosition(latLng)

    fetch('/api/maps_geo', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latLng)
    })
      .then(res => res.json())
      .then(data => {
        setAddressError(false)
        setAddress(data.results[0])
        setInput(data.results[0].formatted_address)
      })
  }

  function handlePredictionClick (prediction: any) {
    setAddressError(false)
    setAddress(prediction)
    setMapCenter(prediction.geometry.location)
    setMarkerPosition(prediction.geometry.location)
    setInput(prediction.formatted_address)
    setOpenAutoComplete(false)
    setMapZoom(18)
  }

  function handleFetch () {
    fetch('/api/maps_auto_complete', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ place: input })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error_message) {
          return
        }
        setLoading(false)
        setPredictions(res.results)
      })
  }

  function handleChange () {
    if (timeoutId) clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      handleFetch()
    }, 1000)
    setTimeoutId(newTimeoutId)
  }

  const handleSubmit = () => {
    if (!address) {
      setAddressError(true)
      return
    }
    supabase
      .from('kitchens')
      .update({ address })
      .eq('id', kitchenId)
      .select('*')
      .then(({ data }) => {
        if (!data?.length) {
          return
        }
        setStore('kitchenAddress', data[0].address)
        showToast()
      })
  }

  useEffect(() => {
    if (kitchenAddress) {
      setAddress(kitchenAddress)
      setInput(kitchenAddress.formatted_address)
      setMarkerPosition(kitchenAddress.geometry.location)
      setMapCenter(kitchenAddress.geometry.location)
    }
  }, [kitchenAddress])

  return (
    <Card className='w-96'>
      <Toast message='Dirección guardada' isVisible={toastVisible} onClose={() => setToastVisible(false)} />
      <CardHeader>
        Tu dirección
      </CardHeader>
      <CardBody>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='w-full rounded relative'>
              <Input
                autoComplete='off'
                placeholder='Escribe tu ubicación'
                value={input}
                errorMessage={addressError && 'Este campo es obligatorio'}
                isInvalid={addressError}
                onChange={e => {
                  setAddress(null)
                  setAddressError(false)
                  handleChange()
                  setInput(e.target.value)
                  setLoading(true)
                  setOpenAutoComplete(true)
                  setMarkerPosition(null)
                  setPredictions([])
                }}
              />

              {openAutoComplete && (
                <Card className='absolute z-50 rounded mt-2 w-full bg-neutral-800 transition-all'>
                  <div>
                    {loading && (
                      <div className='w-full my-2 flex justify-center items-center'>
                        <CircularProgress color='secondary' aria-label='Loading...' />
                      </div>
                    )}
                    {predictionss.map((prediction: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => handlePredictionClick(prediction)}
                        className='hover:bg-purple-950 transition-all py-5 flex items-center gap-3 px-5 cursor-pointer rounded'
                      >
                        <div>
                          <MapPin size={28} />
                        </div>
                        <p>{prediction.formatted_address}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            <div className='h-72 w-full' onClick={() => setOpenAutoComplete(false)}>
              <Map
                fullscreenControl
                center={mapCenter}
                onCenterChanged={res => setMapCenter(res.detail.center)}
                minZoom={11}
                zoom={mapZoom}
                onZoomChanged={res => setMapZoom(res.detail.zoom)}
                gestureHandling='greedy'
                mapId={process.env.NEXT_PUBLIC_MAP_ID!}
                disableDefaultUI
                restriction={bounds}
                onClick={({ detail: { latLng } }) => handleMapClick(latLng)}
                onDrag={() => setOpenAutoComplete(false)}
              >
                {markerPosition && (
                  <AdvancedMarker
                    position={markerPosition}
                    draggable
                    onDragEnd={({ latLng }) => {
                      const coordenates = { lat: latLng?.lat(), lng: latLng?.lng() }
                      setMarkerPosition(coordenates)
                    }}
                  />
                )}
              </Map>
            </div>
          </div>
        </APIProvider>
      </CardBody>
      <CardFooter>
        <Button
          className='w-full text-base'
          color='secondary'
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </CardFooter>
    </Card>
  )
}
