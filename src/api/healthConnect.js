import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

// POST /api/health-connect/connections, POST /api/health-connect/sync는
// 안드로이드 네이티브(HealthConnectRepository / HealthSyncCoordinator)가
// anonymous_session 쿠키와 자체 healthDeviceToken 저장소를 이용해 직접 호출한다.
// 프론트(React)는 그 결과를 window.ToMetaNative 메시지로만 전달받으므로
// 이 두 엔드포인트를 axios로 호출할 필요가 없다.

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
