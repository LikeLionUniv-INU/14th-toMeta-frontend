import api from './axios';

// 일간 리포트 조회 (GET /api/reports/daily/{date})
export const getDailyReport = (date) => api.get(`/api/reports/daily/${date}`);

// 월별 리포트 목록 조회 (GET /api/reports?year=...&month=...)
export const getMonthlyReports = (params) =>
  api.get('/api/reports', { params });

// 주간 리포트 상세 조회 (GET /api/reports/weekly/{reportId})
export const getWeeklyReportDetail = (reportId) =>
  api.get(`/api/reports/weekly/${reportId}`);

// 주간 리포트 Note 수정 (PATCH /api/reports/weekly/{reportId}/note)
export const updateWeeklyReportNote = (reportId, noteData) =>
  api.patch(`/api/reports/weekly/${reportId}/note`, noteData);
