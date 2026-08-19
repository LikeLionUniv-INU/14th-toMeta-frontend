import styled from 'styled-components';
import { media } from '../../styles/GlobalStyle';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  padding: 0;
  position: relative;
  background-color: #fbfcff;
`;

export const Container = styled.div`
  margin: 10px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$center ? 'center' : 'flex-start')};
  align-items: ${(props) => (props.$center ? 'center' : 'stretch')};
  box-sizing: border-box;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  filter: ${(props) => (props.$blur ? 'blur(6px)' : 'none')};
  transition: filter 0.2s ease;
`;

export const DateSection = styled.div`
  text-align: center;
  gap: 8px;
  margin-bottom: 24px;

  @media ${media.mobileM} {
    margin-bottom: 40px;
  }
`;

export const DateText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #141212;
  margin: 0;

  @media ${media.mobileM} {
    font-size: 24px;
  }
`;

export const SubLink = styled.button`
  background: none;
  border: none;
  font-size: 10px;
  color: #828282;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;

  @media ${media.mobileM} {
    gap: 15px;
    margin-bottom: 40px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;

  @media ${media.mobileM} {
    gap: 14px;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin: 0 2px 2px 2px;
  white-space: nowrap;

  @media ${media.mobileM} {
    gap: 7px;
    font-size: 16px;
    margin: 0 6px 6px 6px;
  }
`;

export const SleepCard = styled.div`
  background-color: #eee2f4;
  border-radius: 24px;
  padding: 14px 8px;
  min-width: 0;
  height: 190px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 208px;
  }
`;

export const GaugeWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  @media ${media.mobileM} {
    width: 133px;
    height: 133px;
  }
`;

export const GaugeCenterText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  .time {
    display: flex;
    align-items: baseline;
    gap: 2px;

    .bold {
      font-size: 22px;
      font-weight: 700;
      color: #141212;

      @media ${media.mobileM} {
        font-size: 26px;
      }
    }
    .unit {
      font-size: 12px;
      font-weight: 500;
      margin: 0 1px;
      color: #141212;

      @media ${media.mobileM} {
        font-size: 14px;
      }
    }

    @media ${media.mobileM} {
      gap: 3px;
    }
  }

  .target {
    font-size: 11px;
    color: #141212;
    font-weight: 500;
    align-self: flex-end;

    @media ${media.mobileM} {
      font-size: 12px;
    }
  }
`;

export const TempCard = styled.div`
  background-color: #f3e1d5;
  border-radius: 24px;
  padding: 14px 8px;
  min-width: 0;
  height: 148px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 160px;
  }
`;

export const TempBar = styled.div`
  position: absolute;
  left: 14px;
  top: 46px;
  bottom: 16px;
  width: 5px;
  border-radius: 9999px;
  background: linear-gradient(to top, #ed652b, #fffbde);

  @media ${media.mobileM} {
    left: 20px;
    top: 50px;
    bottom: 16px;
    width: 6px;
  }
`;

export const ExerciseCard = styled.div`
  background-color: #eaf4fe;
  border-radius: 24px;
  padding: 14px 8px;
  height: 88px;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 97px;
  }
`;

export const CalorieCard = styled.div`
  background-color: #ffdfed;
  border-radius: 24px;
  padding: 14px 8px;
  height: 88px;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 97px;
  }
`;

export const CycleCard = styled.div`
  background-color: #fff9e6;
  border-radius: 24px;
  padding: 14px 8px;
  height: 236px;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 255px;
  }
`;

export const CycleChartWrapper = styled.div`
  position: relative;
  width: 98px;
  height: 98px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.mobileM} {
    width: 104px;
    height: 104px;
  }
`;

export const CycleChartImage = styled.img`
  width: 130%;
  height: 130%;
  object-fit: contain;
  display: block;
`;

export const NeedlePivot = styled.div`
  position: absolute;
  top: 50%;
  left: 52%;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%) rotate(${(props) => props.$deg}deg);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
`;

export const NeedleArrow = styled.div`
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 18px;
  background-color: #e11d48;
  border-radius: 9999px;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4.5px solid transparent;
    border-right: 4.5px solid transparent;
    border-bottom: 7px solid #e11d48;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: #e11d48;
    border-radius: 50%;
  }

  @media ${media.mobileM} {
    height: 20px;
  }
`;

export const CycleDescription = styled.div`
  font-size: 8.5px;
  color: #6b7280;
  text-align: center;
  line-height: 1.35;
  margin-top: 2px;

  p {
    margin: 0;
  }
  .bold {
    font-size: 9.5px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2px;

    @media ${media.mobileM} {
      font-size: 10.5px;
    }
  }

  @media ${media.mobileM} {
    font-size: 9.5px;
    margin-top: 4px;
  }
`;

export const OxygenCard = styled.div`
  background-color: #e8f7f7;
  border-radius: 24px;
  padding: 14px 8px;
  height: 236px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${media.mobileM} {
    padding: 14px 8px;
    height: 255px;
  }
`;

export const OxygenBar = styled.div`
  position: absolute;
  left: 14px;
  top: 46px;
  bottom: 16px;
  width: 5px;
  border-radius: 20px;
  background: linear-gradient(to top, #2b92ed, #e5fff9);

  @media ${media.mobileM} {
    left: 20px;
    top: 50px;
    bottom: 16px;
    width: 6px;
  }
`;

export const OxygenDescription = styled.div`
  padding-left: 22px;
  font-size: 7.5px;
  color: #6c6c6c;
  line-height: 1.25;

  p {
    margin: 0;
  }
  .bold {
    font-weight: 700;
    margin-bottom: 2px;

    @media ${media.mobileM} {
      margin-bottom: 4px;
    }
  }

  @media ${media.mobileM} {
    padding-left: 30px;
    font-size: 8px;
  }
`;

export const ValueWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$direction || 'row'};
  align-items: flex-end;
  justify-content: end;
  gap: 2px;
  margin: 0 4px 4px 0;
  ${(props) =>
    props.$top &&
    `
    margin-bottom: auto;
  `}

  .bold {
    font-size: 22px;
    font-weight: 700;
    color: #141212;

    @media ${media.mobileM} {
      font-size: 26px;
    }
  }
  .unit {
    font-size: 12px;
    font-weight: 500;
    margin: 0px 1px;
    color: #141212;

    @media ${media.mobileM} {
      font-size: 14px;
    }
  }

  @media ${media.mobileM} {
    gap: 3px;
    margin: 0 6px 6px 0;
  }
`;

export const MainValue = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: #111827;
  line-height: 1;

  @media ${media.mobileM} {
    font-size: 22px;
  }
`;

export const UnitText = styled.span`
  font-size: 10px;
  color: #6b7280;
  font-weight: 600;
  margin-top: 2px;

  @media ${media.mobileM} {
    font-size: 11px;
  }
`;

export const StatusBadge = styled.span`
  margin-top: 4px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border: 1px solid #c8c8c8;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  @media ${media.mobileM} {
    font-size: 11px;
    padding: 2px 8px;
  }

  ${({ $status }) => {
    switch ($status) {
      case 'warning':
        return `
          color: #ff922b;
          background-color: #fff4e6;
        `;
      case 'danger':
      case 'high':
        return `
          color: #fa5252;
          background-color: #fff5f5;
        `;
      case 'low':
        return `
          color: #3a41ff;
          background-color: #e1e5ff;
        `;
      case 'normal':
      default:
        return `
          color: #40c057;
          background-color: #ebfbee;
        `;
    }
  }}
`;

export const SectionBlock = styled.div`
  margin-bottom: 20px;
`;

export const SectionHeading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;

export const InfoBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #89d7bc;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 12px;
  color: #141212;
  line-height: 1.45;

  @media ${media.mobileM} {
    padding: 10px 20px;
  }
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export const SaveButton = styled.button`
  background-color: #63bf8e;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #63bf8e;
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const NoteInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  textarea {
    width: 100%;
    min-height: 90px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid #10b981;
    background-color: #ffffff;
    font-size: 13px;
    color: #212529;
    resize: none;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
    }
  }
`;

export const NoteActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
`;

export const CharCount = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

export const BottomBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media ${media.mobileM} {
    gap: 30px;
  }
`;

export const AvatarPlaceholder = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  flex-shrink: 0;
  transform: scaleX(-1);

  @media ${media.mobileM} {
    width: 90px;
    height: 90px;
  }
`;

export const SpeechBubble = styled.div`
  position: relative;
  background-color: #cdf8e6;
  border-radius: 20px;
  padding: 12px 8px;
  flex: 1;
  text-align: center;
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
    border-right: 20px solid #cdf8e6;
  }

  .title {
    font-size: 10px;
    font-weight: 700;
    color: #000000;
  }

  .link {
    font-size: 10px;
    color: #000000;
    font-weight: 500;
    margin-top: 1px;
  }
`;

export const StatusMessage = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 600;
`;

export const ErrorMessage = styled.div`
  font-size: 14px;
  color: #ef4444;
  font-weight: 600;
`;

export const CollectingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const CollectingModal = styled.div`
  width: 100%;
  background-color: #e6f5e8;
  border-radius: 24px;
  margin: 30px 20px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #003b00;
  margin: 0 0 11px 0;
  line-height: 1.2;
`;

export const ModalDescription = styled.p`
  font-size: 12px;
  color: #828282;
  margin: 0 0 40px 0;
  font-weight: 500;
  line-height: 1.3;
`;

export const ModalButton = styled.button`
  width: 100%;
  background-color: #63bf8e;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #40916c;
  }
`;
