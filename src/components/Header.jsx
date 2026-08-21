import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../styles/GlobalStyle';

export default function Header({ title, onBack, variant = 'default' }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer>
      <BackButton
        onClick={handleBackClick}
        aria-label="뒤로가기"
        $variant={variant}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </BackButton>
      <Title>{title}</Title>
      <EmptySpace />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  background-color: #ffffff;

  @media ${media.mobileM} {
    height: 61px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$variant === 'back' ? '#111111' : '#ffffff')};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 400;
  color: #141212;
  margin: 0;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  @media ${media.mobileM} {
    font-size: 18px;
  }
`;

const EmptySpace = styled.div`
  width: 32px;
`;
