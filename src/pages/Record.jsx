import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import CosmeticCard from '../components/CosmeticCard';
import SetDetailModal from '../components/modal/SetDetailModal';
import SunIcon from '../assets/images/record/sun.svg';
import MoonIcon from '../assets/images/record/moon.svg';
import AfterIcon from '../assets/images/after.png';
import { getDailyRecord } from '../api/records';
import { getCosmeticSetDetail } from '../api/cosmetics';
import { media } from '../styles/GlobalStyle';
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

  const targetDate = paramDate || '2026-08-12';

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

  const handleOpenSetDetail = async (setItem) => {
    try {
      const response = await getCosmeticSetDetail(setItem.cosmeticSetId);
      if (response.data && response.data.isSuccess) {
        const result = response.data.result;
        const formattedModalData = {
          name: setItem.name || result.name,
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

  const handleNavigateToEdit = () => {
    navigate(`/todaynote/${targetDate}`);
  };

  const hasFood = !!(recordData.food && recordData.food.trim());
  const hasPhotos = !!(
    recordData.skinPhotos && recordData.skinPhotos.length > 0
  );

  return (
    <Container>
      <Header
        title={'기록'}
        variant="back"
        onBack={() => navigate('/home')}
      />
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
  margin: 10px 17px 0 17px;

  @media ${media.mobileM} {
    margin: 12px 20px 0 20px;
  }
`;

const DateTitle = styled.h1`
  font-family: 'Eommakkaturi', sans-serif;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: #000000;

  @media ${media.mobileM} {
    font-size: 24px;
  }
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 17px;

  @media ${media.mobileM} {
    gap: 16px;
    margin: 20px;
  }
`;

const ProfileCircle = styled.img`
  width: 68px;
  height: auto;
  flex-shrink: 0;

  @media ${media.mobileM} {
    width: 80px;
  }
`;

const StatusTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #141212;
  margin-left: 9px;

  @media ${media.mobileM} {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const StatusValue = styled.span`
  font-size: 19px;
  font-weight: 700;
  color: #141212;
  margin-left: 9px;
  margin-top: 5px;

  @media ${media.mobileM} {
    font-size: 22px;
    margin-left: 10px;
    margin-top: 6px;
  }
`;

const TabGroup = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-top: 7px;

  @media ${media.mobileM} {
    margin-top: 8px;
  }
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  font-size: 12px;
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
    width: 15px;
    height: 15px;
    transition: filter 0.2s ease;

    filter: ${(props) =>
    props.$active
      ? 'brightness(0) saturate(100%) invert(29%) sepia(85%) saturate(750%) hue-rotate(72deg) brightness(88%) contrast(96%)'
      : 'brightness(0) saturate(100%) invert(50%) opacity(0.7)'};
  }

  @media ${media.mobileM} {
    padding: 12px 0;
    gap: 6px;
    font-size: 14px;

    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const CardListSection = styled.div`
  margin: 14px 17px 0 17px;
  display: flex;
  flex-direction: column;

  @media ${media.mobileM} {
    margin: 16px 20px 0 20px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 212px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }

  @media ${media.mobileM} {
    gap: 10px;
    max-height: 250px;
  }
`;

const SetCard = styled.div`
  background-color: #fff8f2;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #96be9c;
  cursor: pointer;

  @media ${media.mobileM} {
    padding: 14px 16px;
  }
`;

const SetLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  @media ${media.mobileM} {
    gap: 8px;
  }
`;

const SetTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #141212;

  @media ${media.mobileM} {
    font-size: 14px;
  }
`;

const ArrowIcon = styled.img`
  width: 10px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
  margin-right: 3px;

  @media ${media.mobileM} {
    width: 12px;
    margin-right: 4px;
  }
`;

const SetTagGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  @media ${media.mobileM} {
    gap: 6px;
  }
`;

const SetTag = styled.span`
  background-color: #96be9c;
  color: #ffffff;
  font-size: 9px;
  padding: 3px 7px;
  border-radius: 12px;
  font-weight: 500;

  @media ${media.mobileM} {
    font-size: 11px;
    padding: 3px 8px;
  }
`;

const OptionalSection = styled.div`
  margin: 20px 17px 0 17px;
  padding-top: 14px;
  border-top: 7px solid #f7f9fa;

  @media ${media.mobileM} {
    margin: 24px 20px 0 20px;
    padding-top: 16px;
    border-top: 8px solid #f7f9fa;
  }
`;

const OptionalGroup = styled.div`
  margin-bottom: 17px;

  @media ${media.mobileM} {
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 7px 0;

  @media ${media.mobileM} {
    font-size: 20px;
    margin: 0 0 8px 0;
  }
`;

const SubDescription = styled.p`
  font-size: 10px;
  font-weight: 500;
  color: #b4b4b4;
  margin: 0 0 8px 0;

  @media ${media.mobileM} {
    font-size: 12px;
    margin: 0 0 10px 0;
  }
`;

const FoodCard = styled.div`
  padding: 10px;
  border: 1px solid #89d7bc;
  background-color: #f3fffb;
  border-radius: 20px;
  font-size: 9px;
  font-weight: 500;
  color: #141212;

  @media ${media.mobileM} {
    padding: 12px;
    font-size: 11px;
  }
`;

const PhotoGrid = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-top: 5px;

  @media ${media.mobileM} {
    gap: 12px;
    padding-top: 6px;
  }
`;

const PhotoItem = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const PhotoBox = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #eee;
  display: block;

  @media ${media.mobileM} {
    width: 120px;
    height: 120px;
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 20px 30px 20px;
`;
