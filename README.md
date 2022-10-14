# 하이 | 오디오 재생 프로그램 만들기

## 1. 프로젝트 개요

- 과제 주관 : 하이
- 작업 기간 : 2022년 10월 11일 ~ 2022년 10월 14일
- 참여 인원 : 3명 - 김민욱, 김영수, 이주리
- 기술 스택 : HTML5, React.js, Styled-components, Web Audio API
- 구현사이트 : [https://sensational-lokum-2c6f90.netlify.app/](https://sensational-lokum-2c6f90.netlify.app/)

## 2. 팀원 역할 분할

- 김영수 - 초기세팅, 다운로드 기능
- 김민욱(PO) - 레이아웃, 반응형, 오디오 녹음 기능, 병합 및 리팩토링
- 이주리 - 음성 재생 기능, 배포

## 3. 프로젝트 구조

```
📦src
 ┣ 📂Components
 ┃ ┗ 📜RecodeButton.js
 ┣ 📂Pages
 ┃ ┣ 📂PlayAudio
 ┃ ┃ ┗ 📜PlayAudio.js
 ┃ ┗ 📂RecAudio
 ┃ ┃ ┗ 📜RecAudio.js
 ┣ 📂Styles
 ┃ ┣ 📜GlobalStyle.js
 ┃ ┗ 📜theme.js
 ┣ 📜Router.js
 ┗ 📜index.js
```

## 4. 구현 기능

### 공통: 오디오 파일 다운로드

- Blob생성자를 통하여 녹음한 오디오 파일의 File객체로 부터 Blob URL을 생성하여 다운로드 기능 구현

### 오디오 녹음

- Web Audio API 인터페이스의 AudioContext를 사용
- mediaRecorder 컨텍스트 생성 후 AudioContext의 다른 노드들을 연결하여 녹음 기능구현
- 녹음 중 pause와 resume기능 구현
- Blob과 Flie 생성자를 통해 이용가능한 음성파일로 변환하여 미리듣기 밑 다운로드 구현

### 음성 재생

- Web Audio API 인터페이스의 AudioContext를 사용하여 오디오 데이터 재생
- AudioContext의 resume(), suspend()를 통해 재생, 일시정지 구현
- useState를 통한 상태관리로 재생시 ‘일시정지’버튼 표시, 일시정지시 ‘재생’버튼 표시
- AudioContext의 currentTime 데이터를 받아와서 setInterval함수 활용하여 실시간 재생시간 표시

<img width="800" alt="image" src="https://user-images.githubusercontent.com/100172541/195738371-f9abb18f-0a61-400d-9729-3ab53892054c.png">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/100172541/195738410-53771604-da18-4fb1-99d6-d2452424a55d.png">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/100172541/195738433-65691b52-2405-4cb2-a151-d6770d0b022c.png">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/100172541/195738467-06ad9618-dbce-4227-a1ef-1959dda1438d.png">



