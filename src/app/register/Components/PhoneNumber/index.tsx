'use client'
import { useState } from 'react'
import { NumberForm } from './NumberForm'
import { CodeForm } from './CodeForm'
import { useData } from '@/store'

export function PhoneNumber ({ onClose }: { onClose: any }) {
  const { kitchen } = useData()

  const [step, setStep] = useState<number>(0)
  const [number, setNumber] = useState(kitchen ? kitchen.phone_number as any : '')
  const [code, setCode] = useState<any>(null)

  function createCode () {
    const code = (Math.floor(100000 + Math.random() * 900000)).toString()
    setCode(code)
    fetch('/api/send_sms', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, number })
    }).then(res => res.json())
  }

  if (step === 0) {
    return (
      <NumberForm
        setStep={setStep}
        number={number}
        setNumber={setNumber}
        createCode={createCode}
      />
    )
  }

  return (
    <CodeForm
      code={code}
      setStep={setStep}
      onClose={onClose}
      number={number}
    />
  )
}
