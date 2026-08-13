import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Picker from 'react-mobile-picker';

import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';

const PICKER_OPTIONS = {
  hour: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
  minute: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
};

export default function MyPage() {
  const navigate = useNavigate();

  const [isHealthConnected, setIsHealthConnected] = useState(true);

  const [toggle, setToggle] = useState({
    record: true,
    daily: true,
    weekly: true,
  });

  const [times, setTimes] = useState({
    daily: '23:00',
    weekly: '23:00',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetReport, setTargetReport] = useState(null);
  const [pickerValue, setPickerValue] = useState({
    hour: '22',
    minute: '30',
  });

  useEffect(() => {
    if (isModalOpen && targetReport) {
      const [h, m] = times[targetReport].split(':');
      setPickerValue({
        hour: h || '22',
        minute: m || '30',
      });
    }
  }, [isModalOpen, targetReport, times]);

  const handleToggle = (key) => {
    setToggle((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleOpenTimeModal = (type) => {
    setTargetReport(type);
    setIsModalOpen(true);
  };

  const handleSaveTime = async () => {
    const formatted24 = `${pickerValue.hour}:${pickerValue.minute}`;

    const updatedTimes = {
      ...times,
      [targetReport]: formatted24,
    };

    setTimes(updatedTimes);
    setIsModalOpen(false);

    const payload = {
      reportType: targetReport,
      notificationTime: formatted24,
    };

    console.log('백엔드로 전송할 리포트 시간 데이터:', payload);

  };

  // 24시간제(23:00) -> 화면 표시용 12시간제(11:00PM) 포맷 변환 함수
  const formatDisplayTime = (timeStr) => {
    if (!timeStr) return '11:00PM';
    const [h, m] = timeStr.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${String(hour).padStart(2, '0')}:${m}${ampm}`;
  };

  return (
    <PageContainer>
      <Header>마이페이지</Header>

      <ProfileSection>
        <ProfileAvatar>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#006014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </ProfileAvatar>
        <ProfileName>김도영 님</ProfileName>
        <EditButton onClick={handleEditProfile}>내 정보 수정</EditButton>
      </ProfileSection>

      <ContentSection>
        <FlexRow>
          <SectionTitle>Health Connect 연동</SectionTitle>
          <Badge $isConnected={isHealthConnected}>
            {isHealthConnected ? '연동됨' : '미연동'}
          </Badge>
        </FlexRow>

        <SectionTitle>앱 푸시 알림</SectionTitle>
        <NotificationList>

          <NotificationItem>
            <ItemText>기록 작성</ItemText>
            <ToggleWrapper onClick={() => handleToggle('record')} $isActive={toggle.record}>
              <ToggleCircle $isActive={toggle.record} />
            </ToggleWrapper>
          </NotificationItem>

          <NotificationItem>
            <ItemText>일간 리포트 발행</ItemText>
            <RightControls>
              <TimeText onClick={() => handleOpenTimeModal('daily')}>
                {formatDisplayTime(times.daily)}
              </TimeText>
              <ToggleWrapper onClick={() => handleToggle('daily')} $isActive={toggle.daily}>
                <ToggleCircle $isActive={toggle.daily} />
              </ToggleWrapper>
            </RightControls>
          </NotificationItem>

          <NotificationItem>
            <ItemText>주간 리포트 발행</ItemText>
            <RightControls>
              <TimeText onClick={() => handleOpenTimeModal('weekly')}>
                {formatDisplayTime(times.weekly)}
              </TimeText>
              <ToggleWrapper onClick={() => handleToggle('weekly')} $isActive={toggle.weekly}>
                <ToggleCircle $isActive={toggle.weekly} />
              </ToggleWrapper>
            </RightControls>
          </NotificationItem>

        </NotificationList>
      </ContentSection>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {targetReport === 'daily' ? '일간' : '주간'} 리포트 알림 시간 설정
            </ModalTitle>

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
              설정한 시간에 맞추어 리포트 알림을 보내드려요.
            </NoticeText>

            <ModalButtonGroup>
              <ModalSubButton
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </ModalSubButton>
              <Button onClick={handleSaveTime}>
                확인 및 설정 완료
              </Button>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      <NavigationBar />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 73px;
  box-sizing: border-box;
  font-family: sans-serif;
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  padding: 16px 0;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
`;

const ProfileSection = styled.section`
  background-color: #D7EDDA;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileAvatar = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid #006014;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  margin-bottom: 8px;
`;

const EditButton = styled.button`
  background-color: #006014;
  color: #f1f1f1;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const ContentSection = styled.section`
  padding: 24px 20px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: #111111;
  margin: 0;
`;

const Badge = styled.span`
  background-color: ${(props) => (props.$isConnected ? '#266210' : '#E53E3E')};
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
`;

const NotificationList = styled.div`
  border-left: 2px solid #E5E5E5;
  margin-top: 20px;
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  line-height: 1.3;
`;

const TimeText = styled.span`
  font-size: 12px;
  color: #999999;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  width: 44px;
  height: 24px;
  background-color: ${(props) => (props.$isActive ? '#266210' : '#D1D1D1')};
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  box-sizing: border-box;
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: ${(props) => (props.$isActive ? 'translateX(20px)' : 'translateX(0)')};
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 73px;
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