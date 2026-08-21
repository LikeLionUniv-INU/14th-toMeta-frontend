import { createGlobalStyle } from 'styled-components';

export const media = {
  mobileM: '(min-width: 376px)',
  mobileL: '(min-width: 431px)',
};

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Eommakkaturi';
    src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/Katuri.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
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
    user-select: none;
    -webkit-user-select: none;
    overscroll-behavior-y: none;
    overflow-x: hidden;

    background-color: #fffffa;
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
