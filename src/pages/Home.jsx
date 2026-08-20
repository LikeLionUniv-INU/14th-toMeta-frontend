import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeData } from '../api/home';
import worriedDrImg from '../assets/images/dr-acne/worried-dr.svg';
import NavigationBar from '../components/NavigationBar';
import WeeklyStatusCard from '../components/WeeklyStatusCard';
import StatusFace from '../components/StatusFace';
import { SKIN_STATUS_COLORS, DAY_NAMES } from '../constants/skinStatus';
import { formatEnglishMonthYear, formatLocalDate } from '../utils/dateFormat';
import * as S from './Home.styles';

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await getHomeData();
        if (res?.data?.isSuccess) {
          setHomeData(res.data.result);
        }
      } catch (error) {
        console.error('홈 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <S.LoadingWrapper>홈 화면을 불러오는 중입니다...</S.LoadingWrapper>;
  }

  if (!homeData) {
    return <S.LoadingWrapper>홈 데이터를 찾을 수 없습니다.</S.LoadingWrapper>;
  }

  const today = formatLocalDate(new Date());

  const weekDays = (homeData.week?.days || []).map((item) => {
    const day = DAY_NAMES[new Date(item.date).getDay()];

    if (item.date === today || item.date < today) {
      const hasRecord = Boolean(item.skinStatus);
      const isToday = item.date === today;

      return {
        date: item.date,
        day,
        isToday,
        color: hasRecord ? SKIN_STATUS_COLORS[item.skinStatus] : isToday ? '#ffffff' : null,
        children: (
          <S.PlusButton onClick={() => navigate(hasRecord ? `/record/${item.date}` : `/todaynote/${item.date}`)}>
            {hasRecord ? <StatusFace level={item.skinStatus} /> : isToday ? '+' : null}
          </S.PlusButton>
        ),
      };
    }

    return {
      date: item.date,
      day,
      color: '#e2e8f0',
      children: null,
    };
  });

  const { yesterdayReport, latestDailyReport, skinCareTip, nickname } = homeData;

  return (
    <S.Container>
      <S.Content>
        <S.Greeting>안녕하세요, {nickname} 님!</S.Greeting>

        <S.Divider />

        <WeeklyStatusCard
          title={formatEnglishMonthYear(today)}
          subtitle="오늘 내 피부 상태를 기록해 보세요."
          days={weekDays}
        />

        <S.ReportCard>
          <S.PinsLeft>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
          </S.PinsLeft>
          <S.PinsRight>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
            <S.Pin>
              <S.PinBar />
              <S.PinHole />
            </S.Pin>
          </S.PinsRight>

          <S.ReportCardHeading>지난 리포트 요약</S.ReportCardHeading>
          <S.ReportCardBox>{yesterdayReport?.recordExists ? yesterdayReport.summary : '-'}</S.ReportCardBox>

          <div style={{ height: 12 }} />

          <S.ReportCardHeading>오늘 실천 가이드</S.ReportCardHeading>
          <S.ReportCardBox>{yesterdayReport?.recordExists ? yesterdayReport.actionGuide : '-'}</S.ReportCardBox>

          {yesterdayReport?.recordExists && yesterdayReport.reportAvailable && latestDailyReport && (
            <S.ReportCardButton onClick={() => navigate(`/report/daily/${latestDailyReport.date}`)}>
              지난 리포트 보러가기
            </S.ReportCardButton>
          )}

          {!(yesterdayReport?.recordExists && yesterdayReport.reportAvailable && latestDailyReport) && (
            <S.ReportCardOverlay>어제 기록이 없어 리포트를 불러올 수 없어요.</S.ReportCardOverlay>
          )}
        </S.ReportCard>

        <S.TipContainer>
          <S.AvatarImage src={worriedDrImg} alt="여 박사" />
          <S.TipBubble>{skinCareTip}</S.TipBubble>
        </S.TipContainer>
      </S.Content>

      <NavigationBar />
    </S.Container>
  );
};

export default Home;
