import styled from 'styled-components';

export const LegendRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #898781;
`;

export const LegendChip = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background-color: ${(props) => props.$color};
  flex-shrink: 0;
`;
