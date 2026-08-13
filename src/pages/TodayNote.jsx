import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import * as S from './TodayNote.styles';
import Header from '../components/Header';
import CosmeticCard from '../components/CosmeticCard';

const TodayNote = () => {
  const navigate = useNavigate();

  const [skinCondition, setSkinCondition] = useState(null);
  const [morningProducts, setMorningProducts] = useState([]);
  const [nightProducts, setNightProducts] = useState([]);
  const [foodInput, setFoodInput] = useState('');
  const [images, setImages] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fileInputRef = useRef(null);

  // 샘플 데이터
  const setProducts = [
    { id: 's1', name: '진정템', tags: ['#어성초', '#진정', '#피지조절'] },
    { id: 's2', name: '(사용자 지정 이름)', tags: ['#티트리', '#진정', '#수분보충'] },
  ];

  const individualProducts = [
    { id: 'i1', name: '아누아 어성초 77% 진정 토너', tags: ['#토너', '#어성초', '#진정', '#피지조절'] },
    { id: 'i2', name: '브링그린 티트리 시카 크림', tags: ['#크림', '#속건조', '#수분', '#시카'] },
    { id: 'i3', name: '에스트라 아토베리어 365크림', tags: ['#크림', '#속건조', '#수분', '#진정'] },
    { id: 'i4', name: '듀이트리 핏 앤 퀵 더블패드', tags: ['#패드', '#유수분', '#수분', '#진정'] },
  ];

  const skinStatusOptions = [
    { id: 1, label: '매우 좋음', emoji: '😆' },
    { id: 2, label: '좋음', emoji: '😊' },
    { id: 3, label: '보통', emoji: '🙂' },
    { id: 4, label: '나쁨', emoji: '😐' },
    { id: 5, label: '매우 나쁨', emoji: '😑' },
  ];

  const isBadSkin = Number(skinCondition) === 4 || Number(skinCondition) === 5;

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
      ...products.map((name) => ({ type: 'product', name })),
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
                <SelectedTagChip key={itemIndex}>
                  <span>{item.name}</span>
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

  return (
    <S.Container>
      <Header title={"기록"} variant="back" />

      <S.Content>
        <S.DateSection>
          <h2>8월 5일 수요일</h2>
          <p>날씨 흐림 | 온도 25-34 | 습도 94%</p>
        </S.DateSection>

        <S.Divider />

        <S.Section>
          <S.Label>
            오늘 내 피부 상태는?<span className="required">*</span>
          </S.Label>
          <S.SkinStatusGroup>
            {skinStatusOptions.map((item) => (
              <S.SkinStatusButton
                key={item.id}
                type="button"
                selected={Number(skinCondition) === item.id}
                onClick={() => setSkinCondition(item.id)}
              >
                <span className="emoji">{item.emoji}</span>
                <span className="text">{item.label}</span>
              </S.SkinStatusButton>
            ))}
          </S.SkinStatusGroup>
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
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <S.ImageListContainer>
            <S.CameraButton type="button" onClick={handleCameraClick}>
              <span className="camera-icon">📷</span>
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

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>내 화장품</ModalTitle>
              <CloseButton type="button" onClick={() => setIsModalOpen(false)}>✕</CloseButton>
            </ModalHeader>

            <ModalContent>
              <SetSection>
                {setProducts.map((setItem) => {
                  const isSelected = selectedProducts.includes(setItem.name);
                  return (
                    <SetCard
                      key={setItem.id}
                      $isSelected={isSelected}
                      onClick={() => handleToggleProduct(setItem.name)}
                    >
                      <SetCardLeft>
                        <SetTitle>{setItem.name} <span>∨</span></SetTitle>
                        <TagList>
                          {setItem.tags.map((tag, i) => (
                            <SetTag key={i}>{tag}</SetTag>
                          ))}
                        </TagList>
                      </SetCardLeft>
                      <ArrowButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/cosmetic-set');
                        }}
                      >
                        ＞
                      </ArrowButton>
                    </SetCard>
                  );
                })}
              </SetSection>

              <ModalDivider />

              <IndividualSection>
                {individualProducts.map((item) => {
                  const isSelected = selectedProducts.includes(item.name);
                  return (
                    <CardWrapper
                      key={item.id}
                      $isSelected={isSelected}
                      onClick={() => handleToggleProduct(item.name)}
                    >
                      <CosmeticCard name={item.name} tags={item.tags} />
                    </CardWrapper>
                  );
                })}
              </IndividualSection>
            </ModalContent>

            <ModalFooter>
              <Button onClick={handleModalSubmit}>완료</Button>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </S.Container>
  );
};

export default TodayNote;

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
  border: 1px solid #96be9c;
  border-radius: 8px;
  padding: 6px 10px;
  background-color: #ffffff;
  font-size: 12px;
  color: #333333;
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
  border: 1px solid #96be9c;
  border-radius: 8px;
  padding: 6px 12px;
  background-color: #eaf3eb;
  font-size: 12px;
  font-weight: 600;
  color: #333333;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  span {
    font-size: 13px;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-height: 85dvh;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 30px 0 20px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 20px;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  position: absolute;
  right: 20px;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const SetCard = styled.div`
  background-color: ${(props) => (props.$isSelected ? '#699872' : '#ffffff')};
  border: 1px solid #96be9c;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#141212')};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.$isSelected &&
    `
    outline: 2.5px solid #4D7A56;
    outline-offset: -1px;
    box-shadow: 0 0 8px rgba(105, 152, 114, 0.4);
    
    span {
      color: #ffffff;
    }
  `}
`;

const SetCardLeft = styled.div`
  flex: 1;
`;

const SetTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 10px;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const SetTag = styled.span`
  font-size: 10px;
  background-color: #FFF1E5;
  color: #000000 !important;
  padding: 3px 8px;
  border-radius: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
`;

const ModalDivider = styled.div`
  height: 8px;
  background-color: #f2f2f2;
  width: 100%;
  margin: 6px 0;
  flex-shrink: 0;
`;

const IndividualSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.$isSelected &&
    `
    outline: 2.5px solid #4D7A56;
    outline-offset: -1px;
    box-shadow: 0 0 8px rgba(105, 152, 114, 0.4);

    & > div {
      background-color: #699872;
      border-color: #699872;

      p, span, h1, h2, h3, h4, div {
        color: #ffffff;
      }

      span {
        background-color: #FFF1E5;
        color: #000000;
      }
    }
  `}
`;

const ModalFooter = styled.div`
  margin-top: 16px;
  padding: 0 20px;
`;