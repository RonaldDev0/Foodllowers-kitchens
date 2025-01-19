import { Card, CardHeader, CardBody, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { Settings } from 'lucide-react'

export type IAddress = {
  key: string,
  number: string,
  formatted_address: string,
  geometry: {
    location: {
      lat: number,
      lng: number
    }
  }
}

type Props = {
  address: IAddress
}

export function AddressCard ({ address }: Props) {
  return (
    <Card className='w-96'>
      <CardHeader>{address.formatted_address}</CardHeader>
      <CardBody>
        <p>{address.number}</p>
        <Dropdown>
          <DropdownTrigger>
            <Button color='primary' variant='light'>
              <Settings size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem key='edit' onPress={() => {}}>
              Editar dirección
            </DropdownItem>
            <DropdownItem
              key='delete'
              onClick={() => {}}
              className='text-danger'
              color='danger'
            >
              Borrar direccion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}
