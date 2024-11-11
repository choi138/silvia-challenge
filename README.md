# Silvia Challenge

## Table of Contents

- [폴더 구조](#폴더-구조)
- [기술 스택](#기술-스택)
- [라이브러리 설명](#라이브러리-설명)
- [NVM을 이용한 NodeJS 버전 설정](#NVM을-이용한-NodeJS-버전-설정)
- [구동 방법](#구동-방법)

## 폴더 구조

```bash
App.tsx
./src
├── assets
├── components
├── constants
├── hooks
├── navigators
├── providers
├── screens
├── stores
├── styles
├── types
└── utils
```

- App.tsx: 애플리케이션의 루트 컴포넌트로, 모든 하위 컴포넌트를 포함하고 전체 애플리케이션의 구조를 정의합니다.
- assets: 이미지, GIF 등의 정적 파일이 포함되어 있습니다.
- components: 컴포넌트 및 레이아웃이 포함되어 있습니다.
- constants: 애플리케이션에서 사용되는 상수가 포함되어 있습니다.
- hooks: 페이지 이동을 도와주는 네비게이션 훅이 포함되어 있습니다.
- navigators: 바텀탭 네비게이션 및 스택 네비게이션이 포함되어 있습니다.
- providers: 전역 상태 관리를 위한 모달 컨텍스트 프로바이더가 포함되어 있습니다.
- screens: 앱의 홈 화면 등이 포함되어 있습니다.
- stores: 전역 상태 관리를 위한 게임 스토어 등이 포함되어 있습니다.
- styles: 전역 스타일(색깔 등)이 포함되어 있습니다.
- types: 타입 정의가 포함되어 있습니다.
- utils: 유틸리티 함수가 포함되어 있습니다.

## 기술 스택

- React Native
- ReactJs
- Zustand
- Emotion
- ESLint
- Expo
- Yarn (node-modules)
- TypeScript
- NodeJS
- NVM

## 라이브러리 설명

- @emotion/native, @emotion/react: CSS-in-JS 라이브러리로, 컴포넌트 스타일링을 위해 사용합니다.
- @fortawesome/\*: Font Awesome 아이콘을 사용하기 위한 라이브러리로, 아이콘을 사용하기 위해 사용합니다.
- @react-native-async-storage/async-storage: 앱의 로컬 스토리지를 위한 라이브러리로, 로컬 스토리지를 사용하기 위해 사용합니다.
- @react-navigation/\*: 네비게이션을 위한 라이브러리로, 페이지 이동을 위해 사용합니다.
- expo: React Native 앱 개발을 위한 라이브러리로, 앱 개발을 위해 사용합니다.
- expo-linear-gradient: 그라디언트를 사용하기 위한 라이브러리로, react-native-gifted-charts 라이브러리의 종속성으로 사용합니다.
- expo-status-bar: 앱의 상태 바를 사용하기 위해 사용합니다.
- react: React 라이브러리로, React Native 앱 개발을 위해 사용합니다.
- react-native: React Native 앱 개발을 위해 사용합니다.
- react-native-gesture-handler: 제스처를 사용하기 위한 라이브러리로, react-navigation 라이브러리의 종속성으로 사용합니다.
- react-native-gifted-charts: 차트를 사용하기 위해 사용합니다.
- react-native-safe-area-context: 안전한 영역을 사용하기 위해 사용합니다.
- react-native-screens: 스크린을 사용하기 위한 라이브러리로, react-navigation 이 네비게이션 라이브러리의 종속성으로 사용합니다.
- react-native-svg: SVG를 사용하기 위한 라이브러리로, Font Awesome 아이콘 라이브러리의 종속성으로 사용합니다.
- zustand: 전역 상태 관리를 위해 사용합니다.

## NVM을-이용한-NodeJS-버전-설정

```bash
nvm use

# 버전 설치가 안되어 있을 경우
nvm install & nvm use

# 버전 확인
node -v # v20.14.0
```

## 구동 방법

```bash
# 패키지 설치
yarn install

# 앱 실행
yarn start
```
