import { useState } from 'react'
import { Button } from './components/Button'
import { Calendar } from './components/Calendar'
import { Container } from './components/Container'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Pagination } from './components/Pagination'
import { SideNavigation } from './components/SideNavigation'

const sizes = ['xlarge', 'large', 'medium', 'small', 'xsmall'] as const
const variants = ['primary', 'secondary', 'tertiary'] as const

export default function App() {
  const [paginationPage, setPaginationPage] = useState(1)
  const [singleDate, setSingleDate] = useState<Date | null>(null)
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })

  const utilityItems = [
    {
      label: '전체메뉴',
      dropdownItems: [
        { label: '유틸리티 레이블', onClick: () => {} },
        { label: '유틸리티 레이블', onClick: () => {} },
        { label: '유틸리티 레이블', onClick: () => {} },
        { label: '유틸리티 레이블', onClick: () => {} },
      ],
    },
    { label: '로그인', onClick: () => {} },
    { label: '사이트맵', onClick: () => {} },
  ]
  const navItems = [
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
  ]
  const headerMenuItems = [
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
    { label: '메뉴명', onClick: () => {} },
  ]

  return (
    <div style={{ fontFamily: 'Pretendard, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Header */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, padding: '40px 40px 16px' }}>KRDS Header</h1>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, padding: '0 40px 16px' }}>variant="union"</h2>
        <div style={{ background: '#fff', border: '1px solid #d6e0eb' }}>
          <Header
            variant="union"
            utilityItems={utilityItems}
            navItems={navItems}
          />
        </div>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, padding: '0 40px 16px' }}>variant="horizontal"</h2>
        <div style={{ border: '1px solid #d6e0eb' }}>
          <Header
            variant="horizontal"
            utilityItems={utilityItems}
            headerMenuItems={headerMenuItems}
            navItems={navItems}
          />
        </div>
      </section>

      <div style={{ padding: '0 40px' }}>

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

      {/* Container */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '60px 0 40px' }}>KRDS Container</h1>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Small</h2>
          <Container
            size="small"
            badge="뱃지"
            title="타이틀 영역"
            description="간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다."
            onLinkClick={() => {}}
          />
        </section>
        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Medium</h2>
          <Container
            size="medium"
            badge="뱃지"
            title="타이틀 영역"
            description="간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다."
            onLinkClick={() => {}}
          />
        </section>
        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Large</h2>
          <Container
            size="large"
            badge="뱃지"
            title="타이틀 영역"
            description="간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다."
            onLinkClick={() => {}}
          />
        </section>
      </div>
      </div>

      {/* Pagination */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, padding: '60px 40px 16px' }}>KRDS Pagination</h1>
      <section style={{ padding: '0 40px 60px' }}>
        <Pagination
          currentPage={paginationPage}
          totalPages={99}
          onChange={setPaginationPage}
        />
      </section>

      {/* SideNavigation */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, padding: '60px 40px 16px' }}>KRDS SideNavigation</h1>
      <section style={{ padding: '0 40px 60px' }}>
        <SideNavigation
          title="1Depth-title"
          sections={[
            {
              label: '2Depth',
              items: [
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
              ],
            },
            {
              label: '2Depth',
              items: [
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
              ],
            },
            {
              label: '2Depth',
              items: [
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
              ],
            },
            {
              label: '2Depth-open',
              defaultOpen: true,
              items: [
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
                { label: 'Last depth', onClick: () => {} },
              ],
            },
          ]}
        />
      </section>

      {/* Footer */}
      <h1 style={{ fontSize: '24px', fontWeight: 700, padding: '60px 40px 16px' }}>KRDS Footer</h1>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, padding: '0 40px 16px' }}>variant="pc"</h2>
        <Footer
          relatedSites={[
            { label: 'related_site', onClick: () => {} },
            { label: 'related_site', onClick: () => {} },
            { label: 'related_site', onClick: () => {} },
            { label: 'related_site', onClick: () => {} },
          ]}
          address="주소를 입력해주세요"
          phones={[
            { label: '정보 레이블', values: ['010-0000-0000', '정보를 입력해주세요'] },
            { label: '정보 레이블', values: ['email2025@korea.com', '정보를 입력해주세요'] },
            { label: '정보 레이블', values: ['oooooo@korea.com', '정보를 입력해주세요'] },
          ]}
          infoItems={[
            { label: '정보입력', value: '중요한 정보를 입력해주세요' },
            { label: '정보입력', value: '중요한 정보를 입력해주세요' },
            { label: '정보입력', value: '중요한 정보를 입력해주세요' },
          ]}
          utilityLinks={[
            { label: '유틸리티 링크', onClick: () => {} },
            { label: '유틸리티 링크', onClick: () => {} },
            { label: '유틸리티 링크', onClick: () => {} },
            { label: '유틸리티 링크', onClick: () => {} },
            { label: '유틸리티 링크', onClick: () => {} },
            { label: '유틸리티 링크', onClick: () => {} },
          ]}
          socialLinks={[
            { type: 'instagram', onClick: () => {} },
            { type: 'youtube', onClick: () => {} },
            { type: 'twitter', onClick: () => {} },
            { type: 'facebook', onClick: () => {} },
            { type: 'naverblog', onClick: () => {} },
          ]}
          policyLinks={[
            { label: '개인정보처리방침', onClick: () => {} },
            { label: '이용약관', onClick: () => {} },
            { label: '보안센터', onClick: () => {} },
            { label: '웹 접근성 품질인증 마크 획득', onClick: () => {} },
            { label: '정책명', onClick: () => {} },
          ]}
          copyright="© 2023 Ministry of the Interior and Safety. All rights reserved."
        />
      </section>
    </div>
  )
}
