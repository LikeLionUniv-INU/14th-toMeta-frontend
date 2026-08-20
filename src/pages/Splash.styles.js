import styled, { keyframes, css } from 'styled-components';
import { media } from '../styles/GlobalStyle';

export const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
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

  transform: scale(1.15);
  transform-origin: center;
`;

// 핫스팟, 여박사 위치
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

// 여 박사 등장 애니메이션
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
      animation: ${popInFromHotspot} 0.4s cubic-bezier(0.34, 1.16, 0.64, 1) forwards;
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
  color: rgb(130, 130, 130);
  font-size: 20px;
  font-weight: 600;
  padding: 8px 14px;
  cursor: pointer;

  @media ${media.mobileM} {
    font-size: 24px;
  }
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
  white-space: pre-line;

  font-family: 'NeoDunggeunmo', sans-serif;
`;

export const CaptionBubble = styled.p`
  margin: 0;
  max-width: 320px;
  min-height: 1.5em;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  padding: 10px 15px;
  border-radius: 20px;

  @media ${media.mobileM} {
    font-size: 24px;
  }
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
  bottom: 50px;
  z-index: 20;
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  font: inherit;
  cursor: ${(p) => (p.$active ? 'pointer' : 'default')};

  font-family: 'NeoDunggeunmo', sans-serif;

  @media ${media.mobileM} {
    bottom: 90px;
  }
`;

export const NameTag = styled.div`
  position: relative;
  left: 14px;
  z-index: 1;
  display: inline-block;
  background-color: #adeed1;
  color: #04895c;
  font-size: 20px;
  font-weight: 700;
  padding: 6px 14px;
  border: 1px solid #609668;
  border-radius: 14px;
  margin-bottom: -8px;

  font-family: 'NeoDunggeunmo', sans-serif;

  @media ${media.mobileM} {
    left: 20px;
    font-size: 30px;
    padding: 10px 18px;
    border-radius: 20px;
    margin-bottom: -10px;
  }
`;

export const MessageBox = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 110px;
  background-color: #ffffff;
  border: 1px solid #141212;
  border-radius: 16px;
  padding: 14px 16px 18px 22px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

  font-family: 'NeoDunggeunmo', sans-serif;
  white-space: pre-line;
  letter-spacing: -0.5px;

  @media ${media.mobileM} {
    height: 148px;
    border-radius: 20px;
    padding: 20px 22px 26px 30px;
  }
`;

export const MessageText = styled.p`
  margin: 0;
  white-space: pre-line;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  color: #1a1a1a;

  @media ${media.mobileM} {
    font-size: 20px;
    line-height: 1.4;
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
`;

export const ContinueArrow = styled.div`
  position: absolute;
  right: 14px;
  bottom: 10px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #63bf8e;
  animation: ${bounce} 1s ease-in-out infinite;

  @media ${media.mobileM} {
    right: 18px;
    bottom: 12px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #63bf8e;
  }
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

const popBig = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const captionFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const LogoStage = styled.button`
  position: absolute;
  inset: 0;
  z-index: 110;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(0);
  opacity: 0;
  animation: ${popBig} 0.8s forwards;
`;

export const LogoCaption = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #b3b3b3;
  opacity: 0;
  animation: ${captionFadeIn} 0.3s ease 0.4s forwards;

  @media ${media.mobileM} {
    font-size: 24px;
  }
`;
