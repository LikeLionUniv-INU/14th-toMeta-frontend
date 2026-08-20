import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

export const agreeConsents = async (consentData) => {
  if (USE_MOCK) {
    console.log('[Mock API] 약관 동의:', consentData);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.post('/api/onboarding/consents', consentData);
};

export const getOnboardingStatus = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: { isOnboardingCompleted: false, step: 'BASIC_INFO' },
      },
    };
  }
  return api.get('/api/onboarding/status');
};

export const registerHealthConnect = async (data) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        message: 'Health Connect 연결 성공',
        result: null,
      },
    };
  }
  return api.post('/api/health-connect/connections', data);
};

export const getHealthConnectStatus = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: { isConnected: true, lastSyncedAt: '2026-08-16T12:00:00' },
      },
    };
  }
  return api.get('/api/health-connect/status');
};

export const syncHealthConnectData = async (healthData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.post('/api/health-connect/sync', healthData);
};

export const registerPushToken = async (tokenData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: { pushTokenId: 1 } } };
  }
  return api.post('/api/push-tokens', tokenData);
};

export const deletePushToken = async (pushTokenId) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.delete(`/api/push-tokens/${pushTokenId}`);
};
