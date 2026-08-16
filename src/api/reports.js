import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

export const getDailyReport = async (date) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          date,
          summary: '유수분 밸런스가 안정적입니다.',
          causeAnalysis: '수면 시간 확보가 긍정적인 영향을 주었습니다.',
          cautionIngredients: ['인공향료'],
        },
      },
    };
  }
  return api.get(`/api/reports/daily/${date}`);
};

export const getMonthlyReports = async (params) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          year: params?.year || 2026,
          month: params?.month || 8,
          weeklyReports: [
            { reportId: 1, weekRange: '8월 1주차', avgScore: 78 },
            { reportId: 2, weekRange: '8월 2주차', avgScore: 84 },
          ],
        },
      },
    };
  }
  return api.get('/api/reports', { params });
};

export const getWeeklyReportDetail = async (reportId) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          reportId,
          title: '8월 2주차 피부 분석 리포트',
          summaryText: '자극도가 전주 대비 15% 감소했습니다.',
          userNote: '주 3회 팩을 진행함',
        },
      },
    };
  }
  return api.get(`/api/reports/weekly/${reportId}`);
};

export const updateWeeklyReportNote = async (reportId, noteData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch(`/api/reports/weekly/${reportId}/note`, noteData);
};
