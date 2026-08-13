import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

// 세션스토리지 암호화 / 복호화 유틸리티 함수
export const saveEncryptedData = (key, data) => {
  try {
    const existingData = getDecryptedData(key) || {};
    const updatedData = { ...existingData, ...data };

    // Base64 기반 인코딩 (추가 라이브러리 없이 브라우저 내장 함수 사용)
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

export default function ProfileInput() {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(''); // 'male' | 'female'
  const [ageGroup, setAgeGroup] = useState(''); // '10s' | '20s' | '30s' | '40s' | 'etc'
  const navigate = useNavigate();

  const isValid =
    nickname.trim().length > 0 && gender !== '' && ageGroup !== '';

  useEffect(() => {
    const savedData = getDecryptedData('onboarding_data');
    if (savedData) {
      if (savedData.nickname) setNickname(savedData.nickname);
      if (savedData.gender) setGender(savedData.gender);
      if (savedData.ageGroup) setAgeGroup(savedData.ageGroup);
    }
  }, []);

  const handleNext = () => {
    if (!isValid) return;

    // 세션스토리지에 전체 저장
    saveEncryptedData('onboarding_data', {
      nickname: nickname.trim(),
      gender,
      ageGroup,
    });

    navigate('/onboarding/skin-type');
  };

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressStep $active={true} />
        <ProgressStep $active={false} />
        <ProgressStep $active={false} />
      </ProgressBarWrapper>

      <ContentWrapper>
        <Title>
          기본 정보를
          <br />
          입력해 주세요!
        </Title>

        <Section>
          <SectionLabel>닉네임</SectionLabel>
          <StyledInput
            type="text"
            placeholder="한글, 영문, 숫자 1~10자 이내로 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            minLength={2}
            maxLength={10}
          />
        </Section>

        <Section>
          <SectionLabel>성별</SectionLabel>
          <GenderGrid>
            <GenderChip
              type="button"
              $selected={gender === 'male'}
              onClick={() => setGender('male')}
            >
              남자
            </GenderChip>
            <GenderChip
              type="button"
              $selected={gender === 'female'}
              onClick={() => setGender('female')}
            >
              여자
            </GenderChip>
          </GenderGrid>
        </Section>

        <Section>
          <SectionLabel>나이대</SectionLabel>
          <AgeGrid>
            <AgeChip
              type="button"
              $selected={ageGroup === '10s'}
              onClick={() => setAgeGroup('10s')}
            >
              10대
            </AgeChip>
            <AgeChip
              type="button"
              $selected={ageGroup === '20s'}
              onClick={() => setAgeGroup('20s')}
            >
              20대
            </AgeChip>
            <AgeChip
              type="button"
              $selected={ageGroup === '30s'}
              onClick={() => setAgeGroup('30s')}
            >
              30대
            </AgeChip>
            <AgeChip
              type="button"
              $selected={ageGroup === '40s'}
              onClick={() => setAgeGroup('40s')}
            >
              40대
            </AgeChip>
            <AgeChip
              type="button"
              $selected={ageGroup === 'etc'}
              onClick={() => setAgeGroup('etc')}
            >
              50대 이상
            </AgeChip>
          </AgeGrid>
        </Section>
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
  margin-bottom: 53px;
  margin-top: 80px;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 120px;
    margin-bottom: 80px;
  }
`;

const Section = styled.div`
  margin-bottom: 28px;

  @media ${media.mobileM} {
    margin-bottom: 40px;
  }
`;

const SectionLabel = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin-top: 0;
  margin-bottom: 10px;

  @media ${media.mobileM} {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 39px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #111111;
  background-color: #ffffff;
  border: 1px solid #b3b3b3;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #b5b5b5;
  }

  &:focus {
    border: 1.5px solid #609668;
  }
`;

const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

const AgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px 12px;
`;

const GenderChip = styled.button`
  height: 50px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ $selected }) => ($selected ? '#E7FFF7' : '#ffffff')};
  color: #000000;
  border: 1px solid ${({ $selected }) => ($selected ? '#02ca70' : '#dee2e6')};

  transition: all 0.2s ease;

  &:active {
    opacity: 0.8;
  }
`;

const AgeChip = styled(GenderChip)`
  font-size: 13px;
`;
