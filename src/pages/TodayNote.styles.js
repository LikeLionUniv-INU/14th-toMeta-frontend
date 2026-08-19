import styled from "styled-components";
import { media } from '../styles/GlobalStyle';

export const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100dvh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px;

  button {
    font-size: 17px;
    background: none;
    border: none;
    cursor: pointer;
  }

  h1 {
    font-size: 15px;
    font-weight: 700;
  }

  @media ${media.mobileM} {
    button {
      font-size: 1.25rem;
    }

    h1 {
      font-size: 1.125rem;
    }
  }
`;

export const Content = styled.div`
  padding: 26px 17px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${media.mobileM} {
    padding: 30px 20px;
  }
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  @media ${media.mobileM} {
    gap: 8px;

    h2 {
      font-size: 24px;
    }
  }
`;

export const SectionDivider = styled.div`
  height: 10px;
  background-color: #f3f4f6;
  margin: 0 -17px;

  @media ${media.mobileM} {
    height: 12px;
    margin: 0 -20px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #b0b0b0;
  margin: 1px;
`;

export const Section = styled.section`

`;

export const Label = styled.div`
  display: block;
  font-weight: 700;
  margin-bottom: 7px;
  font-size: 12px;

  .required {
    color: red;
    margin-left: 2px;
  }

  .optional {
    color: #0C10FF;
    font-size: 10px;
    font-weight: 400;
    margin-left: 4px;
  }

  @media ${media.mobileM} {
    margin-bottom: 0.5rem;
    font-size: 14px;

    .optional {
      font-size: 12px;
    }
  }
`;

export const SubDescription = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #828282;
  margin-bottom: 7px;

  @media ${media.mobileM} {
    font-size: 12px;
    margin-bottom: 0.5rem;
  }
`;

export const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 8px 8px 8px;
  width: 100%;
  box-sizing: border-box;

  @media ${media.mobileM} {
    padding: 24px 10px 10px 10px;
  }
`;

export const SliderTrackContainer = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
`;

export const TrackBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #c4c4c4;
  z-index: 1;
`;

export const ActiveTrack = styled.div`
  position: absolute;
  left: 0;
  width: ${({ $percentage }) => $percentage}%;
  height: 2px;
  background-color: #111111;
  z-index: 2;
`;

export const SliderDot = styled.div`
  position: absolute;
  left: ${({ $left }) => $left}%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $isPassed }) => ($isPassed ? '#ff3b30' : '#c4c4c4')};
  z-index: 3;
`;

export const DrImageThumb = styled.img`
  position: absolute;
  left: ${({ $percentage }) => $percentage}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 37px;
  height: 37px;
  object-fit: contain;
  z-index: 4;
  pointer-events: none;
  transition: left 0.05s ease-out;

  @media ${media.mobileM} {
    width: 44px;
    height: 44px;
  }
`;

export const HiddenRangeInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
  margin: 0;
`;

export const SliderLabels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: #a0a0a0;
  margin-top: 6px;

  @media ${media.mobileM} {
    font-size: 11px;
  }
`;

export const CurrentStatusText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #111111;
  text-align: center;

  @media ${media.mobileM} {
    font-size: 16px;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 14px;
  text-align: center;
  color: #828282;
  font-weight: 600;
  font-size: 10px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  @media ${media.mobileM} {
    padding: 1rem;
    font-size: 12px;
  }
`;

export const TextareaWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 10px;
    font-weight: 400;
    font-size: 9px;
    color: #828282;
    height: 7rem;
    resize: none;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #22c55e;
    }
  }

  .char-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.75rem;
    font-size: 10px;
    color: #9ca3af;
  }

  @media ${media.mobileM} {
    textarea {
      padding: 0.75rem;
      font-size: 10px;
    }

    .char-count {
      font-size: 0.75rem;
    }
  }
`;

export const ImageListContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media ${media.mobileM} {
    gap: 0.75rem;
  }
`;

export const CameraButton = styled.button`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  background-color: #ededed;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #828282;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  .camera-icon {
    width: 21px;
    height: 15px;
    object-fit: contain;
  }

  @media ${media.mobileM} {
    width: 70px;
    height: 70px;

    .camera-icon {
      width: 25px;
      height: 18px;
    }
  }
`;

export const ImageItem = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  flex-shrink: 0;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  .delete-btn {
    position: absolute;
    top: -3px;
    right: -3px;
    background-color: #374151;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media ${media.mobileM} {
    width: 5.5rem;
    height: 5.5rem;

    img {
      width: 70px;
      height: 70px;
    }

    .delete-btn {
      top: -0.25rem;
      right: -0.25rem;
      width: 1.25rem;
      height: 1.25rem;
      font-size: 0.75rem;
    }
  }
`;

export const SubmitWrapper = styled.div`
  padding-top: 13px;

  @media ${media.mobileM} {
    padding-top: 1rem;
  }
`;