import styled from 'styled-components';
import { media } from '../styles/GlobalStyle';

export const Container = styled.div`
  max-width: 430px;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Content = styled.main`
  flex: 1;
  min-height: 0;
  padding: 20px 20px calc(73px + 12px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  overflow: hidden;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  font-size: 15px;
  color: #64748b;
`;

export const Greeting = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-top: 40px;
  margin-bottom: 0;

  @media ${media.mobileM} {
    margin-top: 50px;
  }
`;

export const Divider = styled.div`
  height: 2px;
  background-color: #787878;
`;

export const PlusButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: #18be85;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.75;
  }
`;

export const ReportCard = styled.section`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #b3b3b3;
  border-radius: 30px;
  box-shadow: 0 6px 6px rgba(31, 41, 51, 0.1);
  padding: 20px 20px 16px;

  @media ${media.mobileM} {
    padding: 30px 20px;
  }
`;

export const PinsGroup = styled.div`
  position: absolute;
  top: -12px;
  display: flex;
  gap: 15px;
`;

export const PinsLeft = styled(PinsGroup)`
  left: 10%;
`;

export const PinsRight = styled(PinsGroup)`
  right: 10%;
`;

export const Pin = styled.div`
  width: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PinBar = styled.span`
  z-index: 1;
  width: 100%;
  height: 20px;
  border-radius: 4px;
  background-color: #828282;
`;

export const PinHole = styled.span`
  width: 10px;
  height: 10px;
  margin-top: -2px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

export const ReportCardHeading = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #141212;
  margin: 0 0 6px;

  & + div {
    margin-bottom: 4px;
  }

  @media ${media.mobileM} {
    margin: 0 0 10px;

    & + div {
      margin-bottom: 5px;
    }
  }
`;

export const ReportCardBox = styled.div`
  background-color: #f8fffd;
  border: 1px solid #89d7bc;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 12px;
  line-height: 1.3;
  color: #000000;

  @media ${media.mobileM} {
    padding: 10px 14px;
  }
`;

export const ReportCardButton = styled.button`
  width: 100%;
  margin-top: 10px;
  background-color: #63bf8e;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #40916c;
  }

  @media ${media.mobileM} {
    margin-top: 16px;
  }
`;

export const ReportCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(130, 130, 130, 0.82);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  color: #ffffff;
`;

export const TipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AvatarImage = styled.img`
  width: 75px;
  height: auto;
  flex-shrink: 0;
  transform: scaleX(-1);

  @media ${media.mobileM} {
    width: 90px;
  }
`;

export const TipBubble = styled.div`
  position: relative;
  background-color: #e6fcf5;
  color: #000000;
  font-size: 11px;
  line-height: 1.5;
  padding: 12px 14px;
  border-radius: 20px;
  flex: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 20px solid #e6fcf5;
  }
`;
