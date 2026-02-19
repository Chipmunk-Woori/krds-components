import { Button } from './components/Button'

const sizes = ['xlarge', 'large', 'medium', 'small', 'xsmall'] as const
const variants = ['primary', 'secondary', 'tertiary'] as const

export default function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Pretendard GOV, Pretendard, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '40px' }}>
        KRDS Button
      </h1>

      {variants.map((variant) => (
        <section key={variant} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px', textTransform: 'capitalize' }}>
            {variant}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                버튼
              </Button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} disabled>
                버튼
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
