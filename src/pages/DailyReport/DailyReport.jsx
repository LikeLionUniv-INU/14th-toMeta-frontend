import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyProfile } from '../../api/user';
import { getDailyReport, updateDailyReportNote } from '../../api/reports';
import * as S from './DailyReport.styles';
import Header from '../../components/Header';
import Portal from '../../components/Portal';
import menstrualImg from '../../assets/images/menstrualcycle.png';
import surprisedDr from '../../assets/images/dr-acne/surprised-dr.svg';

import {
  SleepIcon,
  TempIcon,
  ExerciseIcon,
  CalorieIcon,
  CycleIcon,
  OxygenIcon,
} from './ReportIcons';

export default function DailyReport({ date }) {
  const { date: paramDate } = useParams();
  const navigate = useNavigate();

  const targetDate = paramDate || date || new Date().toISOString().slice(0, 10);

  const [userProfile, setUserProfile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [savedNoteText, setSavedNoteText] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [profileRes, reportRes] = await Promise.all([
          getMyProfile(),
          getDailyReport(targetDate),
        ]);

        const profileData = profileRes.data;
        const reportResultData = reportRes.data;

        if (profileData?.isSuccess) {
          setUserProfile(profileData.result);
        }

        if (reportResultData?.isSuccess) {
          setReportData(reportResultData.result);
          const serverNote = reportResultData.result?.note || '';
          setNoteText(serverNote);
          setSavedNoteText(serverNote);
        } else {
          setError(
            reportResultData?.message || '리포트를 불러오는 데 실패했습니다.',
          );
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오지 못했습니다. 세션을 확인해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [targetDate]);

  const handleSaveNote = async () => {
    if (isSavingNote) return;

    try {
      setIsSavingNote(true);
      const res = await updateDailyReportNote(targetDate, {
        note: noteText,
      });

      const data = res.data;

      if (data?.isSuccess) {
        const updatedNote = data.result?.note ?? noteText;
        setNoteText(updatedNote);
        setSavedNoteText(updatedNote);
      } else {
        alert(data?.message || '노트 저장에 실패했습니다.');
      }
    } catch (err) {
      console.error('노트 저장 에러:', err);
      alert('노트 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSavingNote(false);
    }
  };

  const formatDateTitle = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayNames = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const dayOfWeek = dayNames[dateObj.getDay()];
    return `${month}월 ${day}일 ${dayOfWeek}`;
  };

  const formatSleepTime = (minutes) => {
    if (!minutes && minutes !== 0) return { h: 0, m: 0 };
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m };
  };

  const formatExerciseTime = (minutes) => {
    if (!minutes && minutes !== 0) return { h: 0, m: 0 };
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m };
  };

  const getOxygenStatus = (spo2) => {
    if (spo2 === undefined || spo2 === null)
      return { text: '측정안됨', status: 'normal' };
    const val = Number(spo2);
    if (val >= 95) return { text: '정상', status: 'normal' };
    if (val >= 90) return { text: '주의', status: 'warning' };
    return { text: '위험', status: 'danger' };
  };

  const getTempStatus = (temp) => {
    if (temp === undefined || temp === null)
      return { text: '측정안됨', status: 'normal' };
    const val = Number(temp);
    if (val <= 30.9) return { text: '낮음', status: 'low' };
    if (val <= 32.5) return { text: '정상', status: 'normal' };
    return { text: '높음', status: 'high' };
  };

  const getCyclePhaseInfo = (day) => {
    const currentDay = Number(day) || 1;

    if (currentDay >= 1 && currentDay <= 5) {
      return {
        title: '*생리기란?',
        desc: '생리가 진행되는 시기',
        deg: (currentDay / 28) * 360,
      };
    }
    if (currentDay >= 6 && currentDay <= 13) {
      return {
        title: '*난포기란?',
        desc: '난포가 성장하는 시기',
        deg: (currentDay / 28) * 360,
      };
    }
    if (currentDay >= 14 && currentDay <= 16) {
      return {
        title: '*배란기란?',
        desc: '난자가 배출되는 시기',
        deg: (currentDay / 28) * 360,
      };
    }
    return {
      title: '*황체기란?',
      desc: '배란 후 자궁이 임신을 준비하는 시기',
      deg: (currentDay / 28) * 360,
    };
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Container $center>
          <S.StatusMessage>일간 리포트를 불러오는 중입니다...</S.StatusMessage>
        </S.Container>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Container $center>
          <S.ErrorMessage>{error}</S.ErrorMessage>
        </S.Container>
      </S.Wrapper>
    );
  }

  const isCollecting =
    reportData?.status === 'collecting' || !reportData?.healthSummary;
  const health = reportData?.healthSummary || {};
  const sleep = formatSleepTime(health?.sleepMinutes);
  const exercise = formatExerciseTime(health?.exerciseDuration);

  const isFemale = userProfile?.gender === 'female';
  const nickname = userProfile?.nickname || '회원';

  const tempStatusInfo = getTempStatus(health?.skinTemperature);
  const cycleDay = health?.menstrualCycle?.menstrualCycleDay || 1;
  const cycleInfo = getCyclePhaseInfo(cycleDay);
  const oxygenStatusInfo = getOxygenStatus(health?.avgSpo2);

  const isSavingDisabled =
    isSavingNote || !noteText?.trim() || noteText === savedNoteText;

  return (
    <S.Wrapper>
      <Header title={'일간 리포트'} variant="back" />
      <S.Container $blur={isCollecting}>
        <S.DateSection>
          <S.DateText>
            {formatDateTitle(reportData?.date || targetDate)}
          </S.DateText>
          <S.SubLink onClick={() => navigate(`/record/${targetDate}`)}>
            내 기록 확인하기 <span>&gt;</span>
          </S.SubLink>
        </S.DateSection>

        <S.GridContainer>
          <S.Column>
            <S.SleepCard>
              <S.CardTitle>
                <SleepIcon />
                <span>수면</span>
              </S.CardTitle>
              <S.GaugeWrapper>
                {(() => {
                  const strokeWidth = 7;
                  const size = 110;
                  const center = size / 2;
                  const radius = center - strokeWidth / 2;
                  const circumference = 2 * Math.PI * radius;

                  const totalMinutes = health.sleepMinutes || 0;
                  const targetMinutes = 480;

                  const baseProgress = Math.min(
                    totalMinutes / targetMinutes,
                    1,
                  );
                  const baseOffset = circumference * (1 - baseProgress);

                  const isOver = totalMinutes > targetMinutes;
                  const overProgress = isOver
                    ? Math.min(
                      (totalMinutes - targetMinutes) / targetMinutes,
                      1,
                    )
                    : 0;
                  const overOffset = circumference * (1 - overProgress);

                  return (
                    <svg viewBox={`0 0 ${size} ${size}`}>
                      <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#fff7f7"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                      />
                      <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#8d61ff"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={baseOffset}
                        strokeLinecap="round"
                        fill="transparent"
                        transform={`rotate(-90 ${center} ${center})`}
                      />
                      {isOver && (
                        <circle
                          cx={center}
                          cy={center}
                          r={radius}
                          stroke="#5e2dff"
                          strokeWidth={strokeWidth}
                          strokeDasharray={circumference}
                          strokeDashoffset={overOffset}
                          strokeLinecap="round"
                          fill="transparent"
                          transform={`rotate(-90 ${center} ${center})`}
                        />
                      )}
                    </svg>
                  );
                })()}

                <S.GaugeCenterText>
                  <div className="time">
                    <span className="bold">{sleep.h}</span>
                    <span className="unit">H</span>
                    <span className="bold">{sleep.m}</span>
                    <span className="unit">m</span>
                  </div>
                  <span className="target">/ 8h</span>
                </S.GaugeCenterText>
              </S.GaugeWrapper>
            </S.SleepCard>

            <S.ExerciseCard>
              <S.CardTitle>
                <ExerciseIcon />
                <span>운동 시간</span>
              </S.CardTitle>
              <S.ValueWrapper>
                {exercise.h > 0 && (
                  <>
                    <span className="bold">{exercise.h}</span>
                    <span className="unit">H</span>
                  </>
                )}
                <span className="bold">
                  {exercise.h === 0 && exercise.m === 0
                    ? '-'
                    : (exercise.m ?? '-')}
                </span>
                <span className="unit">m</span>
              </S.ValueWrapper>
            </S.ExerciseCard>

            <S.CalorieCard>
              <S.CardTitle>
                <CalorieIcon />
                <span>운동 소모 칼로리</span>
              </S.CardTitle>
              <S.ValueWrapper>
                <span className="bold">{health.totalCaloriesBurned ?? 0}</span>
                <span className="unit">kcal</span>
              </S.ValueWrapper>
            </S.CalorieCard>
          </S.Column>

          <S.Column>
            <S.TempCard>
              <S.CardTitle>
                <TempIcon />
                <span>평균 피부온도</span>
              </S.CardTitle>
              <S.TempBar />
              <S.ValueWrapper $direction="column">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '2px',
                  }}
                >
                  <span className="bold">{health.skinTemperature ?? '-'}</span>
                  <span className="unit">°C</span>
                </div>
                <S.StatusBadge $status={tempStatusInfo.status}>
                  {tempStatusInfo.text}
                </S.StatusBadge>
              </S.ValueWrapper>
            </S.TempCard>

            {isFemale ? (
              <S.CycleCard>
                <S.CardTitle $center>
                  <CycleIcon />
                  <span>생리주기</span>
                </S.CardTitle>

                <S.CycleChartWrapper>
                  <S.CycleChartImage src={menstrualImg} alt="생리주기 차트" />
                  <S.NeedlePivot $deg={cycleInfo.deg}>
                    <S.NeedleArrow />
                  </S.NeedlePivot>
                </S.CycleChartWrapper>

                <S.CycleDescription>
                  <p className="bold">{cycleInfo.title}</p>
                  <p>{cycleInfo.desc}</p>
                </S.CycleDescription>
              </S.CycleCard>
            ) : (
              <S.OxygenCard>
                <S.CardTitle>
                  <OxygenIcon />
                  <span>평균 산소포화도</span>
                </S.CardTitle>
                <S.OxygenBar />
                <S.ValueWrapper $direction="column" $top>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '2px',
                    }}
                  >
                    <span className="bold">{health.avgSpo2 ?? '-'}</span>
                    <span className="unit">%</span>
                  </div>
                  <S.StatusBadge $status={oxygenStatusInfo.status}>
                    {oxygenStatusInfo.text}
                  </S.StatusBadge>
                </S.ValueWrapper>
                <S.OxygenDescription>
                  <p className="bold">* 산소포화도(SpO₂)란?</p>
                  <p>
                    혈액 속 헤모글로빈이 산소를 얼마나 가지고 있는지를 나타내는
                    수치
                  </p>
                </S.OxygenDescription>
              </S.OxygenCard>
            )}
          </S.Column>
        </S.GridContainer>

        {reportData.aiAnalysis && (
          <S.SectionBlock>
            <S.SectionHeading>AI 피부 분석</S.SectionHeading>
            <S.InfoBox>{reportData.aiAnalysis}</S.InfoBox>
          </S.SectionBlock>
        )}

        {reportData.personalizedSolution && (
          <S.SectionBlock>
            <S.SectionHeading>{nickname}님 맞춤 솔루션</S.SectionHeading>
            <S.InfoBox>{reportData.personalizedSolution}</S.InfoBox>
          </S.SectionBlock>
        )}

        <S.SectionBlock>
          <S.SectionHeading>Note</S.SectionHeading>
          <S.NoteInputBox>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="✏️ 오늘 피부에 대해 남기고 싶은 이야기를 자유롭게 적어보세요!"
              maxLength={300}
            />
            <S.NoteActionRow>
              <S.CharCount>{noteText.length} / 300자</S.CharCount>
              <S.SaveButton
                onClick={handleSaveNote}
                disabled={isSavingDisabled}
              >
                {isSavingNote ? '저장 중...' : '저장'}
              </S.SaveButton>
            </S.NoteActionRow>
          </S.NoteInputBox>
        </S.SectionBlock>

        <S.BottomBanner>
          <S.AvatarPlaceholder src={surprisedDr} />
          <S.SpeechBubble>
            <div className="title">자극적인 과자 대신 이런 건 어때요?</div>
            <div className="link">/basak.com</div>
          </S.SpeechBubble>
        </S.BottomBanner>
      </S.Container>

      {isCollecting && (
        <Portal>
          <S.CollectingOverlay>
            <S.CollectingModal>
              <S.ModalTitle>
                (서비스명)이 오늘의 데이터를
                <br />
                모으는 중이에요
              </S.ModalTitle>
              <S.ModalDescription>
                오늘을 기록하면 리포트를 일찍 만나볼 수 있어요.
              </S.ModalDescription>
              <S.ModalButton onClick={() => navigate('/todaynote')}>
                오늘 기록하기
              </S.ModalButton>
            </S.CollectingModal>
          </S.CollectingOverlay>
        </Portal>
      )}
    </S.Wrapper>
  );
}
