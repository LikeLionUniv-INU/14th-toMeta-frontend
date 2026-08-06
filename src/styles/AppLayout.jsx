import styled from 'styled-components';

const AppLayout = ({ children }) => {
  return (
    <Background>
      <MobileContainer>{children}</MobileContainer>
    </Background>
  );
};

export default AppLayout;

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  background-color: #f0f0f5;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;