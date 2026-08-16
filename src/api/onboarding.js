import api from './axios';

// 약관 동의 및 익명 사용자 생성 (POST /api/onboarding/consents)
export const agreeConsents = (consentData) =>
  api.post('/api/onboarding/consents', consentData);

// 온보딩 상태 조회 (GET /api/onboarding/status)
export const getOnboardingStatus = () => api.get('/api/onboarding/status');

// Health Connect 연결 등록 (POST /api/health-connect/connections)
export const registerHealthConnect = (data) =>
  api.post('/api/health-connect/connections', data);

// Health Connect 연결 상태 조회 (GET /api/health-connect/status)
export const getHealthConnectStatus = () =>
  api.get('/api/health-connect/status');

// Health Connect 데이터 동기화 (POST /api/health-connect/sync)
export const syncHealthConnectData = (healthData) =>
  api.post('/api/health-connect/sync', healthData);

// FCM Push Token 등록 (POST /api/push-tokens)
export const registerPushToken = (tokenData) =>
  api.post('/api/push-tokens', tokenData);

// FCM Push Token 삭제 (DELETE /api/push-tokens/{pushTokenId})
export const deletePushToken = (pushTokenId) =>
  api.delete(`/api/push-tokens/${pushTokenId}`);
