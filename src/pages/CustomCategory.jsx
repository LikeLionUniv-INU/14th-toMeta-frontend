import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

const CATEGORY_OPTIONS = [
  { id: 'skin_toner', label: '스킨 / 토너' },
  { id: 'toner_pad', label: '토너패드' },
  { id: 'mist', label: '미스트' },
  { id: 'lotion_emulsion', label: '로션 / 에멀전' },
  { id: 'essence', label: '에센스' },
  { id: 'serum', label: '세럼' },
  { id: 'ampoule', label: '앰플' },
  { id: 'moisture_cream', label: '수분 크림' },
  { id: 'soothing_cream', label: '진정 크림' },
  { id: 'moisturizing_cream', label: '보습 크림' },
  { id: 'eye_cream', label: '아이크림' },
  { id: 'etc', label: '기타' },
];

export default function CustomCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = location.state || {};

  const [selectedCategory, setSelectedCategory] = useState('');

  const isValid = selectedCategory !== '';

  const handlePrev = () => {
    navigate('/register/custom-name');
  };

  const handleNext = () => {
    if (!isValid) return;

    navigate('/register/custom-ingredient', {
      state: {
        ...prevData,
        category: selectedCategory,
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
        </ProgressBarWrapper>

        <MainTitle>
          제품 유형을
          <br />
          선택해 주세요.
        </MainTitle>

        <OptionGroup>
          {CATEGORY_OPTIONS.map((item) => (
            <SelectChip
              key={item.id}
              type="button"
              $isSelected={selectedCategory === item.id}
              onClick={() => setSelectedCategory(item.id)}
            >
              {item.label}
            </SelectChip>
          ))}
        </OptionGroup>

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
  margin-bottom: 26px;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 170px;
  }
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 11px 11px;
  margin-bottom: auto;
`;

const SelectChip = styled.button`
  height: 40px;
  padding: 10px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  background-color: ${(props) => (props.$isSelected ? '#52ba96' : '#e7fdf7')};
  color: ${(props) => (props.$isSelected ? '#F3f3f3' : '#363636')};
  border: 1px solid ${(props) => (props.$isSelected ? '#52ba96' : '#89d7bc')};

  &:active {
    opacity: 0.8;
    transform: scale(0.95);
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
