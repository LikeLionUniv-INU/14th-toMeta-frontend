import styled from 'styled-components';

export const Container = styled.div`
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 16px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 15px;
  color: #64748b;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 0;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TabButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid ${(props) => (props.$active ? '#2fd99e' : '#dee2e6')};
  background-color: #ffffff;
  color: ${(props) => (props.$active ? '#18be85' : '#212529')};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

export const ChartAreaPlaceholder = styled.div`
  width: 100%;
  height: 220px;
  background-color: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  .placeholder-text {
    font-size: 14px;
    color: #475569;
    margin: 0;
  }
  .placeholder-sub {
    font-size: 12px;
    color: #94a3b8;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const SectionSubText = styled.p`
  font-size: 12px;
  color: #bcbcbc;
  margin: 0;
`;

export const PhotoScrollList = styled.div`
  display: flex;
  gap: 11px;
  overflow-x: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PhotoCard = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #d9d9d9;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EmptyPhotoCard = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  background-color: #f8fafc;
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
`;

export const Divider = styled.div`
  height: 6px;
  background-color: #f1f5f9;
  margin: 4px -20px;
`;

export const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 4px;
`;

export const AvatarCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: #e2e8f0;
  flex-shrink: 0;
`;

export const SummaryBubble = styled.div`
  position: relative;
  background-color: #e6fcf5;
  color: #000000;
  font-size: 10px;
  line-height: 1.45;
  padding: 12px 14px;
  border-radius: 20px;
  flex: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 20px solid #e6fcf5;
  }
`;

export const AnalysisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AnalysisBubble = styled.div`
  background-color: #ffffff;
  border: 1px solid #89d7bc;
  color: #141212;
  font-size: 12px;
  line-height: 1.5;
  padding: 14px 10px;
  border-radius: 20px;
`;

export const SolutionBubble = styled.div`
  background-color: #e7fdf7;
  border: 1px solid #89d7bc;
  color: #212529;
  font-size: 12px;
  line-height: 1.3;
  padding: 14px 10px;
  border-radius: 20px;
`;

export const NoteWrapper = styled.div`
  width: 100%;
`;

export const NoteInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #89d7bc;
  background-color: #ffffff;
  font-size: 12px;
  color: #212529;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: #7b7b7b;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`;

export const NoteActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CharCount = styled.span`
  font-size: 12px;
  color: #94a3b8;
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

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
