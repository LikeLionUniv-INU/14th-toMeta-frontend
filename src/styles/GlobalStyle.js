import { createGlobalStyle } from 'styled-components';

// 1. 미디어 쿼리 규격 정의
export const media = {
  mobileM: '(min-width: 376px)', // 일반 모바일
  mobileL: '(min-width: 431px)', // 대형 모바일, 폴더블 등
};

// 2. 프로젝트 전체 리셋 및 웹앱 기본 스타일
export const GlobalStyle = createGlobalStyle`
  /* 1. 전체 기본 폰트 Wanted Sans 가변 폰트는 index.html의 <link>로 로드 */

  /* 2. 엄마까투리체 등록 */
  @font-face {
    font-family: 'Eommakkaturi';
    src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/Katuri.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
/* 3. 스플래쉬 화면 둥근모꼴 폰트 등록 */
  @font-face {
    font-family: 'NeoDunggeunmo';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    
    font-family: 'Wanted Sans Variable', 'Wanted Sans', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', sans-serif;
    //background-color: #f5f5f5; 
    //color: #333333;
    user-select: none;
    -webkit-user-select: none;
    overscroll-behavior-y: none;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  button, a, input, textarea {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
`;
