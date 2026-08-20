import api from './axios';

const USE_MOCK = false; // 실서버 연동 시 false로 변경

export const getPresignedUploadUrl = async (files) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          uploads: files.map((file, index) => ({
            uploadUrl: 'https://mock-s3-upload-url.com',
            objectKey: `skin-images/mock/${index}-${file.name}`,
            httpMethod: 'PUT',
            contentType: file.type,
          })),
        },
      },
    };
  }
  return api.post('/api/record-images/presigned-upload-url', {
    images: files.map((file) => ({
      contentType: file.type,
      fileSize: file.size,
    })),
  });
};

export const uploadImageToS3 = async (uploadUrl, file, contentType) => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }
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
    // 2026-08-12 날짜 조회 시 목 데이터 반환 예시 (그 외 날짜는 404 처리)
    if (date === '2026-08-12') {
      return {
        data: {
          isSuccess: true,
          code: 'COMMON_200',
          message: '요청에 성공했습니다.',
          result: {
            recordId: 37,
            date: '2026-08-12',
            skinStatus: 'bad',
            morningSelections: [
              {
                selectionType: 'SET',
                cosmeticSetId: 3,
                name: '진정템',
                ingredientTags: ['어성초', '판테놀', '나이아신아마이드'],
              },
              {
                selectionType: 'COSMETIC',
                userCosmeticId: 11,
                name: '에스트라 아토베리어 365 크림',
                ingredientTags: ['세라마이드', '스쿠알란', '판테놀'],
              },
            ],
            nightSelections: [
              {
                selectionType: 'COSMETIC',
                userCosmeticId: 15,
                name: '브링그린 티트리 진정크림',
                ingredientTags: ['티트리', '판테놀'],
              },
            ],
            foodMemo: '아침에 마라탕',
            images: [
              {
                imageKey: 'daily-records/uuid-1.jpg',
                imageUrl: 'https://placehold.co/400x400',
              },
            ],
            memo: '오늘 오후부터 볼 쪽이 조금 따가웠음',
          },
        },
      };
    }
    const error = new Error('해당 날짜의 기록을 찾을 수 없습니다.');
    error.response = {
      status: 404,
      data: {
        isSuccess: false,
        code: 'RECORD_4041',
        message: '해당 날짜의 기록을 찾을 수 없습니다.',
        result: null,
      },
    };
    return Promise.reject(error);
  }
  return api.get(`/api/daily-records/${date}`);
};

export const updateDailyRecord = async (date, recordData) => {
  if (USE_MOCK) {
    console.log(`[Mock API] 데일리 기록 수정 (${date}):`, recordData);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: {
          recordId: 37,
          date: date,
        },
      },
    };
  }
  return api.patch(`/api/daily-records/${date}`, recordData);
};
