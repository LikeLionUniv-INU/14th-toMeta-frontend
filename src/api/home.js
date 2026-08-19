import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

/**
 * 홈 화면 조회
 */
export const getHomeData = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          nickname: '도영',
          week: {
            startDate: '2026-08-17',
            endDate: '2026-08-23',
            days: [
              { date: '2026-08-17', skinStatus: 'good' },
              { date: '2026-08-18', skinStatus: 'bad' },
              { date: '2026-08-19', skinStatus: null },
              { date: '2026-08-20', skinStatus: null },
              { date: '2026-08-21', skinStatus: null },
              { date: '2026-08-22', skinStatus: null },
              { date: '2026-08-23', skinStatus: null },
            ],
          },
          yesterdayReport: {
            recordExists: true,
            reportAvailable: true,
            dailyReportId: 12,
            summary:
              '어제 수면 시간이 부족하고 피부 온도가 평균보다 높게 측정되었어요.',
            actionGuide: '쿨링 진정 팩으로 어제 올라간 피부 온도 내려주기',
          },
          latestDailyReport: {
            dailyReportId: 12,
            date: '2026-08-18',
          },
          skinCareTip:
            '피부는 깨끗이 씻었는데 베개는 그대로? 기름기와 피지가 남은 베개 커버는 피부 트러블의 숨은 주범이야!',
        },
      },
    };
  }
  return api.get('/api/home');
};
