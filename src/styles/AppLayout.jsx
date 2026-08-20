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
  width: 100%;
  height: 100dvh;
  background-color: #fffffa;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  height: 100dvh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
