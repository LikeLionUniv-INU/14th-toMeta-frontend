import styled, { keyframes, css } from 'styled-components';

export const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background-color: #ffffff;
`;

export const BgLayer = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(p) => p.$src});
  background-size: cover;
  background-position: center;
  z-index: ${(p) => p.$z};
  opacity: ${(p) => (p.$hidden ? 0 : 1)};
  transition: opacity 0.5s ease;

  /* 이미지 가장자리(특히 drs-lab.png의 위/아래 페이드 처리)가 세로가 긴
     화면에서 background-size: cover만으로는 안 잘리고 남아 흰 여백처럼
     보이는 걸 막기 위해 살짝 확대해서 가장자리를 화면 밖으로 밀어낸다. */
  transform: scale(1.15);
  transform-origin: center;
`;

// 여드름 위치(핫스팟)와 여박사님이 최종적으로 자리잡는 중앙 위치.
// 핫스팟에서 뿅 튀어나와 중앙으로 이동하는 애니메이션의 시작/끝 좌표로 공유해서 쓴다.
// (BgLayer가 1.15배 확대되는 만큼, 실제 화면에 보이는 여드름 위치(약 73%, 42%)와
// 맞도록 역산한 좌표를 사용한다.)
const HOTSPOT_LEFT = '76%';
const HOTSPOT_TOP = '43%';
const DR_CENTER_LEFT = '50%';
const DR_CENTER_TOP = '52%';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.65); }
  70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

export const Hotspot = styled.button`
  position: absolute;
  left: ${HOTSPOT_LEFT};
  top: ${HOTSPOT_TOP};
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 15;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

const popRing = keyframes`
  0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0.9; }
  100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0; }
`;

export const PopRing = styled.div`
  position: absolute;
  left: ${HOTSPOT_LEFT};
  top: ${HOTSPOT_TOP};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  z-index: 16;
  pointer-events: none;
  animation: ${popRing} 0.5s ease-out forwards;
`;

// 핫스팟(여드름 위치)에서 작게 튀어나와 화면 중앙까지 이동하며 커지는 등장 애니메이션
const popInFromHotspot = keyframes`
  0% {
    left: ${HOTSPOT_LEFT};
    top: ${HOTSPOT_TOP};
    transform: translate(-50%, -50%) scale(0.15);
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  80% {
    transform: translate(-50%, -50%) scale(1.12);
  }
  100% {
    left: ${DR_CENTER_LEFT};
    top: ${DR_CENTER_TOP};
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

export const DrImage = styled.img`
  position: absolute;
  left: ${HOTSPOT_LEFT};
  top: ${HOTSPOT_TOP};
  width: 65%;
  z-index: 10;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.15);
  pointer-events: none;

  ${(p) =>
    p.$visible &&
    css`
      animation: ${popInFromHotspot} 0.4s cubic-bezier(0.34, 1.16, 0.64, 1)
        forwards;
    `}
`;

export const SkipButton = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  z-index: 25;
  margin: 0 auto;
  width: fit-content;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  font-weight: 600;
  padding: 8px 14px;
  cursor: pointer;
`;

export const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 150px;
  z-index: 20;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

export const CaptionBubble = styled.p`
  margin: 0;
  max-width: 320px;
  min-height: 1.5em;
  background-color: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  padding: 10px 15px;
  border-radius: 20px;
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

export const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
  background-color: currentColor;
  vertical-align: -0.15em;
  animation: ${blink} 0.9s steps(1) infinite;
`;

export const MessageWrap = styled.button`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 90px;
  z-index: 20;
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  font: inherit;
  cursor: ${(p) => (p.$active ? 'pointer' : 'default')};
`;

export const NameTag = styled.div`
  position: relative;
  left: 20px;
  z-index: 1;
  display: inline-block;
  background-color: #adeed1;
  color: #04895c;
  font-size: 30px;
  font-weight: 700;
  padding: 10px 18px;
  border: 1px solid #609668;
  border-radius: 20px;
  margin-bottom: -10px;
`;

export const MessageBox = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 148px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px 22px 26px 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
`;

export const MessageText = styled.p`
  margin: 0;
  white-space: pre-line;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  color: #1a1a1a;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
`;

export const ContinueArrow = styled.div`
  position: absolute;
  right: 18px;
  bottom: 12px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #63bf8e;
  animation: ${bounce} 1s ease-in-out infinite;
`;

const blackoutFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Blackout = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000000;
  z-index: 100;
  animation: ${blackoutFade} 0.8s ease-in-out forwards;
`;
