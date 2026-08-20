import { useState, useRef, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Button from '../components/Button';
import Header from '../components/Header';
import CosmeticSelectModal from '../components/modal/CosmeticSelectModal';
import SetDetailModal from '../components/modal/SetDetailModal';
import AlreadyRecordedModal from '../components/modal/AlreadyRecordedModal';
import CameraImg from '../assets/images/camera.png';
import DrImg from '../assets/images/dr-acne/dr.normal.svg';
import * as S from './TodayNote.styles';
import { media } from '../styles/GlobalStyle';
import { getCosmeticOptions, getCosmeticSetDetail } from '../api/cosmetics';
import {
  getDailyRecord,
  createDailyRecord,
  updateDailyRecord,
} from '../api/records';
import useModalBackClose from '../hooks/useModalBackClose';

const TodayNote = () => {
  const navigate = useNavigate();
  const { date: paramDate } = useParams();

  const [selectedDate, setSelectedDate] = useState(
    paramDate ? new Date(paramDate) : new Date(),
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [skinCondition, setSkinCondition] = useState(3);
  const [morningProducts, setMorningProducts] = useState([]);
  const [nightProducts, setNightProducts] = useState([]);
  const [foodInput, setFoodInput] = useState('');
  const [images, setImages] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const [setProducts, setSetProducts] = useState([]);
  const [individualProducts, setIndividualProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeCosmeticModal = useModalBackClose(isModalOpen, () => setIsModalOpen(false));
  const [activeType, setActiveType] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [setComponentCache, setSetComponentCache] = useState({});

  const [detailModalSet, setDetailModalSet] = useState(null);
  const closeDetailModal = useModalBackClose(Boolean(detailModalSet), () => setDetailModalSet(null));

  const [isAlreadyRecordedModalOpen, setIsAlreadyRecordedModalOpen] =
    useState(false);
  const closeAlreadyRecordedModal = useModalBackClose(
    isAlreadyRecordedModalOpen,
    () => setIsAlreadyRecordedModalOpen(false),
  );

  const fileInputRef = useRef(null);

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const mapStatusToSkinCondition = (status) => {
    switch (status?.toLowerCase()) {
      case 'very_bad':
        return 1;
      case 'bad':
        return 2;
      case 'normal':
        return 3;
      case 'good':
        return 4;
      case 'very_good':
        return 5;
      default:
        return 3;
    }
  };

  const mapSkinConditionToStatus = (condition) => {
    switch (Number(condition)) {
      case 1:
        return 'very_bad';
      case 2:
        return 'bad';
      case 3:
        return 'normal';
      case 4:
        return 'good';
      case 5:
        return 'very_good';
      default:
        return 'normal';
    }
  };

  useEffect(() => {
    const fetchCosmetics = async () => {
      try {
        const response = await getCosmeticOptions();
        if (response.data && response.data.isSuccess) {
          const { sets = [], cosmetics = [] } = response.data.result || {};

          const formattedSets = sets.map((item) => ({
            id: item.setId,
            name: item.name,
            tags:
              item.mainIngredients?.map((tag) =>
                tag.startsWith('#') ? tag : `#${tag}`,
              ) || [],
            ...item,
          }));

          const formattedCosmetics = cosmetics.map((item) => ({
            id: item.userCosmeticId,
            name: item.productName,
            tags:
              item.mainIngredients?.map((tag) =>
                tag.startsWith('#') ? tag : `#${tag}`,
              ) || [],
            ...item,
          }));

          setSetProducts(formattedSets);
          setIndividualProducts(formattedCosmetics);
        }
      } catch (error) {
        console.error('화장품 목록 조회 실패:', error.message);
      }
    };

    fetchCosmetics();
  }, []);

  const fetchDailyRecord = async (date, isFromUrl = false) => {
    const dateStr = formatDateToYYYYMMDD(date);
    try {
      const response = await getDailyRecord(dateStr);
      if (response.data && response.data.isSuccess) {
        const data = response.data.result;

        setIsEditMode(true);
        if (!isFromUrl) {
          setIsAlreadyRecordedModalOpen(true);
        }

        setSkinCondition(mapStatusToSkinCondition(data.skinStatus));
        setMorningProducts(
          data.morningSelections?.map((item) => item.name) || [],
        );
        setNightProducts(data.nightSelections?.map((item) => item.name) || []);
        setFoodInput(data.foodMemo || '');
        setNoteInput(data.memo || '');
        setImages(
          data.images?.map((img) => img.imageUrl || img.imageKey) || [],
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsEditMode(false);
        setSkinCondition(3);
        setMorningProducts([]);
        setNightProducts([]);
        setFoodInput('');
        setNoteInput('');
        setImages([]);
      } else {
        console.error('일일 기록 조회 실패:', error.message);
      }
    }
  };

  useEffect(() => {
    if (paramDate) {
      const targetDate = new Date(paramDate);
      setSelectedDate(targetDate);
      fetchDailyRecord(targetDate, true);
    }
  }, [paramDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateStr = formatDateToYYYYMMDD(date);
    navigate(`/todaynote/${dateStr}`);
  };

  const handleOpenDetail = async (setItem) => {
    const targetSetId = setItem?.setId || setItem?.id;
    if (!targetSetId) return;

    try {
      const response = await getCosmeticSetDetail(targetSetId);
      if (response.data && response.data.isSuccess) {
        const detailData = response.data.result;

        const formattedDetail = {
          id: detailData.setId,
          name: detailData.name,
          usageTime: detailData.usageTime,
          items:
            detailData.cosmetics?.map((c) => ({
              id: c.userCosmeticId,
              name: c.customName || c.productName,
              tags:
                c.mainIngredients?.map((tag) =>
                  tag.startsWith('#') ? tag : `#${tag}`,
                ) || [],
              ...c,
            })) || [],
        };

        setDetailModalSet(formattedDetail);
      }
    } catch (error) {
      console.error('세트 상세 조회 실패:', error.message);
    }
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const dayOfWeek = days[date.getDay()];
    return `${month}월 ${day}일 ${dayOfWeek}`;
  };

  const getProductIds = (productNames) => {
    return productNames.reduce(
      (result, name) => {
        const matchedSet = setProducts.find((set) => set.name === name);
        if (matchedSet) {
          result.setIds.push(matchedSet.setId || matchedSet.id);
          return result;
        }
        const matchedItem = individualProducts.find(
          (item) => (item.name || item.productName) === name,
        );
        if (matchedItem) {
          result.cosmeticIds.push(matchedItem.userCosmeticId || matchedItem.id);
        }
        return result;
      },
      { cosmeticIds: [], setIds: [] },
    );
  };

  const skinStatusOptions = [
    { id: 1, label: '매우 나쁨' },
    { id: 2, label: '나쁨' },
    { id: 3, label: '보통' },
    { id: 4, label: '좋음' },
    { id: 5, label: '매우 좋음' },
  ];

  const isBadSkin = Number(skinCondition) === 1 || Number(skinCondition) === 2;

  const isFormValid =
    skinCondition !== null &&
    morningProducts.length > 0 &&
    nightProducts.length > 0 &&
    (!isBadSkin || noteInput.trim().length > 0);

  const expandSetsToComponents = (names) => {
    return names.reduce((result, name) => {
      result.push(name);
      const matchedSet = setProducts.find((set) => set.name === name);
      if (matchedSet) {
        const componentNames =
          setComponentCache[matchedSet.setId || matchedSet.id] || [];
        componentNames.forEach((componentName) => {
          if (!result.includes(componentName)) result.push(componentName);
        });
      }
      return result;
    }, []);
  };

  const collapseComponentsIntoSets = (names) => {
    return names.filter((name) => {
      const isComponentOfSelectedSet = names.some((otherName) => {
        if (otherName === name) return false;
        const matchedSet = setProducts.find((set) => set.name === otherName);
        if (!matchedSet) return false;
        const componentNames =
          setComponentCache[matchedSet.setId || matchedSet.id] || [];
        return componentNames.includes(name);
      });
      return !isComponentOfSelectedSet;
    });
  };

  const handleOpenModal = (type) => {
    setActiveType(type);
    const baseProducts = type === 'morning' ? morningProducts : nightProducts;
    setSelectedProducts(expandSetsToComponents(baseProducts));
    setIsModalOpen(true);
  };

  const handleToggleProduct = async (productName) => {
    if (selectedProducts.includes(productName)) {
      const matchedSet = setProducts.find((set) => set.name === productName);

      if (matchedSet) {
        const componentNames =
          setComponentCache[matchedSet.setId || matchedSet.id] || [];
        setSelectedProducts((prev) =>
          prev.filter(
            (item) => item !== productName && !componentNames.includes(item),
          ),
        );
        return;
      }

      const parentSetName = selectedProducts.find((name) => {
        const set = setProducts.find((s) => s.name === name);
        if (!set) return false;
        const componentNames = setComponentCache[set.setId || set.id] || [];
        return componentNames.includes(productName);
      });

      if (parentSetName) {
        setSelectedProducts((prev) =>
          prev.filter(
            (item) => item !== productName && item !== parentSetName,
          ),
        );
        return;
      }

      setSelectedProducts((prev) =>
        prev.filter((item) => item !== productName),
      );
      return;
    }

    setSelectedProducts((prev) => [...prev, productName]);

    const matchedSet = setProducts.find((set) => set.name === productName);
    if (matchedSet) {
      const setId = matchedSet.setId || matchedSet.id;
      let componentNames = setComponentCache[setId];

      if (!componentNames) {
        try {
          const response = await getCosmeticSetDetail(setId);
          if (response.data && response.data.isSuccess) {
            componentNames = (response.data.result.cosmetics || []).map(
              (c) => c.customName || c.productName,
            );
            setSetComponentCache((prev) => ({ ...prev, [setId]: componentNames }));
          }
        } catch (error) {
          console.error('세트 구성품 조회 실패:', error.message);
        }
      }

      if (componentNames) {
        setSelectedProducts((prev) => {
          const next = [...prev];
          componentNames.forEach((name) => {
            if (!next.includes(name)) next.push(name);
          });
          return next;
        });
      }
    }
  };

  const handleModalSubmit = () => {
    const finalProducts = collapseComponentsIntoSets(selectedProducts);
    if (activeType === 'morning') {
      setMorningProducts(finalProducts);
    } else if (activeType === 'night') {
      setNightProducts(finalProducts);
    }
    closeCosmeticModal();
  };

  const handleRemoveProduct = (type, productName) => {
    if (type === 'morning') {
      setMorningProducts((prev) => prev.filter((item) => item !== productName));
    } else {
      setNightProducts((prev) => prev.filter((item) => item !== productName));
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const formattedDate = formatDateToYYYYMMDD(selectedDate);
    const morningIds = getProductIds(morningProducts);
    const nightIds = getProductIds(nightProducts);
    const requestBody = {
      skinStatus: mapSkinConditionToStatus(skinCondition),
      morningCosmeticIds: morningIds.cosmeticIds,
      morningCosmeticSetIds: morningIds.setIds,
      nightCosmeticIds: nightIds.cosmeticIds,
      nightCosmeticSetIds: nightIds.setIds,
      foodMemo: foodInput,
      imageKeys: images,
      memo: noteInput,
    };

    try {
      if (isEditMode) {
        const response = await updateDailyRecord(formattedDate, requestBody);
        if (response.data && response.data.isSuccess) {
          alert('기록이 수정되었습니다.');
          navigate(`/record/${formattedDate}`);
        }
      } else {
        const createBody = {
          date: formattedDate,
          ...requestBody,
        };
        const response = await createDailyRecord(createBody);
        if (response.data && response.data.isSuccess) {
          alert('기록이 등록되었습니다.');
          navigate(`/record/${formattedDate}`);
        }
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 409 ||
          error.response.data?.code === 'RECORD_4091')
      ) {
        setIsAlreadyRecordedModalOpen(true);
      } else {
        alert(error.message || '기록 처리에 실패했습니다.');
      }
    }
  };

  const renderProductRows = (products, type) => {
    const allItems = [
      ...products.map((name) => ({
        type: 'product',
        name,
        isSet: setProducts.some((set) => set.name === name),
      })),
      { type: 'add-button' },
    ];

    const rows = [[], [], []];
    allItems.forEach((item, index) => {
      rows[index % 3].push(item);
    });

    return (
      <SelectedTagScrollContainer>
        {rows.map((rowItems, rowIndex) => (
          <TagRow key={rowIndex}>
            {rowItems.map((item, itemIndex) =>
              item.type === 'product' ? (
                <SelectedTagChip key={itemIndex} $isSet={item.isSet}>
                  <span>{item.isSet ? `SET | ${item.name}` : item.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(type, item.name)}
                  >
                    ✕
                  </button>
                </SelectedTagChip>
              ) : (
                <AddMoreTagChip
                  key={itemIndex}
                  type="button"
                  onClick={() => handleOpenModal(type)}
                >
                  추가하기 <span>+</span>
                </AddMoreTagChip>
              ),
            )}
          </TagRow>
        ))}
      </SelectedTagScrollContainer>
    );
  };

  return (
    <S.Container>
      <Header title={'기록'} variant="back" />

      <S.Content>
        <S.DateSection>
          <h2>{formatDate(selectedDate)}</h2>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={ko}
              dateFormat="yyyy.MM.dd"
              customInput={<CustomCalendarButton />}
              maxDate={new Date()}
            />
          </DatePickerWrapper>
        </S.DateSection>

        <S.Divider />

        <S.Section>
          <S.TodayLabel>
            오늘 내 피부 상태는?<span className="required">*</span>
          </S.TodayLabel>
          <SkinSliderContainer>
            <SliderTrackWrapper>
              <SliderTrackBase />
              <SliderTrackFill $condition={skinCondition ?? 3} />

              {[1, 2, 3, 4, 5].map((level) => (
                <SliderDot
                  key={level}
                  $left={`${(level - 1) * 25}%`}
                  $isActive={(skinCondition ?? 3) >= level}
                  $condition={skinCondition ?? 3}
                />
              ))}

              <HiddenSliderInput
                type="range"
                min="1"
                max="5"
                step="1"
                value={skinCondition ?? 3}
                onChange={(e) => setSkinCondition(Number(e.target.value))}
              />

              <SliderThumbHandle $left={`${((skinCondition ?? 3) - 1) * 25}%`}>
                <DrAcneImage src={DrImg} alt="피부 상태 조절 핸들" />
              </SliderThumbHandle>
            </SliderTrackWrapper>

            <SliderLabelWrapper>
              {skinStatusOptions.map((opt) => {
                const isSelected = (skinCondition ?? 3) === opt.id;
                const isEdge = opt.id === 1 || opt.id === 5;

                return (
                  <SliderPointLabel
                    key={opt.id}
                    $left={`${(opt.id - 1) * 25}%`}
                    $isSelected={isSelected}
                    $isEdge={isEdge}
                  >
                    {isSelected ? opt.label : isEdge ? opt.label : ''}
                  </SliderPointLabel>
                );
              })}
            </SliderLabelWrapper>
          </SkinSliderContainer>
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.Label>
            오늘 아침에 무슨 화장품을 사용했나요?
            <span className="required">*</span>
          </S.Label>
          {morningProducts.length === 0 ? (
            <S.AddButton
              type="button"
              onClick={() => handleOpenModal('morning')}
            >
              추가
            </S.AddButton>
          ) : (
            renderProductRows(morningProducts, 'morning')
          )}
        </S.Section>

        <S.Section>
          <S.Label>
            오늘 밤에 무슨 화장품을 사용했나요?
            <span className="required">*</span>
          </S.Label>
          {nightProducts.length === 0 ? (
            <S.AddButton type="button" onClick={() => handleOpenModal('night')}>
              추가
            </S.AddButton>
          ) : (
            renderProductRows(nightProducts, 'night')
          )}
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.Label>
            오늘 어떤 음식을 드셨나요?<span className="optional">(선택)</span>
          </S.Label>
          <S.TextareaWrapper>
            <textarea
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value.slice(0, 300))}
              placeholder="ex. 아침 베이글 샌드위치, 저녁 마라탕 등.."
            />
            <span className="char-count">{foodInput.length}/300</span>
          </S.TextareaWrapper>
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.Label>
            오늘 피부 상태 사진 남기기<span className="optional">(선택)</span>
          </S.Label>
          <S.SubDescription>
            사진을 남겨두면 주간 리포트에서 한 주간의 변화 추이를 볼 수 있어요!
          </S.SubDescription>

          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <S.ImageListContainer>
            <S.CameraButton type="button" onClick={handleCameraClick}>
              <img src={CameraImg} className="camera-icon" alt="카메라" />
            </S.CameraButton>

            {images.map((imgUrl, index) => (
              <S.ImageItem key={index}>
                <img src={imgUrl} alt={`피부 사진 ${index + 1}`} />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </S.ImageItem>
            ))}
          </S.ImageListContainer>
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.Label>
            오늘 기억하고 싶은 특이사항이 있나요?
            {isBadSkin ? (
              <span className="required">*</span>
            ) : (
              <span className="optional">(선택)</span>
            )}
          </S.Label>
          <S.TextareaWrapper>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value.slice(0, 300))}
              placeholder={
                isBadSkin
                  ? 'ex. 갑자기 트러블이 올라왔거나, 피부가 자극받은 이유(늦은 야식, 붉은기 등)를\n자유롭게 적어주세요!'
                  : 'ex. 요즘 물 1.5L씩 마시는 중!'
              }
            />
            <span className="char-count">{noteInput.length}/300</span>
          </S.TextareaWrapper>
        </S.Section>

        <S.SubmitWrapper>
          <Button disabled={!isFormValid} onClick={handleSubmit}>
            완료
          </Button>
        </S.SubmitWrapper>
      </S.Content>

      <AlreadyRecordedModal
        isOpen={isAlreadyRecordedModalOpen}
        onClose={closeAlreadyRecordedModal}
      />

      <CosmeticSelectModal
        isOpen={isModalOpen}
        onClose={closeCosmeticModal}
        setProducts={setProducts}
        individualProducts={individualProducts}
        selectedProducts={selectedProducts}
        onToggleProduct={handleToggleProduct}
        onSubmit={handleModalSubmit}
        onOpenDetail={handleOpenDetail}
      />

      <SetDetailModal
        setItem={detailModalSet}
        onClose={closeDetailModal}
      />
    </S.Container>
  );
};

export default TodayNote;

const CustomCalendarButton = forwardRef(({ onClick }, ref) => (
  <CalendarBtn type="button" onClick={onClick} ref={ref}>
    📅
  </CalendarBtn>
));

const CalendarBtn = styled.button`
  background: none;
  border: none;
  font-size: 17px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 10;

  .react-datepicker-popper {
    z-index: 10;
  }

  .react-datepicker__current-month {
    font-family: 'Wanted Sans Variable', 'Wanted Sans', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', sans-serif;
    font-size: 16px;
  }
`;

const SelectedTagScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  overflow-x: auto;
  width: 100%;
  padding: 3px 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${media.mobileM} {
    gap: 8px;
    padding: 4px 0;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  width: max-content;

  @media ${media.mobileM} {
    gap: 8px;
  }
`;

const SelectedTagChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid ${(props) => (props.$isSet ? '#96BE9C' : '#89D7BC')};
  border-radius: 20px;
  padding: 5px 8px;
  background-color: ${(props) => (props.$isSet ? '#FFF1E5' : '#E7FDF7')};
  font-size: 10px;
  color: #363636;
  white-space: nowrap;
  flex-shrink: 0;

  button {
    background: none;
    border: none;
    font-size: 9px;
    color: #666666;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  @media ${media.mobileM} {
    gap: 6px;
    padding: 6px 10px;
    font-size: 12px;

    button {
      font-size: 11px;
    }
  }
`;

const AddMoreTagChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border: 1px solid #b3b3b3;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: #d9d9d9;
  font-size: 10px;
  font-weight: 600;
  color: #363636;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    font-size: 11px;
  }

  @media ${media.mobileM} {
    gap: 4px;
    padding: 6px 12px;
    font-size: 12px;

    span {
      font-size: 13px;
    }
  }
`;

const SkinSliderContainer = styled.div`
  width: 100%;
  padding: 20px 8px 0 8px;
  box-sizing: border-box;

  @media ${media.mobileM} {
    padding: 24px 10px 0 10px;
  }
`;

const SliderTrackWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
`;

const SliderTrackBase = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #d1d5db;
  border-radius: 2px;
`;

const getConditionColor = (condition) => {
  switch (Number(condition)) {
    case 2:
      return '#FF5900';
    case 3:
      return '#FF8237';
    case 4:
      return '#FFAA6E';
    case 5:
      return '#FFD6A5';
    case 1:
    default:
      return '#FF5757';
  }
};

const SliderTrackFill = styled.div`
  position: absolute;
  left: 0;
  width: ${(props) => `${(props.$condition - 1) * 25}%`};
  height: 3px;
  background-color: ${(props) => getConditionColor(props.$condition)};
  border-radius: 2px;
  transition:
    width 0.15s ease,
    background-color 0.15s ease;
`;

const SliderDot = styled.div`
  position: absolute;
  left: ${(props) => props.$left};
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.$isActive ? getConditionColor(props.$condition) : '#d1d5db'};
  z-index: 2;
  transition: background-color 0.15s ease;
`;

const HiddenSliderInput = styled.input`
  position: absolute;
  width: 100%;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
  margin: 0;
`;

const SliderThumbHandle = styled.div`
  position: absolute;
  left: ${(props) => props.$left};
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  pointer-events: none;
  transition: left 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DrAcneImage = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
  user-select: none;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));

  @media ${media.mobileM} {
    width: 50px;
    height: 50px;
  }
`;

const SliderLabelWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  margin-top: 25px;

  @media ${media.mobileM} {
    height: 24px;
    margin-top: 30px;
  }
`;

const SliderPointLabel = styled.span`
  position: absolute;
  left: ${(props) => props.$left};
  transform: translateX(-50%);
  white-space: nowrap;
  transition: all 0.15s ease;

  font-size: ${(props) => (props.$isSelected ? '12px' : '9px')};
  font-weight: ${(props) => (props.$isSelected ? '600' : '400')};
  color: ${(props) => (props.$isSelected ? '#000000' : '#a0a0a0')};
  display: ${(props) => (props.$isSelected || props.$isEdge ? 'block' : 'none')};

  @media ${media.mobileM} {
    font-size: ${(props) => (props.$isSelected ? '14px' : '11px')};
  }
`;