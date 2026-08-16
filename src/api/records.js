import api from './axios';

// 홈 화면 조회 (GET /api/home)
export const getHomeData = () => api.get('/api/home');

// 피부 사진 업로드 Presigned URL 발급 (POST /api/images/presigned-upload-urls)
export const getPresignedUploadUrl = (imageData) =>
  api.post('/api/images/presigned-upload-urls', imageData);

// 일일 기록 등록 (POST /api/daily-records)
export const createDailyRecord = (recordData) =>
  api.post('/api/daily-records', recordData);

// 일일 기록 조회 (GET /api/daily-records/{date})
export const getDailyRecord = (date) => api.get(`/api/daily-records/${date}`);

// 일일 기록 수정 (PATCH /api/daily-records/{date})
export const updateDailyRecord = (date, recordData) =>
  api.patch(`/api/daily-records/${date}`, recordData);
