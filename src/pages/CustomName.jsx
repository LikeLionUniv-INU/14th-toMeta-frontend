import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

export default function CustomName() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = location.state || {};

  const [productName, setProductName] = useState('');

  const isValid = productName.trim().length > 0;

  const handlePrev = () => {
    navigate('/register/custom-routine');
  };
  const handleNext = () => {
    if (!isValid) return;

    navigate('/register/custom-category', {
      state: {
        ...prevData,
        productName: productName.trim(),
      },
    });
  };

  return (
    <Container>
      <Content>
        <ProgressBarWrapper>
          <ProgressStep $active={false} />
          <ProgressStep $active={true} />
          <ProgressStep $active={false} />
          <ProgressStep $active={false} />
        </ProgressBarWrapper>

        <MainTitle>
          제품명을
          <br />
          입력해 주세요.
        </MainTitle>

        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="제품명을 입력해 주세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            autoFocus
          />
        </InputWrapper>

        <BottomButtonGroup>
          <PrevButton type="button" onClick={handlePrev}>
            이전
          </PrevButton>
          <Button onClick={handleNext} disabled={!isValid}>
            다음
          </Button>
        </BottomButtonGroup>
      </Content>
    </Container>
  );
}

/*  Style Components  */

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 50px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? '#003b00' : '#bddec1')};
  transition: background-color 0.3s ease;
`;

const MainTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-bottom: 60px;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  border-bottom: 3px solid #bddec1;
  padding-bottom: 8px;
  margin-bottom: auto;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-bottom-color: #609668;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #000000;

  &::placeholder {
    color: #c2c2c2;
  }
`;

const BottomButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 32px;

  button {
    flex: 1;
  }
`;

const PrevButton = styled.button`
  height: 52px;
  background-color: #e5e5e5;
  color: #333333;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    background-color: #d8d8d8;
  }
`;
