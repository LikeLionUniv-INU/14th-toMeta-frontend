import React from 'react';
import * as S from './HealthConnect.styles';
import Button from '../components/Button';

const HealthConnect = () => {
  const onConnect = () => {
    console.log('건강데이터 권한 요청 실행');
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>
          원활한 서비스 이용을 위해<br />
          Health Connect 데이터<br />
          접근 권한이 필요해요
        </S.Title>
        <S.Text>
          수집된 데이터는 AI 분석 및 리포트 제공 목적으로만 사용되며,<br />
          언제든 연동을 해제할 수 있습니다
        </S.Text>
      </S.ContentWrapper>

      <Button onClick={onConnect}>
        건강데이터 권한 요청
      </Button>
    </S.Container>
  );
};

export default HealthConnect;