import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import recordIcon from '../assets/images/navigationbar/record.svg';
import storageIcon from '../assets/images/navigationbar/storage.svg';
import homeIcon from '../assets/images/navigationbar/home.svg';
import reportIcon from '../assets/images/navigationbar/report.svg';
import myIcon from '../assets/images/navigationbar/my.svg';
import { media } from '../styles/GlobalStyle';
import Portal from './Portal';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const checkIsActive = (paths) => {
    if (Array.isArray(paths)) return paths.includes(location.pathname);
    return location.pathname === paths;
  };

  const navList = [
    { name: '기록', path: ['/record-redirect', '/record', '/todaynote'], icon: recordIcon },
    { name: '보관함', path: ['/pouch-redirect', '/my-pouch', '/empty-pouch'], icon: storageIcon },
    { name: '홈', path: ['/home'], icon: homeIcon },
    { name: '리포트', path: ['/report'], icon: reportIcon },
    { name: 'MY', path: ['/mypage'], icon: myIcon },
  ];

  const handleNavClick = (item) => {
    navigate(item.path[0]);
  };

  return (
    <Portal>
      <NavContainer>
        <NavInner>
          {navList.map((item) => {
            const isActive = checkIsActive(item.path);
            return (
              <NavItem key={item.name} onClick={() => handleNavClick(item)}>
                <Icon src={item.icon} className={isActive ? 'active' : ''} alt={item.name} />
                <NavText className={isActive ? 'active' : ''}>{item.name}</NavText>
              </NavItem>
            );
          })}
        </NavInner>
      </NavContainer>
    </Portal>
  );
}

// 안드로이드 제스처 바 / 아이폰 홈 인디케이터에 아이콘이 가려지지 않도록,
// 실제 터치 영역(NavInner)은 기존 높이를 유지하고 흰 배경만
// safe-area-inset-bottom만큼 아래로 더 확장한다.
const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 430px;
  margin: 0 auto;
  width: 100%;
  height: calc(60px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background-color: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  box-sizing: border-box;
`;

const NavInner = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media ${media.mobileM} {
    height: calc(73px + env(safe-area-inset-bottom));
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  flex: 1;
  height: 100%;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  transition: all 0.2s ease-in-out;

  &.active {
    filter: invert(15%) sepia(80%) saturate(1800%) hue-rotate(85deg) brightness(40%) contrast(120%);
  }

  @media ${media.mobileM} {
    width: 24px;
    height: 24px;
  }
`;

const NavText = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #AAA7A7;
  transition: color 0.2s ease-in-out;

  &.active {
    color: #003B00;
    font-weight: 700;
  }
`;