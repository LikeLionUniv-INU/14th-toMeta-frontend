import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Picker from 'react-mobile-picker';

import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';

// 세션스토리지 복호화 유틸리티 함수
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

// 24시간제 모달
const PICKER_OPTIONS = {
  hour: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
  minute: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
};

export default function NotificationPermission() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 기본 시간 설정 22:30
  const [pickerValue, setPickerValue] = useState({
    hour: '22',
    minute: '30',
  });

  useEffect(() => {
    if (isModalOpen) {
      setPickerValue({
        hour: '22',
        minute: '30',
      });
    }
  }, [isModalOpen]);

  const handleFinalSubmit = async (allowNotification) => {
    try {
      const onboardingData = getDecryptedData('onboarding_data') || {};

      const formattedTime = allowNotification
        ? `${pickerValue.hour}:${pickerValue.minute}`
        : null;

      const finalPayload = {
        ...onboardingData,
        allowNotification: allowNotification,
        notificationTime: formattedTime,
      };

      console.log('백엔드로 전송할 최종 온보딩 데이터:', finalPayload);

      /* 백엔드 API 호출 위치
      await axios.post('/api/user/onboarding', finalPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
      */

      sessionStorage.removeItem('onboarding_data');
      setIsModalOpen(false);
      navigate('/home');
    } catch (error) {
      console.error('온보딩 데이터 전송 실패:', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <ProgressBarWrapper>
        <ProgressStep $active={false} />
        <ProgressStep $active={false} />
        <ProgressStep $active={true} />
      </ProgressBarWrapper>

      <ContentWrapper>
        <Title>알림을 받아보시겠어요?</Title>
        <SubTitle>
          오늘 하루 모인 데이터로 작성된 리포트와
          <br />
          피부를 지키는 생활습관 팁을 전해드릴게요.
        </SubTitle>

        <IconContainer>
          <BellIconPlaceholder />
        </IconContainer>
      </ContentWrapper>

      <ButtonGroup>
        <Button onClick={() => setIsModalOpen(true)}>동의하고 알림 받기</Button>

        <SubButton type="button" onClick={() => handleFinalSubmit(false)}>
          나중에
        </SubButton>
      </ButtonGroup>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>매일 몇 시에 알림을 드릴까요?</ModalTitle>

            <PickerWrapper>
              <Picker
                value={pickerValue}
                onChange={setPickerValue}
                itemHeight={44}
                height={176}
              >
                {Object.keys(PICKER_OPTIONS).map((name) => (
                  <Picker.Column key={name} name={name}>
                    {PICKER_OPTIONS[name].map((option) => (
                      <Picker.Item key={option} value={option}>
                        {option}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                ))}
              </Picker>
              <HighlightBox />
            </PickerWrapper>

            <NoticeText>
              알림 시간은 마이 페이지에서 수정이 가능해요.
            </NoticeText>

            <ModalButtonGroup>
              <ModalSubButton
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </ModalSubButton>
              <Button onClick={() => handleFinalSubmit(true)}>
                확인 및 설정 완료
              </Button>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

//Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: 30px 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;
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
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: center;
  margin-top: -20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 28px;
  }
`;

const SubTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 70px;
  word-break: keep-all;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BellIconPlaceholder = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SubButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  background-color: #e5e5e5;
  color: #333333;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #d6d6d6;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 430px;
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px 20px 32px 20px;
  box-sizing: border-box;
  animation: slideUp 0.25s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 16px;
  text-align: center;
`;

const PickerWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
  width: 100%;

  [class*='picker-highlight'],
  .picker-highlight {
    border: none !important;
    background: transparent !important;
  }

  .picker-item {
    font-size: 18px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;

    &[class*='selected'],
    &.picker-item-selected {
      color: #1b4325;
      font-weight: 800;
      font-size: 22px;
    }
  }
`;

const HighlightBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 44px;
  transform: translateY(-50%);
  border-top: 1px solid #1b4325;
  border-bottom: 1px solid #1b4325;
  background-color: rgba(255, 255, 255, 0);
  pointer-events: none;
  border-radius: 0px;
`;

const NoticeText = styled.p`
  font-size: 13px;
  color: #888888;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  button:last-child {
    flex: 1;
  }
`;

const ModalSubButton = styled.button`
  flex: 0.35;
  height: 52px;
  border-radius: 10px;
  background-color: #e5e5e5;
  color: #333333;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #d6d6d6;
  }
`;
