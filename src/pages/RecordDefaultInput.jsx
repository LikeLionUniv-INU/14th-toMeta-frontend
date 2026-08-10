import React, { useState, useRef } from 'react';
import Button from '../components/Button';
import * as S from './RecordDefaultInput.styles';

const RecordDefaultInput = () => {
  const [skinCondition, setSkinCondition] = useState(null); // 피부 상태
  const [morningProducts, setMorningProducts] = useState([]); // 아침 화장품 목록
  const [nightProducts, setNightProducts] = useState([]); // 밤 화장품 목록
  const [foodInput, setFoodInput] = useState(''); // 음식이름 입력값
  const [selectedImage, setSelectedImage] = useState(null); // 첨부된 피부 사진
  const [noteInput, setNoteInput] = useState(''); // 특이사항 입력값

  const fileInputRef = useRef(null);

  const skinStatusOptions = [
    { id: 1, label: '매우 좋음', emoji: '😆' },
    { id: 2, label: '좋음', emoji: '😊' },
    { id: 3, label: '보통', emoji: '🙂' },
    { id: 4, label: '나쁨', emoji: '😐' },
    { id: 5, label: '매우 나쁨', emoji: '😑' },
  ];

  const isFormValid =
    skinCondition !== null &&
    morningProducts.length > 0 &&
    nightProducts.length > 0 &&
    noteInput.trim().length > 0;

  const handleAddProduct = (type) => {
    console.log(`${type} 화장품 추가 버튼 클릭`);
    // 예시: 클릭 시 임시 데이터 세팅
    if (type === 'morning') {
      setMorningProducts(['아침 토너']);
    } else {
      setNightProducts(['수분 크림']);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    const recordData = {
      skinCondition,
      morningProducts,
      nightProducts,
      foodInput,
      selectedImage,
      noteInput,
    };

    console.log('기록 저장 데이타:', recordData);
  };

  return (
    <S.Container>
      <S.Header>
        <button type="button">&lt;</button>
        <h1>기록</h1>
        <div style={{ width: '20px' }} />
      </S.Header>

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
                selected={skinCondition === item.id}
                onClick={() => setSkinCondition(item.id)}
              >
                <span className="emoji">{item.emoji}</span>
                <span className="text">{item.label}</span>
              </S.SkinStatusButton>
            ))}
          </S.SkinStatusGroup>
        </S.Section>

        <S.Divider />

        <S.Section>
          <S.Label>
            오늘 아침에 무슨 화장품을 사용했나요?<span className="required">*</span>
          </S.Label>
          <S.AddButton type="button" onClick={() => handleAddProduct('morning')}>
            {morningProducts.length > 0 ? morningProducts.join(', ') : '추가'}
          </S.AddButton>
        </S.Section>

        <S.Section>
          <S.Label>
            오늘 밤에 무슨 화장품을 사용했나요?<span className="required">*</span>
          </S.Label>
          <S.AddButton type="button" onClick={() => handleAddProduct('night')}>
            {nightProducts.length > 0 ? nightProducts.join(', ') : '추가'}
          </S.AddButton>
        </S.Section>

        <S.Divider />

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

        <S.Divider />

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
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <S.CameraButton type="button" onClick={handleCameraClick}>
            {selectedImage ? (
              <img src={selectedImage} alt="피부 상태 미리보기" />
            ) : (
              <span className="camera-icon">📷</span>
            )}
          </S.CameraButton>
        </S.Section>

        <S.Divider />

        <S.Section>
          <S.Label>
            오늘 기억하고 싶은 특이사항이 있나요?<span className="required">*</span>
          </S.Label>
          <S.TextareaWrapper>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value.slice(0, 300))}
              placeholder="ex. 요즘 물 1.5L씩 마시는 중!"
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
    </S.Container>
  );
};

export default RecordDefaultInput;