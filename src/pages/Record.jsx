import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import CosmeticCard from '../components/CosmeticCard';
import SetDetailModal from '../components/modal/SetDetailModal';
import SunIcon from '../assets/images/record/sun.svg';
import MoonIcon from '../assets/images/record/Moon.svg';
import AfterIcon from '../assets/images/after.png';
import { getDailyRecord } from '../api/records';
import { getCosmeticSetDetail } from '../api/cosmetics';
import drVeryBad from '../assets/images/dr-acne/dr.verybad.svg';
import drBad from '../assets/images/dr-acne/dr.bad.svg';
import drNormal from '../assets/images/dr-acne/dr.normal.svg';
import drGood from '../assets/images/dr-acne/dr.good.svg';
import drVeryGood from '../assets/images/dr-acne/dr.verygood.svg';

const SKIN_STATUS_IMAGES = {
  very_bad: drVeryBad,
  bad: drBad,
  normal: drNormal,
  good: drGood,
  very_good: drVeryGood,
};

export default function Record() {
  const { date: paramDate } = useParams();
  const navigate = useNavigate();

  // 기준 날짜 (URL 파라미터가 없을 경우 기본값 세팅)
  const targetDate = paramDate || '2026-08-12';

  // 날짜 문자열 변환 함수 (예: '2026-08-12' -> '8월 12일 수요일')
  const formatDateText = (dateStr) => {
    if (!dateStr) return '오늘의 기록';
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const days = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
      ];
      return `${month}월 ${day}일 ${days[dateObj.getDay()]}`;
    }
    return dateStr;
  };

  // 피부 상태 텍스트 매핑
  const mapSkinStatus = (status) => {
    const statusMap = {
      very_bad: '매우 나쁨',
      bad: '나쁨',
      normal: '보통',
      good: '좋음',
      very_good: '매우 좋음',
    };
    return statusMap[status] || status || '보통';
  };

  const [activeTab, setActiveTab] = useState('morning');
  const [selectedSetDetail, setSelectedSetDetail] = useState(null);

  // 일일 기록 상태
  const [recordData, setRecordData] = useState({
    dateText: '',
    skinStatus: '',
    food: '',
    skinPhotos: [],
    morningSelections: [],
    nightSelections: [],
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await getDailyRecord(targetDate);
        if (response.data && response.data.isSuccess) {
          const result = response.data.result;
          setRecordData({
            dateText: formatDateText(result.date || targetDate),
            skinStatus: result.skinStatus || '',
            food: result.foodMemo || '',
            skinPhotos: (result.images || []).map((img) => img.imageUrl),
            morningSelections: result.morningSelections || [],
            nightSelections: result.nightSelections || [],
          });
        }
      } catch (error) {
        console.error('일일 기록 조회 중 오류 발생:', error);
        setRecordData((prev) => ({
          ...prev,
          dateText: formatDateText(targetDate),
        }));
      }
    };

    fetchRecord();
  }, [targetDate]);

  const currentSelections =
    activeTab === 'morning'
      ? recordData.morningSelections
      : recordData.nightSelections;

  // 세트 클릭 시 상세 조회 API(/api/cosmetic-sets/{setId}) 호출 후 모달 오픈
  // 세트 클릭 시 상세 조회 API 호출 후 모달 오픈
  const handleOpenSetDetail = async (setItem) => {
    try {
      const response = await getCosmeticSetDetail(setItem.cosmeticSetId);
      if (response.data && response.data.isSuccess) {
        const result = response.data.result;
        const formattedModalData = {
          name: setItem.name || result.name, // 일일 기록에 명시된 세트 이름을 최우선으로 사용
          items: (result.cosmetics || []).map((item) => ({
            id: item.userCosmeticId,
            name: item.productName || item.customName,
            tags: (item.mainIngredients || []).map((tag) =>
              tag.startsWith('#') ? tag : `#${tag}`,
            ),
          })),
        };
        setSelectedSetDetail(formattedModalData);
      }
    } catch (error) {
      console.error('화장품 세트 상세 조회 중 오류 발생:', error);
    }
  };

  // 수정하기 클릭 시 기록 작성/수정 페이지(/todaynote/{date})로 이동
  const handleNavigateToEdit = () => {
    navigate(`/todaynote/${targetDate}`);
  };

  const hasFood = !!(recordData.food && recordData.food.trim());
  const hasPhotos = !!(recordData.skinPhotos && recordData.skinPhotos.length > 0);

  return (
    <Container>
      <Header title={'기록'} variant="back" />
      <ContentWrapper>
        <HeaderRow>
          <DateTitle>{recordData.dateText}</DateTitle>
        </HeaderRow>

        <StatusSection>
          <ProfileCircle
            src={SKIN_STATUS_IMAGES[recordData.skinStatus] || drNormal}
            alt={mapSkinStatus(recordData.skinStatus)}
          />
          <StatusTextWrapper>
            <StatusLabel>오늘 내 피부 상태는...</StatusLabel>
            <StatusValue>{mapSkinStatus(recordData.skinStatus)}</StatusValue>
          </StatusTextWrapper>
        </StatusSection>

        <TabGroup>
          <TabButton
            $active={activeTab === 'morning'}
            onClick={() => setActiveTab('morning')}
          >
            <img src={SunIcon} alt="morning" /> 모닝 스킨케어
          </TabButton>
          <TabButton
            $active={activeTab === 'night'}
            onClick={() => setActiveTab('night')}
          >
            <img src={MoonIcon} alt="night" /> 나이트 스킨케어
          </TabButton>
        </TabGroup>

        <CardListSection>
          <CardList>
            {currentSelections.map((item, idx) => {
              if (item.selectionType === 'SET') {
                return (
                  <SetCard
                    key={`set-${item.cosmeticSetId || idx}`}
                    onClick={() => handleOpenSetDetail(item)}
                  >
                    <SetLeftContent>
                      <SetTitle>{item.name}</SetTitle>
                      <SetTagGroup>
                        {(item.ingredientTags || []).map((tag, tagIdx) => (
                          <SetTag key={tagIdx}>
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </SetTag>
                        ))}
                      </SetTagGroup>
                    </SetLeftContent>
                    <ArrowIcon src={AfterIcon} alt="상세보기" />
                  </SetCard>
                );
              }

              return (
                <CosmeticCard
                  key={`cosmetic-${item.userCosmeticId || idx}`}
                  name={item.name}
                  tags={(item.ingredientTags || []).map((tag) =>
                    tag.startsWith('#') ? tag : `#${tag}`,
                  )}
                />
              );
            })}
          </CardList>
        </CardListSection>

        {(hasFood || hasPhotos) && (
          <OptionalSection>
            {hasFood && (
              <OptionalGroup>
                <SectionTitle>오늘 먹은 음식</SectionTitle>
                <FoodCard>{recordData.food}</FoodCard>
              </OptionalGroup>
            )}

            {hasPhotos && (
              <OptionalGroup>
                <SectionTitle>오늘 나의 피부 사진</SectionTitle>
                <SubDescription>
                  사진을 남겨두면 주간 리포트에서 한 주간의 변화 추이를 볼 수
                  있어요!
                </SubDescription>

                <PhotoGrid>
                  {recordData.skinPhotos.map((photo, index) => (
                    <PhotoItem key={index}>
                      <PhotoBox src={photo} alt={`skin-${index}`} />
                    </PhotoItem>
                  ))}
                </PhotoGrid>
              </OptionalGroup>
            )}
          </OptionalSection>
        )}
      </ContentWrapper>

      <ButtonWrapper>
        <Button onClick={handleNavigateToEdit}>수정하기</Button>
      </ButtonWrapper>

      {selectedSetDetail && (
        <SetDetailModal
          setItem={selectedSetDetail}
          onClose={() => setSelectedSetDetail(null)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 20px 0 20px;
`;

const DateTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: #000000;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px;
`;

const ProfileCircle = styled.img`
  width: 80px;
  height: auto;
  flex-shrink: 0;
`;

const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #141212;
  margin-left: 10px;
`;

const StatusValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #141212;
  margin-left: 10px;
  margin-top: 6px;
`;

const TabGroup = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-top: 8px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.$active ? '#266210' : 'gray')};
  border-bottom: ${(props) => (props.$active ? '2px solid #266210' : 'none')};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  margin-bottom: -2px;

  img {
    width: 18px;
    height: 18px;
    transition: filter 0.2s ease;

    filter: ${(props) =>
    props.$active
      ? 'brightness(0) saturate(100%) invert(29%) sepia(85%) saturate(750%) hue-rotate(72deg) brightness(88%) contrast(96%)'
      : 'brightness(0) saturate(100%) invert(50%) opacity(0.7)'};
  }
`;

const CardListSection = styled.div`
  margin: 16px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

const SetCard = styled.div`
  background-color: #fff8f2;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #96be9c;
  cursor: pointer;
`;

const SetLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SetTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #141212;
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
  margin-right: 4px;
`;

const SetTagGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  background-color: #96be9c;
  color: #ffffff;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const OptionalSection = styled.div`
  margin: 24px 20px 0 20px;
  padding-top: 16px;
  border-top: 8px solid #f7f9fa;
`;

const OptionalGroup = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;
`;

const SubDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #b4b4b4;
  margin: 0 0 10px 0;
`;

const FoodCard = styled.div`
  padding: 12px;
  border: 1px solid #89d7bc;
  background-color: #f3fffb;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  color: #141212;
`;

const PhotoGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-top: 6px;
`;

const PhotoItem = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const PhotoBox = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eee;
  display: block;
`;

const ButtonWrapper = styled.div`
  margin: 0 20px 30px 20px;
`;