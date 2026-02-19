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

## 배포

`v` 로 시작하는 태그를 push하면 GitHub Actions가 자동으로 GitHub Packages에 배포합니다.

```bash
git tag v0.1.0
git push origin v0.1.0
```
