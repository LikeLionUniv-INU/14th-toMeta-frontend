import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 로컬 개발 중 백엔드로 보내는 /api 요청을 Vite 서버가 대신 중계한다.
      // 브라우저 입장에서는 요청이 항상 localhost(같은 origin)로 가므로
      // CORS 문제가 없고, Chrome이 localhost를 보안 컨텍스트로 취급해서
      // 백엔드가 내려주는 Secure 쿠키도 정상적으로 저장된다.
      '/api': {
        target: 'https://tometa-server.duckdns.org',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
