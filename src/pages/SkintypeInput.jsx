import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { media } from '../styles/GlobalStyle';
import Button from '../components/Button';

// 세션스토리지 암호화 / 복호화 유틸리티 함수
export const saveEncryptedData = (key, data) => {
  try {
    const existingData = getDecryptedData(key) || {};
    const updatedData = { ...existingData, ...data };
    const jsonString = JSON.stringify(updatedData);
    const encoded = btoa(encodeURIComponent(jsonString));
    sessionStorage.setItem(key, encoded);
  } catch (error) {
    console.error('데이터 저장 실패:', error);
  }
};

export const getDecryptedData = (key) => {
  try {
    const encoded = sessionStorage.getItem(key);
    if (!encoded) return null;
    const jsonString = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('데이터 읽기 실패:', error);
    return null;
  }
};

// 피부 타입 데이터 배열
const SKIN_TYPES = [
  { id: 'dry', title: '건성', desc: '당김이 자주 느껴지고\n건조한 피부' },
  { id: 'oily', title: '지성', desc: '번들거림과 유분기가\n많은 피부' },
  {
    id: 'combination_dry',
    title: '수부지',
    desc: '겉은 번들거리고\n속은 당기는 피부',
  },
  {
    id: 'combination',
    title: '복합성',
    desc: 'T존은 기름지고\n볼은 건조한 피부',
  },
  {
    id: 'sensitive',
    title: '민감성',
    desc: '자극에 민감하고\n쉽게 붉어지는 피부',
  },
  {
    id: 'unknown',
    title: '모름',
    desc: '아직 내 피부 타입을\n잘 모르겠어요',
  },
];

export default function SkinTypeSelect() {
  const [skinType, setSkinType] = useState('');
  const navigate = useNavigate();

  const isValid = skinType !== '';

  useEffect(() => {
    const savedData = getDecryptedData('onboarding_data');
    if (savedData && savedData.skinType) {
      setSkinType(savedData.skinType);
    }
  }, []);

  const handleNext = () => {
    if (!isValid) return;

    saveEncryptedData('onboarding_data', {
      skinType: skinType,
    });

    navigate('/onboarding/notification');
  };

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressStep $active={false} />
        <ProgressStep $active={true} />
        <ProgressStep $active={false} />
      </ProgressBarWrapper>

      <ContentWrapper>
        <Title>피부 타입을 알려주세요!</Title>
        <Advice>정확하지 않아도 괜찮아요.</Advice>

        <SkintypeGrid>
          {SKIN_TYPES.map((item) => (
            <SkintypeChip
              key={item.id}
              type="button"
              $selected={skinType === item.id}
              onClick={() => setSkinType(item.id)}
            >
              <ChipHeader>
                <ChipTitle>{item.title}</ChipTitle>
              </ChipHeader>
              <ChipDesc>{item.desc}</ChipDesc>
            </SkintypeChip>
          ))}
        </SkintypeGrid>
      </ContentWrapper>

      <Button onClick={handleNext} disabled={!isValid}>
        다음
      </Button>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: 30px 20px;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? '#003b00' : '#bddec1')};
  transition: background-color 0.3s ease;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  margin-top: 80px;
  margin-bottom: 3px;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 120px;
  }
`;

const Advice = styled.p`
  margin-top: 6px;
  margin-bottom: 40px;
  font-size: 16px;
  color: #bfbfbf;
`;

const SkintypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 17px;
`;

const SkintypeChip = styled.button`
  height: 104px;
  padding: 14px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 10px;

  background-color: ${({ $selected }) => ($selected ? '#E7fff7' : '#ffffff')};
  color: #141212;
  border: 1px solid ${({ $selected }) => ($selected ? '#02ca70' : '#dee2e6')};

  transition: all 0.2s ease;

  &:active {
    opacity: 0.8;
  }
`;

const ChipHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChipTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin: 5px 0;
`;

const ChipDesc = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
`;
