import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './styles/AppLayout';
import Privacy from './pages/Privacy';
import HealthConnect from './pages/HealthConnect';
import ProfileInput from './pages/ProfileInput';
import SkintypeInput from './pages/SkintypeInput';
import Notification from './pages/Notification';
import RecordRedirect from './pages/Record-Redirect';
import TodayNote from './pages/TodayNote';
import Record from './pages/Record';
import PouchRedirect from './pages/Pouch-Redirect';
import EmptyPouch from './pages/EmptyPouch';
import MyPouch from './pages/MyPouch';
import Set from './pages/Set';
import SearchCosmetic from './pages/SearchCosmetic';
import SearchResult from './pages/SearchResult';
import CustomName from './pages/CustomName';
import CustomCategory from './pages/CustomCategory';
import CustomIngredient from './pages/CustomIngredient';
import Report from './pages/Report';
import MyPage from './pages/Mypage';
import EditProfile from './pages/EditProfile';
import DailyReport from './pages/DailyReport/DailyReport';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/health-connect" element={<HealthConnect />} />
          <Route path="/onboarding/profile" element={<ProfileInput />} />
          <Route path="/onboarding/skin-type" element={<SkintypeInput />} />
          <Route path="/onboarding/notification" element={<Notification />} />
          <Route path="/record-redirect" element={<RecordRedirect />} />
          <Route path="/todaynote" element={<TodayNote />} />
          <Route path="/todaynote/:date" element={<TodayNote />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/:date" element={<Record />} />

          <Route path="/pouch-redirect" element={<PouchRedirect />} />
          <Route path="/empty-pouch" element={<EmptyPouch />} />
          <Route path="/my-pouch" element={<MyPouch />} />
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
          <Route path="/report" element={<Report />} />
          {/* 리포트 페이지 라우트 */}
          <Route path="/report/daily" element={<DailyReport />} />
          <Route path="/report/daily/:date" element={<DailyReport />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
