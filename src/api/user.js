import api from './axios';

// 유저 정보 및 기본 정보 등록/수정 (PATCH /api/users/me/profile)
export const updateMyProfile = (profileData) =>
  api.patch('/api/users/me/profile', profileData);

// 유저 정보 조회 (GET /api/users/me/profile)
export const getMyProfile = () => api.get('/api/users/me/profile');

// 알림 설정 등록 - 온보딩용 (POST /api/users/me/notification-settings)
export const createNotificationSettings = (settings) =>
  api.post('/api/users/me/notification-settings', settings);

// 알림 설정 수정 - 마이페이지용 (PATCH /api/users/me/notification-settings)
export const updateNotificationSettings = (settings) =>
  api.patch('/api/users/me/notification-settings', settings);

// 마이페이지 전체 조회 (GET /api/users/me)
export const getMyPageData = () => api.get('/api/users/me');
