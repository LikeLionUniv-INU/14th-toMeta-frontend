import api from './axios';

const USE_MOCK = false;

export const updateMyProfile = async (profileData) => {
  if (USE_MOCK) {
    console.log('[Mock API] 프로필 업데이트:', profileData);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.patch('/api/users/me/profile', profileData);
};

export const getMyProfile = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          nickname: '도영',
          gender: 'male',
          ageGroup: '20s',
          skinType: 'combination_dry',
        },
      },
    };
  }
  return api.get('/api/users/me/profile');
};

export const createNotificationSettings = async (settings) => {
  if (USE_MOCK) {
    console.log('[Mock API] 알림 설정 등록:', settings);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.post('/api/users/me/notification-settings', settings);
};

export const updateNotificationSettings = async (settings) => {
  if (USE_MOCK) {
    console.log('[Mock API] 알림 설정 수정:', settings);
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch('/api/users/me/notification-settings', settings);
};

export const getMyPageData = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          nickname: '김도영',
          healthConnectLinked: true,
          pushConnected: true,
          notificationSettings: {
            dailyReportEnabled: true,
            recordReminderEnabled: true,
            recordReminderTime: '22:00',
            weeklyReportEnabled: true,
            weeklyReportTime: '22:00',
          },
        },
      },
    };
  }
  return api.get('/api/users/me');
};