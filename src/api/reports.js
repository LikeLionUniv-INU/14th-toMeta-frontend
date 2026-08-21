import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

export const getDailyReport = async (date) => {
  if (USE_MOCK) {
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
          personalizedSolution: '자극적인 과자 대신 수분이 많은 간식으로 바꿔보세요.',
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
    const year = params?.year || 2026;
    const month = params?.month || 8;

    const lastDate = new Date(year, month, 0).getDate();
    const recordedDays = [2, 3, 4, 5, 7, 10, 11, 12, 13, 14];
    const skinConditionCycle = ['VERY_BAD', 'BAD', 'NORMAL', 'GOOD', 'VERY_GOOD'];

    const dailyReports = Array.from({ length: lastDate }, (_, i) => {
      const day = i + 1;
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasDailyReport = recordedDays.includes(day);
      return {
        date: dateStr,
        hasDailyReport,
        skinCondition: hasDailyReport ? skinConditionCycle[day % skinConditionCycle.length] : null,
      };
    });

    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          year,
          month,
          dailyReports,
          weeklyReports: [
            {
              reportId: 13,
              weekNumber: 1,
              startDate: '2026-07-27',
              endDate: '2026-08-02',
            },
            {
              reportId: 16,
              weekNumber: 2,
              startDate: '2026-08-03',
              endDate: '2026-08-09',
            },
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
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          reportId: Number(reportId) || 13,
          title: '8월 첫째 주',
          startDate: '2026-07-27',
          endDate: '2026-08-02',

          skinStatus: [
            { date: '2026-07-27', value: 'very_bad' },
            { date: '2026-07-28', value: 'bad' },
            { date: '2026-07-29', value: 'normal' },
            { date: '2026-07-30', value: null },
            { date: '2026-07-31', value: 'good' },
            { date: '2026-08-01', value: 'very_good' },
            { date: '2026-08-02', value: 'good' },
          ],

          sleepSession: [
            {
              date: '2026-07-27',
              sleep: {
                totalSleep: 420,
                awake: 15,
                lightSleep: 210,
                deepSleep: 120,
                remSleep: 75,
              },
            },
            {
              date: '2026-07-28',
              sleep: {
                totalSleep: 390,
                awake: 20,
                lightSleep: 200,
                deepSleep: 100,
                remSleep: 70,
              },
            },
            { date: '2026-07-29', sleep: null },
            {
              date: '2026-07-30',
              sleep: {
                totalSleep: 450,
                awake: 10,
                lightSleep: 230,
                deepSleep: 130,
                remSleep: 80,
              },
            },
            {
              date: '2026-07-31',
              sleep: {
                totalSleep: 480,
                awake: 5,
                lightSleep: 240,
                deepSleep: 140,
                remSleep: 95,
              },
            },
            {
              date: '2026-08-01',
              sleep: {
                totalSleep: 360,
                awake: 30,
                lightSleep: 180,
                deepSleep: 90,
                remSleep: 60,
              },
            },
            {
              date: '2026-08-02',
              sleep: {
                totalSleep: 430,
                awake: 15,
                lightSleep: 215,
                deepSleep: 125,
                remSleep: 75,
              },
            },
          ],

          skinTemperature: [
            { date: '2026-07-27', value: 30.0 }, // 월
            { date: '2026-07-28', value: 33.8 }, // 화
            { date: '2026-07-29', value: 31.6 }, // 수
            { date: '2026-07-30', value: 30.0 }, // 목
            { date: '2026-07-31', value: 29.0 }, // 금
            { date: '2026-08-01', value: 33.6 }, // 토
            { date: '2026-08-02', value: 32.0 }, // 일
          ],

          exerciseDuration: [
            { date: '2026-07-27', value: '45' },
            { date: '2026-07-28', value: null },
            { date: '2026-07-29', value: '60' },
            { date: '2026-07-30', value: null },
            { date: '2026-07-31', value: '30' },
            { date: '2026-08-01', value: '50' },
            { date: '2026-08-02', value: null },
          ],

          totalCaloriesBurned: [
            { date: '2026-07-27', value: '66' },
            { date: '2026-07-28', value: null },
            { date: '2026-07-29', value: '205.6' },
            { date: '2026-07-30', value: '801' },
            { date: '2026-07-31', value: null },
            { date: '2026-08-01', value: '122' },
            { date: '2026-08-02', value: '421' },
          ],

          menstrualCycle: [
            { date: '2026-07-27', menstrualCycleDay: '14', cycleLength: '28' },
            { date: '2026-07-28', menstrualCycleDay: '15', cycleLength: '28' },
            { date: '2026-07-29', menstrualCycleDay: '16', cycleLength: '28' },
            { date: '2026-07-30', menstrualCycleDay: '17', cycleLength: '28' },
            { date: '2026-07-31', menstrualCycleDay: '18', cycleLength: '28' },
            { date: '2026-08-01', menstrualCycleDay: '19', cycleLength: '28' },
            { date: '2026-08-02', menstrualCycleDay: '20', cycleLength: '28' },
          ],

          avgSpo2: [
            { date: '2026-07-27', value: '97.5' },
            { date: '2026-07-28', value: null },
            { date: '2026-07-29', value: '98.0' },
            { date: '2026-07-30', value: '97.0' },
            { date: '2026-07-31', value: '99.0' },
            { date: '2026-08-01', value: '96.8' },
            { date: '2026-08-02', value: '98.2' },
          ],

          photos: [
            {
              date: '2026-07-27',
              imageUrl: 'https://placehold.co/120x150/e2e8f0/64748b?text=Photo+1',
            },
            {
              date: '2026-07-29',
              imageUrl: 'https://placehold.co/120x150/e2e8f0/64748b?text=Photo+2',
            },
            {
              date: '2026-08-01',
              imageUrl: 'https://placehold.co/120x150/e2e8f0/64748b?text=Photo+3',
            },
          ],

          weeklySummary: '전반적으로 붉은기와 열감이 많이 감소한 한 주였어요!',
          aiAnalysis: [
            '이번 주는 전반적으로 붉은기와 열감이 많이 감소한 한 주였어요!',
            '화요일에 발생했던 볼 부위의 붉은기와 화농성 여드름이 금요일에는 많이 완화되었어요.',
            '시카/판테놀 성분이 들어간 제품을 사용했을 때, 피부 상태가 좋다고 기록했어요.',
            '이번 주는 지난주보다 수분 섭취량이 늘어났어요! 이러한 수분 보충이 피부결 진정과 유지에 긍정적인 도움이 되었을 것으로 기대돼요. 💧',
          ],

          personalizedSolution:
            '이번 주는 취침 시간이 불규칙했어요. 다음 주에는 ‘주 3회 이상 밤 12시 전 눕기’를 목표로 수면 리듬을 맞춰보는 건 어떨까요?',
          note: '',
        },
      },
    };
  }
  return api.get(`/api/reports/weekly/${reportId}`);
};

export const updateWeeklyReportNote = async (reportId, noteData) => {
  if (USE_MOCK) {
    if (noteData.note && noteData.note.length > 300) {
      return Promise.reject({
        response: {
          data: {
            isSuccess: false,
            code: 'REPORT_4002',
            message: '리포트 Note는 최대 300자까지 입력할 수 있습니다.',
            result: null,
          },
        },
      });
    }
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          note: noteData.note,
        },
      },
    };
  }
  return api.patch(`/api/reports/weekly/${reportId}/note`, noteData);
};
