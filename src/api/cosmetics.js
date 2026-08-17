import api from './axios';

const USE_MOCK = true; // 실서버 연동 시 false로 변경

export const getCosmeticOptions = async () => {
  if (USE_MOCK) {
    return {
      data: {
        isSuccess: true,
        code: "COMMON_200",
        message: "요청에 성공했습니다.",
        result: {
          sets: [
            {
              setId: 1,
              name: "진정템",
              usageTime: "morning",
              mainIngredients: ["어성초", "진정", "피지조절"],
            },
            {
              setId: 2,
              name: "사용자 지정 이름",
              usageTime: "both",
              mainIngredients: ["티트리", "진정", "수분보충"],
            },
          ],
          cosmetics: [
            {
              userCosmeticId: 11,
              productName: "아누아 어성초 77% 진정 토너",
              brandName: "아누아",
              productType: "toner",
              mainIngredients: ["어성초", "진정", "피지조절"],
            },
            {
              userCosmeticId: 12,
              productName: "토리든 다이브인 저분자 히알루론산 세럼",
              brandName: "토리든",
              productType: "serum",
              mainIngredients: ["히알루론산", "수분", "속건조"],
            },
            {
              userCosmeticId: 13,
              productName: "브링그린 티트리 시카 크림",
              brandName: "브링그린",
              productType: "cream",
              mainIngredients: ["티트리", "시카", "진정"],
            },
          ],
        },
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
          {
            id: 1,
            name: `${keyword} 시카 수딩 크림`,
            imageUrl:
              'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0022/A00000022655318ko.jpg?l=ko&QT=85&SF=webp&sharpen=1x0.5',
          },
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