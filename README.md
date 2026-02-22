# @chipmunk-woori/krds-components

KRDS(한국 전자정부 디자인 시스템) 기반 React 컴포넌트 라이브러리.

---

## 설치

### 1. GitHub Packages 인증 설정

GitHub Packages에서 설치하려면 먼저 인증이 필요합니다.

프로젝트 루트에 `.npmrc` 파일을 생성하세요:

```
@chipmunk-woori:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> GitHub Personal Access Token은 [Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)에서 발급. `read:packages` 권한 필요.

### 2. 패키지 설치

```bash
npm install @chipmunk-woori/krds-components
```

---

## 폰트 설정

이 라이브러리는 **Pretendard** 폰트를 사용합니다. 폰트 파일을 직접 프로젝트에 복사해서 사용하세요.

### 1. 폰트 파일 복사

이 저장소의 `public/fonts/` 폴더를 사용하는 프로젝트의 `public/fonts/`에 복사합니다.

```
public/
└── fonts/
    ├── Pretendard-Thin.ttf
    ├── Pretendard-ExtraLight.ttf
    ├── Pretendard-Light.ttf
    ├── Pretendard-Regular.ttf
    ├── Pretendard-Medium.ttf
    ├── Pretendard-SemiBold.ttf
    ├── Pretendard-Bold.ttf
    ├── Pretendard-ExtraBold.ttf
    └── Pretendard-Black.ttf
```

### 2. @font-face 선언 추가

`src/styles/fonts.css` (또는 전역 CSS 파일)에 추가:

```css
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Thin.ttf') format('truetype');
  font-weight: 100;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-ExtraLight.ttf') format('truetype');
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Light.ttf') format('truetype');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Medium.ttf') format('truetype');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Bold.ttf') format('truetype');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Black.ttf') format('truetype');
  font-weight: 900;
  font-display: swap;
}
```

### 3. fonts.css import

`main.tsx` 최상단에 추가:

```ts
import './styles/fonts.css'
```

---

## CSS 가져오기

컴포넌트 스타일을 적용하려면 CSS를 반드시 import해야 합니다.

```ts
// main.tsx 또는 App.tsx 최상단
import '@chipmunk-woori/krds-components/dist/krds-components.css'
```

---

## 사용 예시

```tsx
import { Button } from '@chipmunk-woori/krds-components'
import '@chipmunk-woori/krds-components/dist/krds-components.css'

export default function Page() {
  return (
    <div>
      <Button variant="primary" size="large" onClick={() => alert('클릭!')}>
        확인
      </Button>

      <Button variant="secondary" size="medium">
        취소
      </Button>

      <Button variant="tertiary" size="small" disabled>
        비활성
      </Button>
    </div>
  )
}
```

---

## 컴포넌트

### Button

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | 버튼 스타일 |
| `size` | `'xlarge' \| 'large' \| 'medium' \| 'small' \| 'xsmall'` | `'medium'` | 버튼 크기 |
| `fullWidth` | `boolean` | `false` | 가로 전체 너비 |
| `iconLeft` | `ReactNode` | — | 텍스트 왼쪽 아이콘 |
| `iconRight` | `ReactNode` | — | 텍스트 오른쪽 아이콘 |
| `disabled` | `boolean` | `false` | 비활성 상태 |

`<button>` 태그의 모든 기본 HTML 속성(`onClick`, `type`, `aria-*` 등)도 그대로 사용할 수 있습니다.

#### 사이즈별 규격

| Size | 높이 | 패딩 | 폰트 |
|------|------|------|------|
| xlarge | 64px | 0 24px | 19px |
| large | 56px | 0 20px | 19px |
| medium | 48px | 0 16px | 17px |
| small | 40px | 0 12px | 15px |
| xsmall | 32px | 0 10px | 13px |

---

### Calendar

날짜 단일 선택 또는 범위 선택을 지원하는 달력 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `mode` | `'single' \| 'range'` | `'single'` | 선택 모드 |
| `value` | `Date \| null` | — | 단일 선택 값 (`mode="single"`) |
| `rangeValue` | `{ start: Date \| null; end: Date \| null }` | — | 범위 선택 값 (`mode="range"`) |
| `onChange` | `(date: Date) => void` | — | 단일 날짜 변경 콜백 |
| `onRangeChange` | `(range: { start, end }) => void` | — | 범위 변경 콜백 |
| `disabledDates` | `(date: Date) => boolean` | — | 비활성화할 날짜 지정 함수 |
| `initialMonth` | `Date` | — | 초기 표시 월 |
| `showFooter` | `boolean` | `false` | 확인/취소 버튼 푸터 표시 |
| `onCancel` | `() => void` | — | 취소 버튼 클릭 콜백 |
| `onConfirm` | `() => void` | — | 확인 버튼 클릭 콜백 |

```tsx
import { useState } from 'react'
import { Calendar } from '@chipmunk-woori/krds-components'

// 단일 선택
const [date, setDate] = useState<Date | null>(null)

<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  showFooter
  onCancel={() => setDate(null)}
  onConfirm={() => console.log(date)}
/>

// 범위 선택
const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
  start: null,
  end: null,
})

<Calendar
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  showFooter
  onCancel={() => setRange({ start: null, end: null })}
  onConfirm={() => console.log(range)}
/>
```

---

### Container

이미지, 뱃지, 제목, 설명, 링크를 포함하는 카드 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 카드 크기 |
| `title` | `string` | — | **(필수)** 카드 제목 |
| `description` | `string` | — | 카드 설명 텍스트 |
| `badge` | `string` | — | 상단 뱃지 텍스트 |
| `imageSrc` | `string` | — | 이미지 URL |
| `imageAlt` | `string` | `''` | 이미지 대체 텍스트 |
| `linkLabel` | `string` | `'바로가기'` | 링크 버튼 텍스트 |
| `onLinkClick` | `() => void` | — | 링크 클릭 콜백 |

```tsx
import { Container } from '@chipmunk-woori/krds-components'

<Container
  size="medium"
  badge="공지"
  title="타이틀 영역"
  description="간단한 설명이 들어가는 영역입니다."
  imageSrc="/example.jpg"
  onLinkClick={() => router.push('/detail')}
/>
```

---

### Header

유틸리티 바, 로고, GNB 내비게이션을 포함하는 헤더 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'union' \| 'horizontal'` | `'union'` | 레이아웃 타입 |
| `logo` | `ReactNode` | — | 로고 영역 (미지정 시 플레이스홀더) |
| `showSlogan` | `boolean` | — | 슬로건 표시 여부 |
| `officialNotice` | `string` | — | 공식 안내 문구 |
| `utilityItems` | `UtilityItem[]` | `[]` | 유틸리티 바 메뉴 목록 |
| `navItems` | `NavItem[]` | `[]` | GNB 내비게이션 메뉴 목록 |
| `headerMenuItems` | `NavItem[]` | `[]` | 헤더 내부 메뉴 (`variant="horizontal"` 전용) |

#### 타입 정의

```ts
interface NavItem {
  label: string
  href?: string
  onClick?: () => void
}

interface DropdownItem {
  label: string
  href?: string
  onClick?: () => void
}

interface UtilityItem {
  label: string
  href?: string
  onClick?: () => void
  dropdownItems?: DropdownItem[]  // 있으면 드롭다운 메뉴로 동작
}
```

```tsx
import { Header } from '@chipmunk-woori/krds-components'

<Header
  variant="union"
  utilityItems={[
    {
      label: '전체메뉴',
      dropdownItems: [
        { label: '서브메뉴1', onClick: () => {} },
        { label: '서브메뉴2', onClick: () => {} },
      ],
    },
    { label: '로그인', onClick: () => {} },
  ]}
  navItems={[
    { label: '메뉴1', onClick: () => {} },
    { label: '메뉴2', href: '/menu2' },
  ]}
/>
```

---

### Footer

관련 사이트, 주소/전화, 정보 항목, 유틸리티 링크, SNS, 저작권 영역을 포함하는 푸터 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `logo` | `ReactNode` | — | 로고 영역 (미지정 시 플레이스홀더) |
| `relatedSites` | `FooterRelatedSite[]` | `[]` | 상단 관련 사이트 목록 |
| `address` | `string` | — | 주소 텍스트 |
| `phones` | `FooterPhoneItem[]` | `[]` | 전화/연락처 목록 |
| `infoItems` | `FooterInfoItem[]` | `[]` | 정보 항목 목록 |
| `utilityLinks` | `FooterLink[]` | `[]` | 유틸리티 링크 목록 |
| `socialLinks` | `FooterSocialLink[]` | `[]` | SNS 링크 목록 |
| `policyLinks` | `FooterLink[]` | `[]` | 하단 정책 링크 목록 |
| `copyright` | `string` | — | 저작권 텍스트 |

#### 타입 정의

```ts
interface FooterRelatedSite { label: string; href?: string; onClick?: () => void }
interface FooterPhoneItem   { label: string; values: string[] }
interface FooterInfoItem    { label: string; value: string }
interface FooterLink        { label: string; href?: string; onClick?: () => void }
type FooterSocialType = 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'naverblog'
interface FooterSocialLink  { type: FooterSocialType; href?: string; onClick?: () => void }
```

```tsx
import { Footer } from '@chipmunk-woori/krds-components'

<Footer
  relatedSites={[{ label: '관련사이트', href: 'https://example.com' }]}
  address="서울특별시 종로구 세종대로 209"
  phones={[
    { label: '대표전화', values: ['02-2100-0000'] },
  ]}
  infoItems={[
    { label: '운영시간', value: '평일 09:00 ~ 18:00' },
  ]}
  utilityLinks={[{ label: '개인정보처리방침', onClick: () => {} }]}
  socialLinks={[
    { type: 'youtube', href: 'https://youtube.com' },
    { type: 'instagram', href: 'https://instagram.com' },
  ]}
  policyLinks={[{ label: '이용약관', onClick: () => {} }]}
  copyright="© 2025 Ministry of the Interior and Safety."
/>
```

---

### SideNavigation

2depth 아코디언 방식의 사이드 내비게이션 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | — | **(필수)** 상단 1depth 제목 |
| `sections` | `SideNavSection[]` | — | **(필수)** 2depth 섹션 목록 |

#### 타입 정의

```ts
interface SideNavSubItem {
  label: string
  href?: string
  onClick?: () => void
}

interface SideNavSection {
  label: string
  items: SideNavSubItem[]
  defaultOpen?: boolean  // 기본 펼침 여부
}
```

```tsx
import { SideNavigation } from '@chipmunk-woori/krds-components'

<SideNavigation
  title="주요서비스"
  sections={[
    {
      label: '정보공개',
      defaultOpen: true,
      items: [
        { label: '공공데이터', onClick: () => {} },
        { label: '행정정보', href: '/admin-info' },
      ],
    },
    {
      label: '민원서비스',
      items: [
        { label: '민원신청', onClick: () => {} },
      ],
    },
  ]}
/>
```

---

### Pagination

페이지 번호 이동 및 직접 입력을 지원하는 페이지네이션 컴포넌트.

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `currentPage` | `number` | — | **(필수)** 현재 페이지 (1부터 시작) |
| `totalPages` | `number` | — | **(필수)** 전체 페이지 수 |
| `onChange` | `(page: number) => void` | — | **(필수)** 페이지 변경 콜백 |
| `showPageInput` | `boolean` | `true` | 페이지 직접 입력 영역 표시 |

```tsx
import { useState } from 'react'
import { Pagination } from '@chipmunk-woori/krds-components'

const [page, setPage] = useState(1)

<Pagination
  currentPage={page}
  totalPages={99}
  onChange={setPage}
/>

// 입력창 없이 버튼만 표시
<Pagination
  currentPage={page}
  totalPages={10}
  onChange={setPage}
  showPageInput={false}
/>
```

---

## 배포

`v` 로 시작하는 태그를 push하면 GitHub Actions가 자동으로 GitHub Packages에 배포합니다.

```bash
git tag v0.1.0
git push origin v0.1.0
```
