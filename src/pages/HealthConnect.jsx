import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { media } from '../styles/GlobalStyle';
import {
  registerHealthConnectConnection,
  getHealthConnectStatus,
} from '../api/healthConnect';

// 세션스토리지 암호화 / 복호화 유틸리티 함수
const saveEncryptedData = (key, data) => {
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

const getDecryptedData = (key) => {
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

const HealthConnect = () => {
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  // 이미 연결되어 있으면 권한 요청 단계를 건너뛴다
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await getHealthConnectStatus();
        if (response.data && response.data.isSuccess && response.data.result?.connected) {
          navigate('/onboarding/profile');
        }
      } catch (error) {
        console.error('[HealthConnect] 연결 상태 조회 실패:', error.message);
      }
    };

    checkStatus();
  }, [navigate]);

  // Health Connect 권한이 승인되면 서버에 연결을 등록하고 기기 토큰을 저장한다
  const registerConnection = useCallback(async (deviceId) => {
    if (!deviceId) {
      console.warn(
        '[HealthConnect] deviceId가 없어 연결 등록(POST /api/health-connect/connections)을 건너뜁니다.',
      );
      navigate('/onboarding/profile');
      return;
    }

    try {
      const response = await registerHealthConnectConnection(deviceId);
      if (response.data && response.data.isSuccess) {
        saveEncryptedData('health_connect_data', {
          healthDeviceToken: response.data.result.healthDeviceToken,
        });
      }
    } catch (error) {
      console.error('[HealthConnect] 연결 등록 실패:', error.message);
    }

    navigate('/onboarding/profile');
  }, [navigate]);

  useEffect(() => {
    const bridge = window.ToMetaNative;

    if (!bridge?.addEventListener) {
      return;
    }

    const handleMessage = (event) => {
      setIsRequesting(false);

      const rawData = event.data;
      let status = rawData;
      let deviceId = null;

      try {
        const parsed = JSON.parse(rawData);
        status = parsed.status ?? rawData;
        deviceId = parsed.deviceId ?? null;
      } catch {
        // rawData가 'granted' 같은 순수 문자열이면 그대로 사용
      }

      switch (status) {
        case 'granted':
          registerConnection(deviceId);
          break;

        case 'denied':
          console.warn('Health Connect 권한이 거부되었거나 일부 권한이 허용되지 않았습니다.');
          break;

        case 'unavailable':
          console.error('이 기기에서는 Health Connect를 사용할 수 없습니다.');
          break;

        case 'busy':
          console.warn('Health Connect 권한 요청이 이미 진행 중입니다.');
          break;

        default:
          console.warn('알 수 없는 Native Bridge 응답:', rawData);
      }
    };

    bridge.addEventListener('message', handleMessage);

    return () => {
      bridge.removeEventListener('message', handleMessage);
    };
  }, [navigate, registerConnection]);

  const onConnect = () => {
    const bridge = window.ToMetaNative;

    if (!bridge?.postMessage) {
      console.error('Android WebView Native Bridge를 사용할 수 없습니다.');
      return;
    }

    setIsRequesting(true);
    bridge.postMessage('requestHealthConnectPermissions');
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>
          원활한 서비스 이용을 위해
          <br />
          Health Connect 데이터
          <br />
          접근 권한이 필요해요
        </Title>
        <Text>
          수집된 데이터는 AI 분석 및 리포트 제공 목적으로만 사용되며,
          <br />
          언제든 연동을 해제할 수 있습니다
        </Text>
      </ContentWrapper>

      <Button onClick={onConnect} disabled={isRequesting}>
        {isRequesting ? '권한 확인 중...' : '건강데이터 권한 요청'}
      </Button>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100dvh;
  box-sizing: border-box;
  padding: 26px 17px;

  @media ${media.mobileM} {
    padding: 30px 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 68px;

  @media ${media.mobileM} {
    gap: 16px;
    margin-top: 80px;
  }
`;

export const Title = styled.h1`
  font-size: 27px;
  font-weight: 700;
  line-height: 1.35;
  color: #000000;
  margin: 0;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 32px;
  }
`;

export const Text = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: #918d8d;
  margin: 0;
  word-break: keep-all;

  @media ${media.mobileM} {
    font-size: 14px;
  }
`;

export default HealthConnect;
