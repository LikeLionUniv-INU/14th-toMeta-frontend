import React, { useCallback, useEffect, useState } from 'react';
import * as S from './Splash.styles';
import acneSkinImg from '../assets/images/acne-skin.png';
import noAcneSkinImg from '../assets/images/no-acne-skin.png';
import drsLabImg from '../assets/images/drs-lab.png';
import worriedDrImg from '../assets/images/dr-acne/worried-dr.svg';

const CAPTION = '여드름을 터트려 여 박사님을 불러보세요!';
const DR_MESSAGES = [
  '안녕, 친구들.\n나는 여드름 박사, 여 박사란다.',
  '나와 함께\n좋은 피부를 만들어보자꾸나.\n하 하 하 ~',
];

const Splash = () => {
  const [step, setStep] = useState('acne');
  const [typedLength, setTypedLength] = useState(0);
  const [popKey, setPopKey] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgTypedLength, setMsgTypedLength] = useState(0);

  useEffect(() => {
    if (step !== 'acne') return undefined;

    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= CAPTION.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== 'no-acne') return undefined;
    const timer = setTimeout(() => setStep('dr'), 150);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== 'dr') return undefined;
    const timer = setTimeout(() => setStep('lab'), 300);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== 'lab') return undefined;

    const currentMessage = DR_MESSAGES[msgIndex];
    const interval = setInterval(() => {
      setMsgTypedLength((prev) => {
        if (prev >= currentMessage.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [step, msgIndex]);

  const handlePop = () => {
    if (step !== 'acne') return;
    setPopKey((prev) => prev + 1);
    setStep('no-acne');
  };

  const handleSkip = () => setStep('blackout');

  const messageTyped = msgTypedLength >= DR_MESSAGES[msgIndex].length;
  const isLastMessage = msgIndex === DR_MESSAGES.length - 1;

  const advanceMessage = useCallback(() => {
    if (isLastMessage) {
      setStep('blackout');
    } else {
      setMsgIndex((prev) => prev + 1);
      setMsgTypedLength(0);
    }
  }, [isLastMessage]);

  const handleMessageClick = () => {
    if (step !== 'lab' || !messageTyped) return;
    advanceMessage();
  };

  // 일정 시간 후 자동 스킵
  useEffect(() => {
    if (step !== 'lab' || !messageTyped) return undefined;
    const timer = setTimeout(advanceMessage, 2500);
    return () => clearTimeout(timer);
  }, [step, messageTyped, msgIndex, advanceMessage]);

  return (
    <S.Screen>
      <S.BgLayer $src={acneSkinImg} $z={1} $hidden={step !== 'acne'} />
      <S.BgLayer
        $src={noAcneSkinImg}
        $z={2}
        $hidden={step === 'acne' || step === 'lab'}
      />
      <S.BgLayer $src={drsLabImg} $z={3} $hidden={step !== 'lab'} />

      {step === 'acne' && (
        <S.Hotspot
          type="button"
          onClick={handlePop}
          aria-label="여드름 터트리기"
        />
      )}
      {step === 'no-acne' && <S.PopRing key={popKey} />}

      <S.DrImage
        src={worriedDrImg}
        alt="놀란 여박사님"
        $visible={step === 'dr' || step === 'lab'}
      />

      <S.Caption $visible={step === 'acne'}>
        <S.CaptionBubble>
          {CAPTION.slice(0, typedLength)}
          {typedLength < CAPTION.length && <S.Caret />}
        </S.CaptionBubble>
      </S.Caption>

      {step === 'acne' && (
        <S.SkipButton type="button" onClick={handleSkip}>
          건너뛰기 &gt;
        </S.SkipButton>
      )}

      {step === 'lab' && (
        <S.MessageWrap
          type="button"
          $active={messageTyped}
          onClick={handleMessageClick}
          aria-label="여 박사 메시지, 눌러서 계속하기"
        >
          <S.NameTag>여 박사</S.NameTag>
          <S.MessageBox>
            <S.MessageText>
              {DR_MESSAGES[msgIndex].slice(0, msgTypedLength)}
              {!messageTyped && <S.Caret />}
            </S.MessageText>
            {messageTyped && <S.ContinueArrow />}
          </S.MessageBox>
        </S.MessageWrap>
      )}

      {step === 'blackout' && <S.Blackout />}
    </S.Screen>
  );
};

export default Splash;
