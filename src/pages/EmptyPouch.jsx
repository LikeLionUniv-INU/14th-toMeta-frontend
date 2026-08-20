import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Img from '../assets/images/dr-acne/surprised-dr.svg';
import { useNavigate } from 'react-router-dom';
import { media } from '../styles/GlobalStyle';

export default function EmptyPouch() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register/search-cosmetic');
  };

  return (
    <Container>
      <Header>화장품</Header>

      <ContentArea>
        <ImagePlaceholder src={Img} alt="놀란 여박사" />

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
  margin: 26px 17px;
  height: 100dvh;
  padding-bottom: calc(73px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media ${media.mobileM} {
    margin: 30px 20px;
  }
`;

const Header = styled.header`
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  color: #000000;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 17px;
  margin-top: -26px;

  @media ${media.mobileM} {
    padding: 0 20px;
    margin-top: -30px;
  }
`;

const ImagePlaceholder = styled.img`
  width: 255px;
  height: auto;
  object-fit: contain;
  margin-bottom: 34px;

  @media ${media.mobileM} {
    width: 300px;
    margin-bottom: 40px;
  }
`;

const RegisterButton = styled.button`
  width: 187px;
  height: 46px;
  background-color: transparent;
  border: 1.5px dashed #b3b3b3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;

  &:active {
    background-color: #f8f8f8;
  }

  @media ${media.mobileM} {
    width: 220px;
    height: 54px;
    gap: 8px;
  }
`;

const PlusIcon = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #003b00;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;

const ButtonText = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #003b00;

  @media ${media.mobileM} {
    font-size: 20px;
  }
`;