import styled from "styled-components";

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
    font-size: 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  h1 {
    font-size: 1.125rem;
    font-weight: 700;
  }
`;

export const Content = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
`;

export const SectionDivider = styled.div`
  height: 12px;
  background-color: #f3f4f6;
  margin: 0 -20px;
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
  margin-bottom: 0.5rem;
  font-size: 14px;

  .required {
    color: red;
    margin-left: 2px;
  }

  .optional {
    color: #0C10FF;
    font-size: 12px;
    font-weight: 400;
    margin-left: 4px;
  }
`;

export const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #828282;
  margin-bottom: 0.5rem;
`;

export const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px 10px 10px;
  width: 100%;
  box-sizing: border-box;
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
  width: 44px;
  height: 44px;
  object-fit: contain;
  z-index: 4;
  pointer-events: none;
  transition: left 0.05s ease-out;
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
  font-size: 11px;
  color: #a0a0a0;
  margin-top: 6px;
`;

export const CurrentStatusText = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  text-align: center;
`;

export const AddButton = styled.button`
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #828282;
  font-weight: 600;
  font-size: 12px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TextareaWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem;
    font-weight: 400;
    font-size: 10px;
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
    font-size: 0.75rem;
    color: #9ca3af;
  }
`;

export const ImageListContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

export const CameraButton = styled.button`
  width: 70px;
  height: 70px;
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
    width: 25px;
    height: 18px;
    object-fit: contain;
  }
`;

export const ImageItem = styled.div`
  position: relative;
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  .delete-btn {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background-color: #374151;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const SubmitWrapper = styled.div`
  padding-top: 1rem;
`;