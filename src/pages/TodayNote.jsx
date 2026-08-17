import { useState, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Button from '../components/Button';
import * as S from './TodayNote.styles';
import Header from '../components/Header';
import CosmeticSelectModal from '../components/modal/CosmeticSelectModal';
import SetDetailModal from '../components/modal/SetDetailModal';
import AlreadyRecordedModal from '../components/modal/AlreadyRecordedModal';
import CameraImg from '../assets/images/camera.png';
import DrImg from '../assets/images/dr-acne.png';

const TodayNote = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [skinCondition, setSkinCondition] = useState(3);
  const [morningProducts, setMorningProducts] = useState([]);
  const [nightProducts, setNightProducts] = useState([]);
  const [foodInput, setFoodInput] = useState('');
  const [images, setImages] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 세트 상세 보기 모달 상태
  const [detailModalSet, setDetailModalSet] = useState(null);

  // 이미 작성된 기록 모달 상태
  const [isAlreadyRecordedModalOpen, setIsAlreadyRecordedModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = days[date.getDay()];
    return `${month}월 ${day}일 ${dayOfWeek}`;
  };

  // 날짜 변경 및 기존 기록 확인 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // TODO: 실제 API 연동 시 해당 날짜의 기록 존재 여부를 체크하도록 연동해주세요.
    // 예시: 이미 작성된 기록이 있는 경우 모달 오픈
    const hasExistingRecord = true; // 테스트/연동용 플래그
    if (hasExistingRecord) {
      setIsAlreadyRecordedModalOpen(true);
    }
  };

  // 샘플 데이터
  const setProducts = [
    {
      id: 's1',
      name: '진정템',
      tags: ['#어성초', '#진정', '#피지조절'],
      items: [
        { id: 'si1', name: '브링그린 티트리 시카 크림', tags: ['#크림', '#속건조', '#수분', '#시카'] },
        { id: 'si2', name: '에스트라 아토베리어 365크림', tags: ['#크림', '#속건조', '#수분', '#진정'] },
        { id: 'si3', name: '듀이트리 핏 앤 퀵 더블패드', tags: ['#패드', '#유수분', '#수분', '#진정'] },
      ],
    },
    {
      id: 's2',
      name: '(사용자 지정 이름)',
      tags: ['#티트리', '#진정', '#수분보충'],
      items: [
        { id: 'si4', name: '아누아 어성초 77% 진정 토너', tags: ['#토너', '#어성초', '#진정', '#피지조절'] },
        { id: 'si5', name: '브링그린 티트리 시카 크림', tags: ['#크림', '#속건조', '#수분', '#시카'] },
      ],
    },
  ];

  const individualProducts = [
    { id: 'i1', name: '아누아 어성초 77% 진정 토너', tags: ['#토너', '#어성초', '#진정', '#피지조절'] },
    { id: 'i2', name: '브링그린 티트리 시카 크림', tags: ['#크림', '#속건조', '#수분', '#시카'] },
    { id: 'i3', name: '에스트라 아토베리어 365크림', tags: ['#크림', '#속건조', '#수분', '#진정'] },
    { id: 'i4', name: '듀이트리 핏 앤 퀵 더블패드', tags: ['#패드', '#유수분', '#수분', '#진정'] },
  ];

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

  const handleOpenModal = (type) => {
    setActiveType(type);
    setSelectedProducts(type === 'morning' ? morningProducts : nightProducts);
    setIsModalOpen(true);
  };

  const handleToggleProduct = (productName) => {
    if (selectedProducts.includes(productName)) {
      setSelectedProducts((prev) => prev.filter((item) => item !== productName));
    } else {
      setSelectedProducts((prev) => [...prev, productName]);
    }
  };

  const handleModalSubmit = () => {
    if (activeType === 'morning') {
      setMorningProducts(selectedProducts);
    } else if (activeType === 'night') {
      setNightProducts(selectedProducts);
    }
    setIsModalOpen(false);
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

  const handleSubmit = () => {
    if (!isFormValid) return;

    const recordData = {
      selectedDate,
      skinCondition,
      morningProducts,
      nightProducts,
      foodInput,
      images,
      noteInput,
    };

    console.log('기록 저장 데이터:', recordData);
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
                  <button type="button" onClick={() => handleRemoveProduct(type, item.name)}>
                    ✕
                  </button>
                </SelectedTagChip>
              ) : (
                <AddMoreTagChip key={itemIndex} type="button" onClick={() => handleOpenModal(type)}>
                  추가하기 <span>+</span>
                </AddMoreTagChip>
              )
            )}
          </TagRow>
        ))}
      </SelectedTagScrollContainer>
    );
  };

  const currentStatusObj = skinStatusOptions.find((item) => item.id === Number(skinCondition));
  const sliderPercentage = ((Number(skinCondition || 3) - 1) / 4) * 100;

  return (
    <S.Container>
      <Header title={"기록"} variant="back" />

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
            />
          </DatePickerWrapper>
        </S.DateSection>

        <S.Divider />

        <S.Section>
          <S.Label>
            오늘 내 피부 상태는?<span className="required">*</span>
          </S.Label>
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

              <SliderThumbHandle
                $left={`${((skinCondition ?? 3) - 1) * 25}%`}
              >
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
                    {isSelected ? opt.label : (isEdge ? opt.label : '')}
                  </SliderPointLabel>
                );
              })}
            </SliderLabelWrapper>
          </SkinSliderContainer>
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.Label>
            오늘 아침에 무슨 화장품을 사용했나요?<span className="required">*</span>
          </S.Label>
          {morningProducts.length === 0 ? (
            <S.AddButton type="button" onClick={() => handleOpenModal('morning')}>
              추가
            </S.AddButton>
          ) : (
            renderProductRows(morningProducts, 'morning')
          )}
        </S.Section>

        <S.Section>
          <S.Label>
            오늘 밤에 무슨 화장품을 사용했나요?<span className="required">*</span>
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

      {/* 이미 작성된 기록 알림 모달 */}
      <AlreadyRecordedModal
        isOpen={isAlreadyRecordedModalOpen}
        onClose={() => setIsAlreadyRecordedModalOpen(false)}
      />

      {/* 내 화장품 선택 모달 */}
      <CosmeticSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setProducts={setProducts}
        individualProducts={individualProducts}
        selectedProducts={selectedProducts}
        onToggleProduct={handleToggleProduct}
        onSubmit={handleModalSubmit}
        onOpenDetail={(setItem) => setDetailModalSet(setItem)}
      />

      {/* 세트 상세 보기 모달 */}
      <SetDetailModal
        setItem={detailModalSet}
        onClose={() => setDetailModalSet(null)}
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
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 10;

  .react-datepicker-popper {
    z-index: 10;
  }
`;

const SelectedTagScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  padding: 4px 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: max-content;
`;

const SelectedTagChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${(props) => (props.$isSet ? '#96BE9C' : '#89D7BC')};
  border-radius: 20px;
  padding: 6px 10px;
  background-color: ${(props) => (props.$isSet ? '#FFF1E5' : '#E7FDF7')};
  font-size: 12px;
  color: #363636;
  white-space: nowrap;
  flex-shrink: 0;

  button {
    background: none;
    border: none;
    font-size: 11px;
    color: #666666;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const AddMoreTagChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #B3B3B3;
  border-radius: 20px;
  padding: 6px 12px;
  background-color: #D9D9D9;
  font-size: 12px;
  font-weight: 600;
  color: #363636;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    font-size: 13px;
  }
`;

const SkinSliderContainer = styled.div`
  width: 100%;
  padding: 24px 10px 10px 10px;
  box-sizing: border-box;
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
  transition: width 0.15s ease, background-color 0.15s ease;
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
  width: 36px;
  height: 36px;
  object-fit: contain;
  user-select: none;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`;

const SliderLabelWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
  margin-top: 26px;
`;

const SliderPointLabel = styled.span`
  position: absolute;
  left: ${(props) => props.$left};
  transform: translateX(-50%);
  white-space: nowrap;
  transition: all 0.15s ease;

  font-size: ${(props) => (props.$isSelected ? '14px' : '11px')};
  font-weight: ${(props) => (props.$isSelected ? '700' : '400')};
  color: ${(props) => (props.$isSelected ? '#000000' : '#a0a0a0')};
  display: ${(props) => (props.$isSelected || props.$isEdge ? 'block' : 'none')};
`;