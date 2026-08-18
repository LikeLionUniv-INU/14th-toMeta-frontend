import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getWeeklyReportDetail,
  updateWeeklyReportNote,
} from '../../api/reports';
import { getMyProfile } from '../../api/user';
import Header from '../../components/Header';
import MetricLineChart from './components/MetricLineChart';
import MetricBarChart from './components/MetricBarChart';
import SleepBarChart from './components/SleepBarChart';
import CyclePhaseCalendar from './components/CyclePhaseCalendar';
import { LINE_CHART_CONFIG } from './components/lineChartConfig';
import { BAR_CHART_CONFIG } from './components/barChartConfig';
import * as S from './WeeklyReport.styles';

const WeeklyReport = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('상태');

  // Note 상태 관리
  const [note, setNote] = useState('');

  // 성별에 따른 탭 목록 구성
  const getTabsByGender = (gender) => {
    const commonTabs = [
      '상태',
      '수면 세션',
      '평균 피부온도',
      '운동 시간',
      '운동 소모 칼로리',
    ];
    if (gender === 'female') {
      return [...commonTabs, '생리주기'];
    }
    return [...commonTabs, '평균 산소포화도'];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 유저 프로필 및 주간 리포트 병렬 호출
        const [profileRes, reportRes] = await Promise.all([
          getMyProfile(),
          getWeeklyReportDetail(reportId || 13),
        ]);

        if (profileRes?.data?.isSuccess) {
          setUserData(profileRes.data.result);
        }

        if (reportRes?.data?.isSuccess) {
          const result = reportRes.data.result;
          setReportData(result);
          setNote(result.note || '');
        }
      } catch (error) {
        console.error('데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reportId]);

  // 사진이 등록된 요일 텍스트 생성 헬퍼
  const getPhotoRecordedDaysText = (photos) => {
    if (!photos || photos.length === 0) return '이번 주 기록된 사진이 없어요!';
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const days = photos.map((p) => dayNames[new Date(p.date).getDay()]);
    const uniqueDays = Array.from(new Set(days)).join(', ');
    return `이번 주는 ${uniqueDays}요일 기록하셨네요!`;
  };

  // Note 저장 핸들러
  const handleSaveNote = async () => {
    if (note.length > 300) {
      alert('리포트 Note는 최대 300자까지 입력할 수 있습니다.');
      return;
    }
    try {
      await updateWeeklyReportNote(reportData.reportId, { note });
      alert('메모가 저장되었습니다.'); // 모드 전환이 없어졌으므로 성공 알림 추가
    } catch (error) {
      console.error('메모 수정 실패:', error);
      alert('메모 저장에 실패했습니다.');
    }
  };

  if (loading) {
    return <S.LoadingWrapper>리포트를 불러오는 중입니다...</S.LoadingWrapper>;
  }

  if (!reportData) {
    return (
      <S.LoadingWrapper>리포트 데이터를 찾을 수 없습니다.</S.LoadingWrapper>
    );
  }

  const tabs = getTabsByGender(userData?.gender);
  const nickname = userData?.nickname || '회원';

  return (
    <S.Container>
      <Header title="주간 리포트" variant="back" />

      <S.Content>
        <S.Title>{reportData.title}</S.Title>

        {/* 1. 성별 분기 데이터 탭 */}
        <S.TabContainer>
          {tabs.map((tab) => (
            <S.TabButton
              key={tab}
              $active={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </S.TabButton>
          ))}
        </S.TabContainer>

        {/* 2. 그래프 영역 */}
        {LINE_CHART_CONFIG[selectedTab] ? (
          <MetricLineChart
            data={reportData[LINE_CHART_CONFIG[selectedTab].dataKey]}
            unit={LINE_CHART_CONFIG[selectedTab].unit}
            domain={LINE_CHART_CONFIG[selectedTab].domain}
            ticks={LINE_CHART_CONFIG[selectedTab].ticks}
            normalRange={LINE_CHART_CONFIG[selectedTab].normalRange}
          />
        ) : BAR_CHART_CONFIG[selectedTab] ? (
          <MetricBarChart
            data={reportData[BAR_CHART_CONFIG[selectedTab].dataKey]}
            unit={BAR_CHART_CONFIG[selectedTab].unit}
            domain={BAR_CHART_CONFIG[selectedTab].domain}
            ticks={BAR_CHART_CONFIG[selectedTab].ticks}
          />
        ) : selectedTab === '수면 세션' ? (
          <SleepBarChart data={reportData.sleepSession} />
        ) : selectedTab === '생리주기' ? (
          <CyclePhaseCalendar data={reportData.menstrualCycle} />
        ) : (
          <S.ChartAreaPlaceholder>
            <p className="placeholder-text">
              📊 <strong>{selectedTab}</strong> 데이터 차트 영역
            </p>
            <span className="placeholder-sub">
              (추후 완성된 그래프 컴포넌트가 들어갈 자리입니다)
            </span>
          </S.ChartAreaPlaceholder>
        )}

        {/* 3. 사진 모아보기 */}
        <S.Section>
          <S.SectionTitle>사진 모아보기</S.SectionTitle>
          <S.SectionSubText>
            {getPhotoRecordedDaysText(reportData.photos)}
          </S.SectionSubText>
          <S.PhotoScrollList>
            {reportData.photos && reportData.photos.length > 0 ? (
              reportData.photos.map((photo, idx) => (
                <S.PhotoCard key={idx}>
                  <img src={photo.imageUrl} alt={`피부 기록 ${photo.date}`} />
                </S.PhotoCard>
              ))
            ) : (
              <S.EmptyPhotoCard>기록된 사진이 없습니다.</S.EmptyPhotoCard>
            )}
          </S.PhotoScrollList>
        </S.Section>

        <S.Divider />

        {/* 4. 이번 주 내 피부는... */}
        <S.Section>
          <S.SectionTitle>이번 주 내 피부는...</S.SectionTitle>
          <S.SummaryContainer>
            <S.AvatarCircle />
            <S.SummaryBubble>{reportData.weeklySummary}</S.SummaryBubble>
          </S.SummaryContainer>
        </S.Section>

        {/* 5. AI 피부 분석 */}
        <S.Section>
          <S.SectionTitle>AI 피부 분석</S.SectionTitle>
          <S.AnalysisList>
            {reportData.aiAnalysis?.map((text, idx) => (
              <S.AnalysisBubble key={idx}>{text}</S.AnalysisBubble>
            ))}
          </S.AnalysisList>
        </S.Section>

        {/* 6. 맞춤 솔루션 */}
        <S.Section>
          <S.SectionTitle>{nickname}님 맞춤 솔루션</S.SectionTitle>
          <S.SolutionBubble>
            {reportData.personalizedSolution || '맞춤 솔루션을 준비 중입니다.'}
          </S.SolutionBubble>
        </S.Section>

        {/* 7. Note */}
        <S.Section>
          <S.SectionTitle>Note</S.SectionTitle>
          <S.NoteWrapper>
            <S.NoteInputWrapper>
              <S.NoteTextarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="✏️ 이번 주 피부에 대해 남기고 싶은 이야기를 자유롭게 적어보세요!"
                maxLength={300}
              />
              <S.NoteActionRow>
                <S.CharCount>{note.length} / 300자</S.CharCount>
                <S.SaveButton onClick={handleSaveNote} disabled={!note.trim()}>
                  저장
                </S.SaveButton>
              </S.NoteActionRow>
            </S.NoteInputWrapper>
          </S.NoteWrapper>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default WeeklyReport;
