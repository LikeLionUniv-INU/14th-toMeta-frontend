import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* 원하는 경로들 추가... */}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
