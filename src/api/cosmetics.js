import api from './axios';

// 내 화장품 옵션 전체 조회 (GET /api/cosmetic-options)
export const getCosmeticOptions = () => api.get('/api/cosmetic-options');

// 화장품 검색 (GET /api/cosmetics/search?keyword=...)
export const searchCosmetics = (params) =>
  api.get('/api/cosmetics/search', { params });

// 검색한 화장품 등록 (POST /api/user-cosmetics/from-search)
export const registerCosmeticFromSearch = (cosmeticData) =>
  api.post('/api/user-cosmetics/from-search', cosmeticData);

// 화장품 직접 등록 (POST /api/user-cosmetics/manual)
export const registerCosmeticManual = (customData) =>
  api.post('/api/user-cosmetics/manual', customData);

// 내 화장품 수정 (PATCH /api/user-cosmetics/{userCosmeticId})
export const updateMyCosmetic = (userCosmeticId, cosmeticData) =>
  api.patch(`/api/user-cosmetics/${userCosmeticId}`, cosmeticData);

// 내 화장품 삭제 (DELETE /api/user-cosmetics/{userCosmeticId})
export const deleteMyCosmetic = (userCosmeticId) =>
  api.delete(`/api/user-cosmetics/${userCosmeticId}`);

// 주요 성분 검색 (GET /api/ingredients/search?keyword=...)
export const searchIngredients = (params) =>
  api.get('/api/ingredients/search', { params });

// 화장품 세트 등록 (POST /api/cosmetic-sets)
export const createCosmeticSet = (setData) =>
  api.post('/api/cosmetic-sets', setData);

// 화장품 세트 상세 조회 (GET /api/cosmetic-sets/{setId})
export const getCosmeticSetDetail = (setId) =>
  api.get(`/api/cosmetic-sets/${setId}`);

// 화장품 세트 수정 (PATCH /api/cosmetic-sets/{setId})
export const updateCosmeticSet = (setId, setData) =>
  api.patch(`/api/cosmetic-sets/${setId}`, setData);

// 화장품 세트 삭제 (DELETE /api/cosmetic-sets/{setId})
export const deleteCosmeticSet = (setId) =>
  api.delete(`/api/cosmetic-sets/${setId}`);
