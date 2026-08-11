// 버튼 비활성화가 기본설정일 때 예시
//  <Button onclick={handleCompelete} disabled={!isValid}>완료</Button>

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  margin: 0 auto;
  height: 52px;
  background-color: ${(props) => (props.disabled ? '#B3B3B3' : '#609668')};
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background-color: ${(props) => (props.disabled ? '#E5E5E5' : '#4E7E55')};
  }
`;

const Button = ({ children, onClick, disabled = false, type = 'button', ...props }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;