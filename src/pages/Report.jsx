import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar.jsx';
import colorBarImg from '../assets/images/colorbar.png';
import before from '../assets/images/before.png';
import after from '../assets/images/after.png';
import { getMonthlyReports } from '../api/reports';
import { getDailyRecord } from '../api/records';
import { formatLocalDate } from '../utils/dateFormat';
import NoReportModal from '../components/modal/NoReportModal';
import useModalBackClose from '../hooks/useModalBackClose';

const Report = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayStr = formatLocalDate(today);

  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const isCurrentMonthOrFuture =
    currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth >= today.getMonth());

  const prevMonthLabel = `${new Date(currentYear, currentMonth - 1, 1).getMonth() + 1}월`;
  const nextMonthLabel = `${new Date(currentYear, currentMonth + 1, 1).getMonth() + 1}월`;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    if (!isCurrentMonthOrFuture) {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    calendarDays.push(d);
  }

  const weekNames = {
    1: '첫째 주',
    2: '둘째 주',
    3: '셋째 주',
    4: '넷째 주',
    5: '다섯째 주',
  };

  const statusColors = {
    very_bad: '#FF5900',
    bad: '#FF8237',
    normal: '#FFAA6E',
    good: '#FFD3A5',
    very_good: '#fff3ce',
  };

  const [dailyStatusMap, setDailyStatusMap] = useState({});
  const [reportExistsMap, setReportExistsMap] = useState({});
  const [weeklyReports, setWeeklyReports] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchMonthlyReports = async () => {
      try {
        const response = await getMonthlyReports({
          year: currentYear,
          month: currentMonth + 1,
        });

        const fetchedDailyReports = response.data.result.dailyReports || [];
        const statusMap = {};
        const reportMap = {};
        const unreportedDates = [];

        fetchedDailyReports.forEach((item) => {
          const day = Number(item.date.split('-')[2]);
          if (item.hasDailyReport && item.skinCondition) {
            statusMap[day] = item.skinCondition.toLowerCase();
            reportMap[day] = true;
          } else if (item.date <= todayStr) {
            // 미래 날짜는 기록이 있을 수 없으니 조회하지 않는다
            unreportedDates.push({ day, date: item.date });
          }
        });

        setDailyStatusMap(statusMap);
        setReportExistsMap(reportMap);

        const fetchedWeeklyReports = response.data.result.weeklyReports || [];
        setWeeklyReports(fetchedWeeklyReports);

        // 리포트가 아직 발행 안 된 날짜는, 헬스데이터 없이 기록만 했을 수도 있으니
        // 일일 기록 API에서 피부 상태만 따로 가져와 캘린더에 색만 입혀준다
        // (리포트가 없으니 클릭해도 리포트 상세로는 이동하지 않음).
        if (unreportedDates.length > 0) {
          const results = await Promise.allSettled(unreportedDates.map(({ date }) => getDailyRecord(date)));

          if (isCancelled) return;

          const recordStatusMap = {};
          results.forEach((result, index) => {
            if (
              result.status === 'fulfilled' &&
              result.value?.data?.isSuccess &&
              result.value.data.result?.skinStatus
            ) {
              recordStatusMap[unreportedDates[index].day] = result.value.data.result.skinStatus.toLowerCase();
            }
          });

          if (Object.keys(recordStatusMap).length > 0) {
            setDailyStatusMap((prev) => ({ ...prev, ...recordStatusMap }));
          }
        }
      } catch (error) {
        console.error('[Report] 월별 리포트 목록 조회 실패:', error);
      }
    };

    fetchMonthlyReports();

    return () => {
      isCancelled = true;
    };
  }, [currentYear, currentMonth, todayStr]);

  const currentDailyStatus = dailyStatusMap;
  const reportsToDisplay = weeklyReports;

  const [noReportModalVariant, setNoReportModalVariant] = useState(null);
  const closeNoReportModal = useModalBackClose(Boolean(noReportModalVariant), () => setNoReportModalVariant(null));

  const handleDateClick = (day) => {
    if (reportExistsMap[day]) {
      navigate(`/report/daily/${formatLocalDate(new Date(currentYear, currentMonth, day))}`);
    } else if (currentDailyStatus[day]) {
      const clickedIsToday =
        currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate();
      setNoReportModalVariant(clickedIsToday ? 'today' : 'past');
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <NavGroup>
            <NavButton type="button" onClick={handlePrevMonth}>
              <NavIcon src={before} alt="이전달" />
            </NavButton>
            <NavMonthLabel>{prevMonthLabel}</NavMonthLabel>
          </NavGroup>
          <HeaderTitle>
            {currentYear}년 {currentMonth + 1}월
          </HeaderTitle>
          <NavGroup $align="end" $hidden={isCurrentMonthOrFuture}>
            <NavMonthLabel>{nextMonthLabel}</NavMonthLabel>
            <NavButton type="button" tabIndex={isCurrentMonthOrFuture ? -1 : 0} onClick={handleNextMonth}>
              <NavIcon src={after} alt="다음달" />
            </NavButton>
          </NavGroup>
        </Header>

        <WeekGrid>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <WeekDay key={day} $isSunday={idx === 0}>
              {day}
            </WeekDay>
          ))}
        </WeekGrid>

        <CalendarGrid>
          {calendarDays.map((day, index) => {
            if (!day) {
              return <DayCell key={`empty-${index}`} $empty />;
            }

            const isToday =
              currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate();
            const isSunday = index % 7 === 0;
            const status = currentDailyStatus[day];
            const dailyBgColor = status ? statusColors[status] : 'transparent';

            return (
              <DayCell
                key={day}
                $bgColor={dailyBgColor}
                $hasReport={!!reportExistsMap[day]}
                onClick={() => handleDateClick(day)}
              >
                <DayCircle $isToday={isToday} $isSunday={isSunday}>
                  {day}
                </DayCircle>
              </DayCell>
            );
          })}
        </CalendarGrid>

        <IndicatorSection>
          <IndicatorLabel>나쁨</IndicatorLabel>
          <ColorBarImage src={colorBarImg} alt="색상 인디케이터 바" />
          <IndicatorLabel>좋음</IndicatorLabel>
        </IndicatorSection>

        <GuideText>
          <GuideIcon>💬</GuideIcon>
          주간리포트는 일간 기록이 최소 2개 이상 작성되어야 발행돼요!
        </GuideText>

        <ReportList>
          {reportsToDisplay.map((report) => (
            <ReportButton key={report.weekNumber} type="button" onClick={() => navigate(`/report/weekly/${report.reportId}`)}>
              {weekNames[report.weekNumber] || `${report.weekNumber}주차`} 주간 리포트
            </ReportButton>
          ))}
        </ReportList>
      </Content>

      <NavigationBar />

      <NoReportModal
        isOpen={!!noReportModalVariant}
        variant={noReportModalVariant || 'past'}
        onClose={closeNoReportModal}
      />
    </Container>
  );
};

export default Report;

const Container = styled.div`
  max-width: 430px;
  height: 100dvh;
  margin: 0 0 calc(73px + env(safe-area-inset-bottom, 0px)) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Content = styled.main`
  padding: 24px 20px;
  flex: 1;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin: 0;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  justify-self: ${(props) => (props.$align === 'end' ? 'end' : 'start')};
  gap: 8px;
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};
  pointer-events: ${(props) => (props.$hidden ? 'none' : 'auto')};
`;

const NavMonthLabel = styled.span`
  font-size: 12px;
  color: #737373;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavIcon = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 12px;
`;

const WeekDay = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.$isSunday ? '#E85B4E' : '#333333')};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0px;
  text-align: center;
  border-top: 1px solid #c9c9c9;
`;

const DayCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 6px;
  cursor: ${(props) => (props.$empty ? 'default' : 'pointer')};
  height: 62px;
  background-color: ${(props) => props.$bgColor || 'transparent'};
  border-radius: 12px;
  box-sizing: border-box;
  transition:
    transform 0.1s ease,
    background-color 0.2s ease;

  ${(props) =>
    props.$hasReport &&
    `
    &:active {
      transform: scale(0.95);
    }
  `}
`;

const DayCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => (props.$isToday ? '#63BF8E' : 'transparent')};
  color: ${(props) => {
    if (props.$isToday) return '#FFFFFF';
    if (props.$isSunday) return '#E85B4E';
    return '#333333';
  }};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
`;

const IndicatorSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  margin-bottom: 12px;
`;

const IndicatorLabel = styled.span`
  font-size: 11px;
  color: #8e8e8e;
`;

const ColorBarImage = styled.img`
  width: 80%;
  height: 6px;
  object-fit: cover;
  border-radius: 4px;
`;

const GuideText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0 0 16px 0;
  color: #7c7c7c;
  font-size: 10px;
  font-weight: 400;
`;

const GuideIcon = styled.span`
  font-size: 10px;
`;

const ReportList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
`;

const ReportButton = styled.button`
  width: 100%;
  height: 52px;
  border: 1px solid #609668;
  background-color: #f6fffc;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #609668;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;
