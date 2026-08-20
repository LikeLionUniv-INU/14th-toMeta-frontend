import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

export const registerHealthConnectConnection = async (deviceId) => {
  if (USE_MOCK) {
    console.log('[Mock API] Health Connect 연결 등록:', deviceId);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: { healthDeviceToken: 'mock-health-device-token' },
      },
    };
  }
  return api.post('/api/health-connect/connections', { deviceId });
};

export const getHealthConnectStatus = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: { connected: false, lastSyncedAt: null },
      },
    };
  }
  return api.get('/api/health-connect/status');
};

export const syncHealthConnectData = async (healthDeviceToken, payload) => {
  if (USE_MOCK) {
    console.log('[Mock API] Health Connect 데이터 동기화:', payload);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.post('/api/health-connect/sync', payload, {
    headers: {
      Authorization: `Bearer ${healthDeviceToken}`,
    },
  });
};
