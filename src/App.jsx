import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './styles/AppLayout';
import Privacy from './pages/Privacy';
import HealthConnect from './pages/HealthConnect';
import TodayNote from './pages/TodayNote';
import EmptyPouch from './pages/EmptyPouch';
import ProfileInput from './pages/ProfileInput';
import SkintypeInput from './pages/SkintypeInput';
import Notification from './pages/Notification';
import SearchCosmetic from './pages/SearchCosmetic';
import SearchResult from './pages/SearchResult';
import CustomName from './pages/CustomName';
import CustomCategory from './pages/CustomCategory';
import CustomIngredient from './pages/CustomIngredient';
import MyPage from './pages/Mypage';
import Record from './pages/Record';
import EditProfile from './pages/EditProfile';
import MyPouch from './pages/MyPouch';
import Set from './pages/Set';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/healthconnect" element={<HealthConnect />} />
          <Route path="/onboarding/profile" element={<ProfileInput />} />
          <Route path="/onboarding/skin-type" element={<SkintypeInput />} />
          <Route path="/onboarding/notification" element={<Notification />} />
          <Route path="/todaynote" element={<TodayNote />} />
          <Route path="/record" element={<Record />} />
          <Route path="/emptypouch" element={<EmptyPouch />} />
          <Route path="/mypouch" element={<MyPouch />} />
          <Route path="/set/:setId" element={<Set />} />
          <Route
            path="/register/search-cosmetic"
            element={<SearchCosmetic />}
          />
          <Route path="/register/search-result" element={<SearchResult />} />
          <Route path="/register/custom-name" element={<CustomName />} />
          <Route
            path="/register/custom-category"
            element={<CustomCategory />}
          />
          <Route
            path="/register/custom-ingredient"
            element={<CustomIngredient />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
