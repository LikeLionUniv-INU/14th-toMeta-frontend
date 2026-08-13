
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  margin: 0 auto;
  height: 52px;
  background-color: ${(props) => (props.disabled ? '#FFFFFF' : '#63BF8E')};
  color: ${(props) => (props.disabled ? '#63BF8E' : '#FFFFFF')};
  font-size: 15px;
  font-weight: 600;
  border: ${(props) => (props.disabled ? '1px solid #63BF8E' : 'none')};
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background-color: ${(props) => (props.disabled ? '#FFFFFF' : '#63BF8E')};
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