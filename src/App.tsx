import { useState } from 'react'
import { Button } from './components/Button'
import { Calendar } from './components/Calendar'

const sizes = ['xlarge', 'large', 'medium', 'small', 'xsmall'] as const
const variants = ['primary', 'secondary', 'tertiary'] as const

export default function App() {
  const [singleDate, setSingleDate] = useState<Date | null>(null)
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })

  return (
    <div style={{ padding: '40px', fontFamily: 'Pretendard, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Button */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '40px' }}>KRDS Button</h1>
      {variants.map((variant) => (
        <section key={variant} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px', textTransform: 'capitalize' }}>
            {variant}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>버튼</Button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} disabled>버튼</Button>
            ))}
          </div>
        </section>
      ))}

      {/* Calendar */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '60px 0 40px' }}>KRDS Calendar</h1>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>단일 선택</h2>
          <Calendar
            mode="single"
            value={singleDate}
            onChange={(d) => setSingleDate(d)}
            showFooter
            onCancel={() => setSingleDate(null)}
            onConfirm={() => {}}
          />
        </section>

        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>범위 선택</h2>
          <Calendar
            mode="range"
            rangeValue={range}
            onRangeChange={setRange}
            showFooter
            onCancel={() => setRange({ start: null, end: null })}
            onConfirm={() => {}}
          />
        </section>

      </div>
    </div>
  )
}
