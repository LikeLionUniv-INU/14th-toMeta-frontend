/**
 * Axios API 인스턴스 및 인터셉터 설정
 *
 * 역할:
 * 1. 쿠키 기반 익명 세션 관리를 위한 withCredentials 설정
 * 2. 백엔드 커스텀 에러 응답(message) 자동 추출 및 표준화
 * 3. 401 (Unauthorized) 발생 시 첫 온보딩 페이지로 자동 리다이렉트
 * 4. 네트워크 에러 및 타임아웃 예외 메시지 처리
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 익명 사용자 식별 쿠키(UUID) 전송을 위한 필수 설정
  withCredentials: true,
});

/**
 * 응답 인터셉터: 서버 응답 및 에러 공통 처리
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. 서버가 에러 응답을 내려준 경우
    if (error.response) {
      const serverData = error.response.data;

      // 백엔드 공통 에러 포맷에 message가 존재하는 경우, error.message를 해당 문구로 덮어씌움
      if (serverData && serverData.message) {
        error.message = serverData.message;
      }

      // 401 Unauthorized
      if (error.response.status === 401) {
        if (window.location.pathname !== '/onboarding') {
          window.location.href = '/onboarding';
        }
      }
    }
    // 2. 서버 응답 자체가 없는 경우 (네트워크 에러, 타임아웃 등)
    else {
      if (error.code === 'ECONNABORTED') {
        error.message = '요청 시간이 초과되었습니다. 다시 시도해 주세요.';
      } else if (error.message === 'Network Error') {
        error.message = '네트워크 연결 상태를 확인해 주세요.';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
