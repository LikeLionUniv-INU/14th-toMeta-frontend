import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

export default function CustomName() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productName, setProductName] = useState('');

  const isValid = productName.trim().length > 0;

  const handlePrev = () => {
    navigate('/my-pouch');
  };
  const handleNext = () => {
    if (!isValid) return;

    navigate('/register/custom-category', {
      state: {
        productName: productName.trim(),
      },
    });
  };

  return (
    <Container>
      <Content>
        <ProgressBarWrapper>
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
            onChange={(e) => {
              const sanitizedValue = e.target.value.replace(
                /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]/g,
                '',
              );
              setProductName(sanitizedValue);
            }}
            autoFocus
          />
        </InputWrapper>

        <BottomButtonGroup>
          <PrevButton type="button" onClick={handlePrev}>
            취소
          </PrevButton>
          <NextButton onClick={handleNext} disabled={!isValid}>
            다음
          </NextButton>
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
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 41px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? '#003b00' : '#bddec1')};
  transition: background-color 0.3s ease;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin-top: 130px;
  margin-bottom: 38px;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 170px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  border-bottom: 4px solid #cbcbcb;
  padding-bottom: 8px;
  margin-bottom: auto;
  transition: border-color 0.2s ease;
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
  gap: 20px;
  width: 100%;
  margin-top: 32px;

  button {
    flex: 1;
  }
`;

const PrevButton = styled.button`
  height: 52px;
  background-color: #ffffff;
  color: #609668;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #609668;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const NextButton = styled(PrevButton)`
  background-color: ${(props) => (props.disabled ? '#b3b3b3' : '#63bf8e')};
  color: ${(props) => (props.disabled ? '#fdfffd' : '#ffffff')};
  border: none;
`;
