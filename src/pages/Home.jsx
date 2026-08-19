import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeData } from '../api/home';
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

  // 오늘 이전 = 기록된 표정, 오늘 = "+" 기록 버튼, 오늘 이후 = 연한 회색 빈 칸
  const weekDays = (homeData.week?.days || []).map((item) => {
    const day = DAY_NAMES[new Date(item.date).getDay()];

    if (item.date === today) {
      return {
        date: item.date,
        day,
        color: '#ffffff',
        children: (
          <S.PlusButton onClick={() => navigate('/todaynote')}>+</S.PlusButton>
        ),
      };
    }

    if (item.date < today) {
      return {
        date: item.date,
        day,
        color: item.skinStatus ? SKIN_STATUS_COLORS[item.skinStatus] : null,
        children: item.skinStatus ? (
          <StatusFace level={item.skinStatus} />
        ) : null,
      };
    }

    return {
      date: item.date,
      day,
      color: '#e2e8f0',
      children: null,
    };
  });

  const { yesterdayReport, latestDailyReport, skinCareTip, nickname } =
    homeData;

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

          {yesterdayReport?.recordExists ? (
            <>
              <S.ReportCardHeading>지난 리포트 요약</S.ReportCardHeading>
              <S.ReportCardBox>{yesterdayReport.summary}</S.ReportCardBox>

              <div style={{ height: 12 }} />

              <S.ReportCardHeading>오늘 실천 가이드</S.ReportCardHeading>
              <S.ReportCardBox>{yesterdayReport.actionGuide}</S.ReportCardBox>

              {yesterdayReport.reportAvailable && latestDailyReport && (
                <S.ReportCardButton
                  onClick={() =>
                    navigate(`/report/daily/${latestDailyReport.date}`)
                  }
                >
                  지난 리포트 보러가기
                </S.ReportCardButton>
              )}
            </>
          ) : (
            <S.EmptyReportBox>
              아직 어제 기록이 없어요. 오늘부터 기록을 시작해 보세요!
            </S.EmptyReportBox>
          )}
        </S.ReportCard>

        <S.TipContainer>
          <S.AvatarCircle />
          <S.TipBubble>{skinCareTip}</S.TipBubble>
        </S.TipContainer>
      </S.Content>

      <NavigationBar />
    </S.Container>
  );
};

export default Home;
