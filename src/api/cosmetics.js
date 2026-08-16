import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

export const getCosmeticOptions = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: [
          {
            userCosmeticId: 1,
            name: '수분 진정 토너',
            brand: '토리든',
            type: 'TONER',
          },
          {
            userCosmeticId: 2,
            name: '시카 릴리프 세럼',
            brand: '닥터지',
            type: 'SERUM',
          },
          {
            userCosmeticId: 3,
            name: '장벽 강화 크림',
            brand: '에스트라',
            type: 'CREAM',
          },
        ],
      },
    };
  }
  return api.get('/api/cosmetic-options');
};

export const searchCosmetics = async (params) => {
  if (USE_MOCK) {
    const keyword = params?.keyword || '';
    console.log('[Mock API] 화장품 검색 키워드:', keyword);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: [
          /*
          { id: 1, name: `${keyword} 시카 진정 크림`, imageUrl: '' },
          { id: 2, name: `${keyword} 수딩 토너`, imageUrl: '' },
          { id: 3, name: `${keyword} 배리어 로션`, imageUrl: '' },*/
        ],
      },
    };
  }
  return api.get('/api/cosmetics/search', { params });
};

export const registerCosmeticFromSearch = async (cosmeticData) => {
  if (USE_MOCK) {
    console.log('[Mock API] 검색 화장품 등록:', cosmeticData);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.post('/api/user-cosmetics/from-search', cosmeticData);
};

export const registerCosmeticManual = async (customData) => {
  if (USE_MOCK) {
    console.log('[Mock API] 화장품 직접 등록:', customData);
    return {
      data: {
        isSuccess: true,
        code: 'COMMON_200',
        message: '요청에 성공했습니다.',
        result: null,
      },
    };
  }
  return api.post('/api/user-cosmetics/manual', customData);
};

export const updateMyCosmetic = async (userCosmeticId, cosmeticData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch(`/api/user-cosmetics/${userCosmeticId}`, cosmeticData);
};

export const deleteMyCosmetic = async (userCosmeticId) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.delete(`/api/user-cosmetics/${userCosmeticId}`);
};

export const searchIngredients = async (params) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: [
          '히알루론산',
          '판테놀',
          '세라마이드',
          '나이아신아마이드',
          '티트리',
        ],
      },
    };
  }
  return api.get('/api/ingredients/search', { params });
};

export const createCosmeticSet = async (setData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: { setId: 1 } } };
  }
  return api.post('/api/cosmetic-sets', setData);
};

export const getCosmeticSetDetail = async (setId) => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        result: {
          setId,
          setName: '모닝 진정 케어 세트',
          cosmetics: [
            { userCosmeticId: 1, name: '수분 토너' },
            { userCosmeticId: 2, name: '진정 앰플' },
          ],
        },
      },
    };
  }
  return api.get(`/api/cosmetic-sets/${setId}`);
};

export const updateCosmeticSet = async (setId, setData) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.patch(`/api/cosmetic-sets/${setId}`, setData);
};

export const deleteCosmeticSet = async (setId) => {
  if (USE_MOCK) {
    return { data: { isSuccess: true, result: null } };
  }
  return api.delete(`/api/cosmetic-sets/${setId}`);
};
