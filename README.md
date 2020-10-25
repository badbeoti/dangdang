# 서울특별시 공공데이터와 D3.js를 활용한 반응형 차트

## 사용 스펙

- D3.js
- React.js
- typescript
- styled-components
- CRA(create react app)
- 서울특별시 공공데이터
- gh-pages

## 간단 소개

서울특별시 열린데이터 광장에서 제공하는 따릉이 대여소 데이터를 활용하여 만든
반응형 그래프 차트입니다. 차트는 기본 한글순으로 정렬 돼있으나 크기별로 정렬할 수 있고,
Reset이나 Update 버튼을 통하여 보고싶은 구만을 지정할 수 있습니다.
단위 변경 버튼으로 거치대 수, 자전거 수를 달리 비교할 수 있습니다.
모든 컴포넌트는 함수형으로 제작했습니다.
React Hooks를 사용하고, 스타일은 styled-components로 제작했습니다.
CRA로 프로젝트를 구성하고, 배포는 gh-pages로 작업했습니다.

## 주로 사용한 D3.js API

#### d3.axisBottom, d3.axisRight

#### d3.max, d3.bandwidth

#### d3.group

#### d3.scaleLinear, d3.scaleBand

#### d3-scale-chromatic

#### d3.transition
