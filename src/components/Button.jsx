import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  margin: 0 auto;
  height: 52px;
  background-color: ${(props) => (props.disabled ? '#b3b3b3' : '#63BF8E')};
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background-color: ${(props) => (props.disabled ? '#b3b3b3' : '#63BF8E')};
  }
`;

const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
