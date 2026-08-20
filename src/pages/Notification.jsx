import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Picker from 'react-mobile-picker';
import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';
import Bell from '../assets/images/bell.svg';
import useModalBackClose from '../hooks/useModalBackClose';

import { updateMyProfile, createNotificationSettings } from '../api';

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

const PUSH_PERMISSION_TIMEOUT_MS = 4000;

// 안드로이드 네이티브 브릿지에 푸시 권한(POST_NOTIFICATIONS) 요청을 위임하고
// 응답을 기다린다. 브릿지가 없거나(일반 브라우저) 응답이 없으면 온보딩이
// 막히지 않도록 각각 'unsupported' / 'timeout'으로 처리한다.
const requestPushPermission = () => {
  const bridge = window.ToMetaNative;

  if (!bridge?.postMessage || !bridge?.addEventListener) {
    return Promise.resolve('unsupported');
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      bridge.removeEventListener('message', handleMessage);
      resolve(result);
    };

    const handleMessage = (event) => finish(event.data);

    const timeoutId = setTimeout(() => finish('timeout'), PUSH_PERMISSION_TIMEOUT_MS);

    bridge.addEventListener('message', handleMessage);
    bridge.postMessage('requestPushPermission');
  });
};

export default function NotificationPermission() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const closeModal = useModalBackClose(isModalOpen, () => setIsModalOpen(false));

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
    if (isLoading) return;

    try {
      setIsLoading(true);

      // 0. 네이티브 푸시 알림 권한 요청 (거부/타임아웃이어도 온보딩은 계속 진행)
      if (allowNotification) {
        const pushResult = await requestPushPermission();
        if (pushResult !== 'granted') {
          console.warn('푸시 알림 권한이 허용되지 않았습니다:', pushResult);
        }
      }

      const onboardingData = getDecryptedData('onboarding_data') || {};

      // 1. 프로필 데이터 전송 (PATCH /api/users/me/profile)
      const profilePayload = {
        nickname: onboardingData.nickname,
        gender: onboardingData.gender,
        ageGroup: onboardingData.ageGroup,
        skinType: onboardingData.skinType,
      };

      const profileRes = await updateMyProfile(profilePayload);
      if (!profileRes.data.isSuccess) {
        throw new Error(
          profileRes.data.message || '프로필 등록에 실패했습니다.',
        );
      }

      // 2. 알림 설정 페이로드 구성 (HH:mm 포맷)
      const selectedTime = `${pickerValue.hour}:${pickerValue.minute}`;
      const notificationPayload = allowNotification
        ? {
            dailyReportEnabled: true,
            recordReminderEnabled: true,
            recordReminderTime: selectedTime,
            weeklyReportEnabled: true,
            weeklyReportTime: selectedTime,
          }
        : {
            dailyReportEnabled: false,
            recordReminderEnabled: false,
            recordReminderTime: null,
            weeklyReportEnabled: false,
            weeklyReportTime: null,
          };

      // 3. 알림 설정 등록 호출 (POST /api/users/me/notification-settings)
      const notificationRes =
        await createNotificationSettings(notificationPayload);
      if (!notificationRes.data.isSuccess) {
        throw new Error(
          notificationRes.data.message || '알림 설정 등록에 실패했습니다.',
        );
      }

      // 4. 모든 등록 완료 시 세션스토리지 비우고 홈으로 이동
      sessionStorage.removeItem('onboarding_data');
      closeModal();
      navigate('/home');
    } catch (error) {
      console.error('온보딩 최종 전송 실패:', error);
      alert(error.message || '오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
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
        <Title>
          내 피부가 자극받은 원인을
          <br /> 찾으면 알려드릴까요?
        </Title>
        <SubTitle>
          매일 밤 리포트와 피부 분석 소식도 함께 알려드릴게요.
        </SubTitle>

        <IconContainer src={Bell} />
      </ContentWrapper>

      <ButtonGroup>
        <Button onClick={() => setIsModalOpen(true)}>동의하고 알림 받기</Button>

        <SubButton type="button" onClick={() => handleFinalSubmit(false)}>
          나중에
        </SubButton>
      </ButtonGroup>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
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
              <ModalSubButton type="button" onClick={closeModal}>
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
  justify-content: start;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  margin-top: 70px;
  margin-bottom: 0;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 28px;
    margin-top: 120px;
  }
`;

const SubTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #828282;
  line-height: 1.7;
  margin-top: 18px;
  margin-bottom: 99px;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 16px;
    margin-bottom: 120px;
  }
`;

const IconContainer = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 20px;
  background-color: #e5e5e5;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #d6d6d6;
  }
`;

/* 모달 스타일 컴포넌트*/
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
  border-radius: 20px;
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
