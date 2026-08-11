import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './styles/AppLayout';
import HealthConnect from './pages/HealthConnect';
import DefaultInput from './pages/DefaultInput';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/healthconnect" element={<HealthConnect />} />
          <Route path="/defaultinput" element={<DefaultInput />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
