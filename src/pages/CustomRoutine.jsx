import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

export default function CustomRoutine() {
  const navigate = useNavigate();

  const [selectedRoutine, setSelectedRoutine] = useState('');

  const isValid = selectedRoutine !== '';

  const handleNext = () => {
    if (!isValid) return;

    navigate('/register/custom-name', {
      state: { routine: selectedRoutine },
    });
  };

  return (
    <Container>
      <Content>
        <ProgressBarWrapper>
          <ProgressStep $active={true} />
          <ProgressStep $active={false} />
          <ProgressStep $active={false} />
          <ProgressStep $active={false} />
        </ProgressBarWrapper>

        <MainTitle>언제 사용 하나요?</MainTitle>

        <OptionGroup>
          <SelectButton
            type="button"
            $isSelected={selectedRoutine === 'morning'}
            onClick={() => setSelectedRoutine('morning')}
          >
            모닝 스킨케어
          </SelectButton>

          <SelectButton
            type="button"
            $isSelected={selectedRoutine === 'night'}
            onClick={() => setSelectedRoutine('night')}
          >
            나이트 스킨케어
          </SelectButton>

          <SelectButton
            type="button"
            $isSelected={selectedRoutine === 'both'}
            onClick={() => setSelectedRoutine('both')}
          >
            둘 다
          </SelectButton>
        </OptionGroup>

        <BottomButtonGroup>
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
  margin-bottom: 28px;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: auto;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 43px;
  background-color: ${(props) => (props.$isSelected ? '#EAF5EA' : '#EAEAEA')};
  border: ${(props) => (props.$isSelected ? '1.5px solid #609668' : '1px solid #CCCCCC')};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => (props.$isSelected ? '#1B4325' : '#333333')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:active {
    opacity: 0.8;
  }
`;

const BottomButtonGroup = styled.div`
  width: 100%;
  margin-top: 32px;
`;
