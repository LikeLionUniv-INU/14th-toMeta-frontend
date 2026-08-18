import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

export const getDailyReport = async (date) => {
  if (USE_MOCK) {
    // 1. 당일 생성된 리포트가 없는 경우 Mock 테스트 시 주석 해제하여 확인 가능
    /*return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          date: date || '2026-08-12',
          status: 'collecting',
          healthSummary: null,
          aiAnalysis: null,
          personalizedSolution: null,
          note: null,
        },
      },
    };*/

    // 2. 정상 리포트 생성 완료 Mock 데이터
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          date: date || '2026-08-04',
          healthSummary: {
            sleepMinutes: 648,
            skinTemperature: 34.7,
            exerciseDuration: 124,
            totalCaloriesBurned: 901,
            menstrualCycle: {
              menstrualCycleDay: 28,
              cycleLength: 28,
            },
            avgSpo2: 97.5,
          },
          aiAnalysis:
            '오늘 밤 피부 온도가 평소보다 높아졌는데, 이는 늦은 시간 고열량 야식 섭취와 수면 부족이 복합적으로 작용했기 때문으로 추정돼요.',
          personalizedSolution:
            '자극적인 과자 대신 수분이 많은 간식으로 바꿔보세요.',
          note: null,
        },
      },
    };
  }
  return api.get(`/api/reports/daily/${date}`);
};

export const updateDailyReportNote = async (date, noteData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch(`/api/reports/daily/${date}/note`, noteData);
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
