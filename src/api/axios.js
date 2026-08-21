import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const serverData = error.response.data;

      if (serverData && serverData.message) {
        error.message = serverData.message;
      }

    } else {
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