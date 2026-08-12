import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';

export default function EmptyPouch() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register/search-cosmetic');
  };

  return (
    <Container>
      <Header>화장품</Header>

      <ContentArea>
        <ImagePlaceholder />

        <RegisterButton onClick={handleRegister}>
          <PlusIcon>+</PlusIcon>
          <ButtonText>내 화장품 등록하기</ButtonText>
        </RegisterButton>
      </ContentArea>

      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  margin: 30px 20px;
  height: 100dvh;
  background-color: #ffffff;
  padding-bottom: 73px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  text-align: center;
  padding: 16px 0;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-top: -30px;
`;

const ImagePlaceholder = styled.div`
  width: 300px;
  height: 300px;
  background-color: #D9D9D9;
  border-radius: 4px;
  margin-bottom: 40px;
`;

const RegisterButton = styled.button`
  width: 220px;
  height: 54px;
  background-color: transparent;
  border: 1.5px dashed #B3B3B3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  &:active {
    background-color: #F8F8F8;
  }
`;

const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #003B00;
`;

const ButtonText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #003B00;
`;