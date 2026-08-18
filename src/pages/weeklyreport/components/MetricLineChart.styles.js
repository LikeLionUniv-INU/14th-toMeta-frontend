import styled from 'styled-components';

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const UnitLabel = styled.span`
  position: absolute;
  top: 0;
  left: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #898781;
  z-index: 1;
`;

export const TooltipBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #e1e0d9;
  border-radius: 8px;
  padding: 6px 10px;
  box-shadow: 0 2px 8px rgba(11, 11, 11, 0.08);
  white-space: nowrap;
`;

export const TooltipDay = styled.div`
  font-size: 11px;
  color: #898781;
  margin-bottom: 2px;
`;

export const TooltipValue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #7ef0b3;
`;
