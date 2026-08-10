import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import HealthConnect from './pages/HealthConnect';
import RecordDefaultInput from './pages/RecordDefaultInput';

/**
 * Configures the application layout and client-side routes.
 */
function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/healthconnect" element={<HealthConnect />} />
          <Route path="/recorddefaultinput" element={<RecordDefaultInput />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
