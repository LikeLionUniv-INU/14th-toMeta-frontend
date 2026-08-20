import { createPortal } from 'react-dom';

// MobileContainer(overflow-y: auto + -webkit-overflow-scrolling: touch)
// 내부에 있으면 웹뷰에서 position: fixed 모달이 스크롤 컨테이너 기준으로
// 잘려 보이는 문제가 있어, modal-root(#root 바깥)로 렌더링을 분리한다.
const Portal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(children, modalRoot);
};

export default Portal;
