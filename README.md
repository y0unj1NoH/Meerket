# 🤝 meerket

<p align="center">
  <img src="./public/Logo.svg" alt="미어켓 Logo" width="300">
</p>

## 배포 주소

[meerket.vercel.appp](https://meerket.vercel.app/)

## 스토리북 링크
[meerket-storybook](https://meerket-storybook.vercel.app/)

## 백앤드 레포지토리

[meerket-backend](https://github.com/prgrms-web-devcourse-final-project/WEB1_1_J1P5_BE)


## 팀원 소개

| 안준우                               | 이예진                                | 노윤지                                 | 
| ----------------------------------- | --------------------------------------- | --------------------------------------- | 
| [JW-Ahn0](https://github.com/JW-Ahn0) | [ppyom](https://github.com/ppyom) | [y0unj1NoH](https://github.com/y0unj1NoH) | 

## 개발 기간

- 기획: 2024.11.11 ~ 2024.11.15
- 개발: 2024.11.18 ~ 진행 중

## 프로젝트 소개

중고 물품 처분에 대해 고민하거나 제 값을 주고 팔기 어려운 물품이 있던 경험이 있으신가요? 
저희가 개발하려는 서비스는 중고 거래 경매 서비스입니다.

### 기획 배경

- **리커머스(리셀 커머스) 시장의 확대로 인한 중고 거래 시장의 호황기(25년 43조원 규모 추정)**

- **중고 물품 구매 시 선착순의 가치가 큰 것에 대한 불편함**

- **중고 물품 처분에 있어 물품에 대한 가치 판단의 애매함**

### -> 경매 시스템을 도입하여 이러한 불편함 해소


<details>

<summary>프로젝트 초기화</summary>

## 프로젝트 초기화

## 프로젝트 초기화

```shell
yarn create vite
```

## 스토리북 설치

```shell
# yarn 1 버전에서는 최신 버전에서 사용 가능한 dlx 명령어가 작동하지 않음 (yarn dlx storybook@latest init)
# npx 명령어를 사용해도 별도로 문제될 부분은 없기 때문에 npx 사용
npx storybook@latest init
```

## ESLint

> [우아한 기술 블로그 우리 팀을 위한 ESLint, Prettier 공유 컨피그 만들어보기](https://techblog.woowahan.com/15903/) 참고

- 위 링크에 작성된 eslint config 하나로 묶어서 사용할 수 있게 설정파일 작성
- eslint 버전(9.13.0)에서 `rushstack`을 사용할 수 없어 버전을 8.57.1로 변경
- package.json에 자동으로 작성된 storybook eslint 플러그인 config 파일로 이동

### 플러그인 설치

```shell
# eslint config를 변경하면서 사용하지 않는 패키지 제거
yarn remove globals @eslint/js typescript-eslint
yarn add --dev @rushstack/eslint-config eslint-plugin-jsx-a11y eslint-plugin-no-relative-import-paths eslint-plugin-react @tanstack/eslint-plugin-query
```

- @rushstack/eslint-config
- eslint-plugin-jsx-a11y
- eslint-plugin-no-relative-import-paths
- @tanstack/eslint-plugin-query

## 라이브러리

```shell
yarn add react-router-dom
yarn add zustand @tanstack/react-query @tanstack/react-query-devtools
yarn add @emotion/react @emotion/styled
yarn add swiper react-icons
yarn add lodash-es react-hook-form
```

</details>
