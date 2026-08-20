import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import Button from '../components/Button.jsx';
import Edit from '../assets/images/edit.png';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from '../api/user';
import { media } from '../styles/GlobalStyle';

const GENDER_CODE_MAP = { 남자: 'male', 여자: 'female' };
const GENDER_LABEL_MAP = { male: '남자', female: '여자' };

const AGE_CODE_MAP = {
  '10대': '10s',
  '20대': '20s',
  '30대': '30s',
  '40대': '40s',
  '50대 이상': 'etc',
};
const AGE_LABEL_MAP = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  etc: '50대 이상',
};

const SKIN_TYPE_CODE_MAP = {
  건성: 'dry',
  지성: 'oily',
  복합성: 'combination',
  수부지: 'combination_dry',
  민감성: 'sensitive',
  모름: 'unknown',
};
const SKIN_TYPE_LABEL_MAP = {
  dry: '건성',
  oily: '지성',
  combination: '복합성',
  combination_dry: '수부지',
  sensitive: '민감성',
  unknown: '모름',
};

export default function EditProfile() {
  const navigate = useNavigate();

  const [currentNickname, setCurrentNickname] = useState('');

  const [nicknameInput, setNicknameInput] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('');

  const [initialProfile, setInitialProfile] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const genderOptions = ['남자', '여자'];
  const ageOptions = ['10대', '20대', '30대', '40대', '50대 이상'];
  const skinTypeOptions = [
    '건성',
    '지성',
    '복합성',
    '수부지',
    '민감성',
    '모름',
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        const {
          nickname,
          gender: genderCode,
          ageGroup,
          skinType: skinTypeCode,
        } = response.data.result;

        const genderLabel = GENDER_LABEL_MAP[genderCode] || genderCode;
        const ageLabel = AGE_LABEL_MAP[ageGroup] || ageGroup;
        const skinTypeLabel = SKIN_TYPE_LABEL_MAP[skinTypeCode] || skinTypeCode;

        setCurrentNickname(nickname);
        setGender(genderLabel);
        setAge(ageLabel);
        setSkinType(skinTypeLabel);
        setInitialProfile({
          gender: genderLabel,
          age: ageLabel,
          skinType: skinTypeLabel,
        });
      } catch (error) {
        console.error('[EditProfile] 유저 정보 조회 실패:', error);
      }
    };

    fetchProfile();
  }, []);

  const toggleDropdown = (field) => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const handleSelect = (field, value) => {
    if (field === 'gender') setGender(value);
    if (field === 'age') setAge(value);
    if (field === 'skinType') setSkinType(value);
    setOpenDropdown(null);
  };

  const handleSave = async () => {
    const updatedNickname = nicknameInput.trim()
      ? nicknameInput.trim()
      : currentNickname;

    const payload = {
      nickname: updatedNickname,
      gender: GENDER_CODE_MAP[gender] || gender,
      ageGroup: AGE_CODE_MAP[age] || age,
      skinType: SKIN_TYPE_CODE_MAP[skinType] || skinType,
    };

    try {
      await updateMyProfile(payload);
      navigate('/mypage');
    } catch (error) {
      console.error('[EditProfile] 유저 정보 수정 실패:', error);
      alert(error.message || '프로필 수정에 실패했습니다.');
    }
  };

  return (
    <PageContainer>
      <Header title={'프로필 수정'} variant="back" />

      <ProfileSection>
        <ProfileAvatar>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#006014"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </ProfileAvatar>
        <ProfileName>
          {currentNickname ? `${currentNickname} 님` : ''}
        </ProfileName>
      </ProfileSection>

      <FormContainer>
        <FieldGroup>
          <Label>닉네임</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder={currentNickname}
              value={nicknameInput}
              $isModified={nicknameInput.length > 0}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
            <EditIcon src={Edit} alt="수정 아이콘" />
          </InputWrapper>
        </FieldGroup>

        <CustomSelect
          label="성별"
          value={gender}
          options={genderOptions}
          isModified={initialProfile ? gender !== initialProfile.gender : false}
          isOpen={openDropdown === 'gender'}
          onToggle={() => toggleDropdown('gender')}
          onSelect={(val) => handleSelect('gender', val)}
        />

        <CustomSelect
          label="나이"
          value={age}
          options={ageOptions}
          isModified={initialProfile ? age !== initialProfile.age : false}
          isOpen={openDropdown === 'age'}
          onToggle={() => toggleDropdown('age')}
          onSelect={(val) => handleSelect('age', val)}
        />

        <CustomSelect
          label="피부타입"
          value={skinType}
          options={skinTypeOptions}
          isModified={
            initialProfile ? skinType !== initialProfile.skinType : false
          }
          isOpen={openDropdown === 'skinType'}
          onToggle={() => toggleDropdown('skinType')}
          onSelect={(val) => handleSelect('skinType', val)}
        />
      </FormContainer>

      <ButtonSection>
        <Button onClick={handleSave}>완료</Button>
      </ButtonSection>
    </PageContainer>
  );
}

function CustomSelect({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  isModified,
}) {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      <DropdownContainer>
        <SelectHeader onClick={onToggle}>
          <ValueText $isModified={isModified}>{value}</ValueText>
          <ArrowIcon>{isOpen ? '▲' : '▼'}</ArrowIcon>
        </SelectHeader>
        {isOpen && (
          <OptionList>
            {options.map((option) => (
              <OptionItem key={option} onClick={() => onSelect(option)}>
                {option}
              </OptionItem>
            ))}
          </OptionList>
        )}
      </DropdownContainer>
    </FieldGroup>
  );
}

const PageContainer = styled.div`
  margin: 0 auto;
  min-height: 100dvh;
  padding-bottom: 26px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media ${media.mobileM} {
    padding-bottom: 30px;
  }
`;

const ProfileSection = styled.section`
  background-color: #ffffff;
  padding: 26px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${media.mobileM} {
    padding: 30px 0;
  }
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid #006014;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
  box-sizing: border-box;

  @media ${media.mobileM} {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 19px;
  color: #000000;
  margin-bottom: 7px;

  @media ${media.mobileM} {
    font-size: 22px;
    margin-bottom: 8px;
  }
`;

const FormContainer = styled.div`
  padding: 17px 20px;
  flex: 1;

  @media ${media.mobileM} {
    padding: 20px 24px;
  }
`;

const FieldGroup = styled.div`
  margin-bottom: 17px;

  @media ${media.mobileM} {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 14px;
  color: #222222;

  @media ${media.mobileM} {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 9px 10px;
  font-size: 10px;
  font-weight: 400;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  color: ${(props) => (props.$isModified ? '#000000' : '#828282')};

  &::placeholder {
    color: #828282;
  }

  &:focus {
    border-color: #cccccc;
  }

  @media ${media.mobileM} {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

const EditIcon = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  pointer-events: none;

  @media ${media.mobileM} {
    width: 18px;
    height: 18px;
    right: 12px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 10px;
  font-size: 10px;
  font-weight: 400;
  border: 1px solid #eee2e6;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ffffff;

  @media ${media.mobileM} {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

const ValueText = styled.span`
  color: ${(props) => (props.$isModified ? '#000000' : '#828282')};
`;

const ArrowIcon = styled.span`
  font-size: 9px;
  color: #a8a8a8;

  @media ${media.mobileM} {
    font-size: 10px;
  }
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 3px 0 0 0;
  border: 1px solid #eee2e6;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;

  @media ${media.mobileM} {
    margin: 4px 0 0 0;
  }
`;

const OptionItem = styled.li`
  padding: 9px 10px;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  border-bottom: 1px solid #eee2e6;
  cursor: pointer;
  color: #333333;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  @media ${media.mobileM} {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

const ButtonSection = styled.div`
  padding: 0 17px;

  @media ${media.mobileM} {
    padding: 0 20px;
  }
`;