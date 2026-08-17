import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

export const getHomeData = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          userName: '도영',
          skinScore: 82,
          weather: { temp: 24, uvIndex: '보통', humidity: 55 },
          todayRecordExist: false,
        },
      },
    };
  }
  return api.get('/api/home');
};

export const getPresignedUploadUrl = async (imageData) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          uploadUrl: 'https://mock-s3-upload-url.com',
          imageUrl: 'https://placehold.co/400x400',
        },
      },
    };
  }
  return api.post('/api/images/presigned-upload-urls', imageData);
};

export const createDailyRecord = async (recordData) => {
  if (USE_MOCK) {
    console.log('[Mock API] 데일리 기록 등록:', recordData);
    return { data: { isSuccess: true, result: { recordId: 101 } } };
  }
  return api.post('/api/daily-records', recordData);
};

export const getDailyRecord = async (date) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          date,
          skinCondition: 'GOOD',
          memo: '피부 상태 양호함',
          usedCosmetics: [1, 2],
        },
      },
    };
  }
  return api.get(`/api/daily-records/${date}`);
};

export const updateDailyRecord = async (date, recordData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch(`/api/daily-records/${date}`, recordData);
};
