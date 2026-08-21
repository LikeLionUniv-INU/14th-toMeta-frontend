import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

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
