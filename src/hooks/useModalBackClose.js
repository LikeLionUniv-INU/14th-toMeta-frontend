import { useCallback, useEffect, useRef } from 'react';

// 모달이 열릴 때 브라우저 히스토리에 항목을 하나 쌓아서, 안드로이드 웹뷰의
// 하드웨어 뒤로가기(popstate)가 페이지 이동 대신 모달을 닫도록 만든다.
export default function useModalBackClose(isOpen, onClose) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    window.history.pushState({ tometaModal: true }, '');
    pushedRef.current = true;

    const handlePopState = () => {
      pushedRef.current = false;
      onCloseRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  return useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    }
    onCloseRef.current();
  }, []);
}
