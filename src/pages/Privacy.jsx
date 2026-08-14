import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Container = styled.div`
  padding: 30px 20px;
  background-color: #ffffff;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: #000000;
  margin-bottom: 20px;
`;

const TermsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    display: none;
  }
`;

const CustomCheckIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${({ $checked }) => ($checked ? "#609668" : "#FFFFFF")};
  border: ${({ $checked }) => ($checked ? "none" : "1px solid #E9E9E9")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  box-sizing: border-box;

  svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const TermsBox = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 12px;
  padding: 16px;
  line-height: 1.5;

  &.summary-text {
    font-size: 12px;
    color: #000000;
    font-weight: 500;
  }
`;

const PolicyItem = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 14px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 4px 0;
  }

  p, ul {
    font-size: 12px;
    font-weight: 500;
    color: #707070;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 2px;
  }
`;

const Privacy = () => {
  const navigate = useNavigate();
  const [serviceTermsChecked, setServiceTermsChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const isAllChecked = serviceTermsChecked && privacyPolicyChecked;

  const handleSubmit = () => {
    if (!isAllChecked) return;
    navigate('/health-connect');
  };

  return (
    <Container>
      <Content>
        <Title>
          서비스 이용을 위해<br />
          아래 항목에 동의해 주세요
        </Title>

        <TermsSection>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={serviceTermsChecked}
              onChange={(e) => setServiceTermsChecked(e.target.checked)}
            />
            <CustomCheckIcon $checked={serviceTermsChecked}>
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </CustomCheckIcon>
            <span>서비스 이용약관</span>
          </CheckboxLabel>

          <TermsBox className="summary-text">
            본 약관은 AI 웰니스 서비스 이용 조건 및 절차, 회원의 권리·의무 및 책임
            사항을 규정합니다. 동의 거부 시 서비스 이용이 제한될 수 있습니다.
          </TermsBox>
        </TermsSection>

        <TermsSection>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={privacyPolicyChecked}
              onChange={(e) => setPrivacyPolicyChecked(e.target.checked)}
            />
            <CustomCheckIcon $checked={privacyPolicyChecked}>
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </CustomCheckIcon>
            <span>개인정보 수집 및 이용 동의</span>
          </CheckboxLabel>

          <TermsBox>
            <PolicyItem>
              <h2>1. 수집·이용 목적</h2>
              <p>
                AI 기반 피부 자극 원인 분석과 개인별 피부 반응 데이터를 활용하여
                사용자 맞춤 솔루션 및 리포트를 제공하기 위함
              </p>
            </PolicyItem>

            <PolicyItem>
              <h2>2. 수집하는 개인정보 항목</h2>
              <ul>
                <li>• 헬스데이터 (Health Connect/HealthKit): 피부 온도, 수면 시간, 스트레스, 생리 주기 등</li>
                <li>• 사용자 직접 입력: 피부 타입, 일간 피부 상태 등</li>
              </ul>
            </PolicyItem>

            <PolicyItem>
              <h2>3. 보유 및 이용 기간</h2>
              <p>회원 탈퇴 시 즉시 파기 (관계 법령 보존 필요 시 해당 기간까지)</p>
            </PolicyItem>

            <PolicyItem>
              <h2>4. 동의 거부 권리 및 불이익</h2>
              <p>
                동의 거부 권리가 있으나, 거부 시 AI 분석 리포트 및 맞춤 루틴 추천
                서비스 이용이 제한됩니다.
              </p>
            </PolicyItem>
          </TermsBox>
        </TermsSection>
      </Content>

      <Button disabled={!isAllChecked} onClick={handleSubmit}>
        확인
      </Button>
    </Container>
  );
};

export default Privacy;