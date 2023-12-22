'use client'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { Card, CardBody } from '@nextui-org/react'

interface IProps {
  data: {}[] | any
  bars: {
    dataKey: string
    value: string
    color: string
  }[]
  XDataKey: string
  getIntroOfPage: Function
}

function CustomTooltip ({ active, payload, label, getIntroOfPage }: any) {
  if (active && payload && payload.length) {
    return (
      <div className='dark:bg-black dark:border-none bg-white border p-4 rounded-lg'>
        <p>{label}</p>
        {payload?.map(({ name, value, color }: any) => (
          <div key={name} className='flex gap-2'>
            <p style={{ color }}>
              {name.split('.')[name.split.length - 1]} :
            </p>
            <p>{value}</p>
          </div>
        ))}
        <p>{getIntroOfPage(label)}</p>
      </div>
    )
  }
}

export function Graphic ({ data, bars, XDataKey, getIntroOfPage }: IProps) {
  return (
    <Card className='w-[600px]'>
      <CardBody className='scrollbar-hide'>
        <ResponsiveContainer width='100%' aspect={2}>
          <BarChart data={data} width={500} height={300}>
            <CartesianGrid strokeDasharray='4 1 2' />
            <XAxis dataKey={XDataKey} />
            <YAxis />
            <Legend payload={bars} />
            <Tooltip content={<CustomTooltip getIntroOfPage={getIntroOfPage} />} />
            {bars.map(({ dataKey, color }) => (
              <Bar key={dataKey} dataKey={dataKey} fill={color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
