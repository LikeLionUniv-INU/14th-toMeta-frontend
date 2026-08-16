import React, { useState } from 'react';
import styled from 'styled-components';
import Header from "../components/Header.jsx";
import Button from '../components/Button.jsx';
import Edit from '../assets/images/edit.png';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('김도영');
  const [gender, setGender] = useState('남자');
  const [age, setAge] = useState('10대');
  const [skinType, setSkinType] = useState('건성');

  const [openDropdown, setOpenDropdown] = useState(null);

  const genderOptions = ['남자', '여자'];
  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '기타'];
  const skinTypeOptions = ['건성', '지성', '복합성', '수부지', '민감성', '모름'];

  const toggleDropdown = (field) => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const handleSelect = (field, value) => {
    if (field === 'gender') setGender(value);
    if (field === 'age') setAge(value);
    if (field === 'skinType') setSkinType(value);
    setOpenDropdown(null);
  };

  const handleSave = () => {
    const updatedProfile = { nickname, gender, age, skinType };

    console.log('저장할 데이터:', updatedProfile);

    navigate('/mypage');
  };

  return (
    <PageContainer>
      <Header title={"프로필 수정"} variant="back" />

      <ProfileSection>
        <ProfileAvatar>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#006014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </ProfileAvatar>
        <ProfileName>{nickname} 님</ProfileName>
      </ProfileSection>

      <FormContainer>
        <FieldGroup>
          <Label>닉네임</Label>
          <InputWrapper>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <EditIcon src={Edit} alt="수정 아이콘" />
          </InputWrapper>
        </FieldGroup>

        <CustomSelect
          label="성별"
          value={gender}
          options={genderOptions}
          isOpen={openDropdown === 'gender'}
          onToggle={() => toggleDropdown('gender')}
          onSelect={(val) => handleSelect('gender', val)}
        />

        <CustomSelect
          label="나이"
          value={age}
          options={ageOptions}
          isOpen={openDropdown === 'age'}
          onToggle={() => toggleDropdown('age')}
          onSelect={(val) => handleSelect('age', val)}
        />

        <CustomSelect
          label="피부타입"
          value={skinType}
          options={skinTypeOptions}
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

function CustomSelect({ label, value, options, isOpen, onToggle, onSelect }) {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      <DropdownContainer>
        <SelectHeader onClick={onToggle}>
          <ValueText>{value}</ValueText>
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
  background-color: #ffffff;
  padding-bottom: 30px;
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const ProfileSection = styled.section`
  background-color: #ffffff;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileAvatar = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid #006014;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  margin-bottom: 8px;
`;

const FormContainer = styled.div`
  padding: 20px 24px;
  flex: 1;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222222;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #DEE2E6;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  color: #828282;

  &:focus {
    border-color: #CCCCCC;
  }
`;

const EditIcon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 12px;
  pointer-events: none;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #EEE2E6;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ffffff;
`;

const ValueText = styled.span`
  color: #828282;
`;

const ArrowIcon = styled.span`
  font-size: 10px;
  color: #a8a8a8;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  border: 1px solid #EEE2E6;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
`;

const OptionItem = styled.li`
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  border-bottom: 1px solid #EEE2E6;
  cursor: pointer;
  color: #333333;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ButtonSection = styled.div`
  padding: 0 20px;
`;