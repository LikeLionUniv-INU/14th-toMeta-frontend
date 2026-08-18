import styled from 'styled-components';

export const NoteCard = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  background-color: #f8fffd;
  border: 1px solid rgb(151, 151, 151);
  border-radius: 30px;
  box-shadow: 0 6px 6px rgba(31, 41, 51, 0.2);
  padding: 26px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  width: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PinBar = styled.span`
  width: 100%;
  height: 17px;
  border-radius: 4px;
  background-color: #828282;
`;

export const PinHole = styled.span`
  width: 10px;
  height: 10px;
  margin-top: -3px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

export const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayLabel = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #6b7975;
`;

export const Divider = styled.div`
  height: 2px;
  background-color: #b7b7b7;
  margin: 3px 0;
`;

export const DateCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  font-size: 14px;
  font-weight: 700;
  color: #1f2933;
  background-color: ${(props) => props.$bg || 'transparent'};
  border-top-left-radius: ${(props) => (props.$roundLeft ? '17px' : 0)};
  border-bottom-left-radius: ${(props) => (props.$roundLeft ? '17px' : 0)};
  border-top-right-radius: ${(props) => (props.$roundRight ? '17px' : 0)};
  border-bottom-right-radius: ${(props) => (props.$roundRight ? '17px' : 0)};
`;

export const PhaseLabelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 6px;
`;

export const PhaseLabel = styled.div`
  grid-column: ${(props) => `${props.$start} / ${props.$end}`};
  text-align: center;
  font-size: 11px;
  color: #6b7975;
`;
